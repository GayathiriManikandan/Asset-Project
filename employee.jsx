import React, { useState } from 'react';
import './employee.css';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeeID] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is active
  const [editingEmployeeId, setEditingEmployeeId] = useState(null); // Track which employee is being edited

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateEmployee(editingEmployeeId, { employeeID, name, mobile, email });
    } else {
      addEmployee({ employeeID, name, mobile, email });
    }
    resetForm();
  };

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, { id: Date.now(), ...newEmployee }]);
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
      )
    );
  };

  const editEmployee = (employee) => {
    setEmployeeID(employee.employeeID);
    setName(employee.name);
    setMobile(employee.mobile);
    setEmail(employee.email);
    setIsEditing(true);
    setEditingEmployeeId(employee.id);
    setShowForm(true);
  };

  const removeEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const resetForm = () => {
    setEmployeeID('');
    setName('');
    setMobile('');
    setEmail('');
    setIsEditing(false);
    setEditingEmployeeId(null);
    setShowForm(false);
  };

  return (
    <div className="employee-page">
      <h1>No. of Employees</h1>

      {/* Conditionally render the form */}
      {showForm && (
        <div className="form-overlay">
          <form className="add-employee-form" onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
            <div className="form-fields">
              <div>
                <label>Employee ID:</label>
                <input
                  type="text"
                  value={employeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Mobile Number:</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-buttons">
              <button className="insert-button" type="submit">
                {isEditing ? 'Update' : 'Insert'}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employeeID}</td>
              <td>{employee.name}</td>
              <td>{employee.mobile}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => editEmployee(employee)}
                >
                  Edit
                </button>
                <button
                  className="remove-button"
                  onClick={() => removeEmployee(employee.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-employee-button-container">
        <button
          className="toggle-form-button"
          onClick={() => setShowForm(true)}
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default EmployeePage;
