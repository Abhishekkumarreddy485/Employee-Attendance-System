import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [attendance, setAttendance] = useState({});
  
  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(savedEmployees);
    const savedAttendance = savedEmployees.reduce((acc, employee) => {
      acc[employee.id] = "Absent";
      return acc;
    }, {});
    setAttendance(savedAttendance);
  }, []);

  const addEmployee = () => {
    if (!name || !email || !salary) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const newEmployee = { id: Date.now(), name, email, salary, attendanceStatus: "Absent" };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    setName("");
    setEmail("");
    setSalary("");
    setErrorMessage("");
  };

  const markAttendance = (id, status) => {
    const updatedAttendance = { ...attendance, [id]: status };
    setAttendance(updatedAttendance);
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, attendanceStatus: status } : emp
    );
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const deleteEmployee = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      setEmployees(updatedEmployees);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    }
  };

  const calculatePayroll = (salary, status) => {
    if (status === "Present") {
      return (salary / 30).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="dashboard-container">
      <div className="form-section">
        <h2 className="dashboard-title">Employee Management System</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-group">
          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Employee Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Employee Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="input-field"
          />
        </div>

        <button className="add-button" onClick={addEmployee}>
          Add Employee
        </button>
      </div>

      <div className="employee-list-section">
  <h3 className="employee-list-title">Employee List</h3>
  <ul className="employee-list">
    {employees.length === 0 ? (
      <li className="empty-message">No employees added yet.</li>
    ) : (
      employees.map((emp) => (
        <li key={emp.id} className="employee-item">
          <div className="employee-info">
            <span className="employee-name">{emp.name}</span>
            <span className="employee-email">{emp.email}</span>
            <span className="employee-salary">${emp.salary}</span>
          </div>
          <div className="attendance-buttons">
            <button onClick={() => markAttendance(emp.id, "Present")} className="attendance-btn present">
              Present
            </button>
            <button onClick={() => markAttendance(emp.id, "Absent")} className="attendance-btn absent">
              Absent
            </button>
          </div>
          <div className="payroll">
            Payroll: ${calculatePayroll(emp.salary, emp.attendanceStatus)}
          </div>
          <button onClick={() => deleteEmployee(emp.id, emp.name)} className="delete-btn">
            🗑️ Delete
          </button>
        </li>
      ))
    )}
  </ul>
</div>

    </div>
  );
}

export default Dashboard;
