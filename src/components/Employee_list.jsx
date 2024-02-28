import React, { useState } from "react";
import "./Employee_list.css";
function Employee_list() {
  const [formData, setFormdata] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    email: "",
    mode_of_contact: [],
    marital_status: "",
    immediate_joiner: "",
  });
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    if (
      formData.first_name &&
      formData.last_name &&
      phoneRegex.test(formData.phone_number) &&
      emailRegex.test(formData.email)
    ) {
      if (editingId === null) {
        const newEmployee = { ...formData, id: new Date().getTime() };
        setEmployees([...employees, newEmployee]);
        setFormdata({
          first_name: "",
          middle_name: "",
          last_name: "",
          gender: "",
          phone_number: "",
          email: "",
          mode_of_contact: [],
          marital_status: "",
          immediate_joiner: "",
        });
        localStorage.setItem(
          "employees",
          JSON.stringify([...employees, newEmployee])
        );
      } else {
        const updatedEmployees = employees.map((employee) =>
          employee.id === editingId ? { ...formData, id: editingId } : employee
        );
        setEmployees(updatedEmployees);
        setFormdata({
          first_name: "",
          middle_name: "",
          last_name: "",
          gender: "",
          phone_number: "",
          email: "",
          mode_of_contact: [],
          marital_status: "",
          immediate_joiner: "",
        });
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setEditingId(null);
      }
      alert("Details Entered successfully.");
    } else {
      if (!formData.first_name) {
        alert("Please check if First name is filled.");
      }
      if (!formData.last_name) {
        alert("Please check if  Last name is filled.");
      }
      if (!emailRegex.test(formData.email)) {
        alert("Please check if the email format is correct.");
      }
      if (!phoneRegex.test(formData.phone_number)) {
        alert("Please check if the phone number format is correct.");
      }
    }
  };

  const handleClear = () => {
    setFormdata({
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "",
      phone_number: "",
      email: "",
      mode_of_contact: [],
      marital_status: "",
      immediate_joiner: "",
    });
    alert("Cleared successfully");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormdata({
        ...formData,
        [name]: formData[name].includes(value)
          ? formData[name].filter((v) => v !== value)
          : [...formData[name], value],
      });
    } else {
      setFormdata({ ...formData, [name]: value });
    }
  };
  const handleEdit = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    setFormdata(employeeToEdit);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  React.useEffect(() => {
    const employeesFromLocalStorage = JSON.parse(
      localStorage.getItem("employees")
    );
    if (employeesFromLocalStorage) {
      setEmployees(employeesFromLocalStorage);
    }
  }, []);
  return (
    <>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Employee Registration Form</h2>
          </div>
          <div className="row clearfix">
            <div className="">
              <form>
                <div className="row clearfix">
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <span>
                        <i aria-hidden="true" className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        required
                        value={formData.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <span>
                        <i aria-hidden="true" className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        name="middle_name"
                        placeholder="Middle Name"
                        value={formData.middle_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <span>
                        <i aria-hidden="true" className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        required
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="input_field radio_option">
                  <p style={{ display: "inline", paddingRight: "2rem" }}>
                    Gender
                  </p>
                  <input
                    type="radio"
                    name="gender"
                    id="rd1"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                  />
                  <label for="rd1">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    id="rd2"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                  />
                  <label for="rd2">Female</label>
                  <input
                    type="radio"
                    name="gender"
                    id="rd3"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={handleInputChange}
                  />
                  <label for="rd3">Others</label>
                </div>

                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" class="fa-solid fa-phone"></i>
                  </span>
                  <input
                    type="number"
                    name="phone_number"
                    placeholder="Phone Number"
                    required
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input_field checkbox_option">
                  <p style={{ display: "inline", paddingRight: "2rem" }}>
                    Mode of Contact :
                  </p>
                  <input
                    type="checkbox"
                    id="cb1"
                    name="mode_of_contact"
                    value="phone"
                    checked={formData.mode_of_contact.includes("phone")}
                    onChange={handleInputChange}
                  />
                  <label for="cb1">Phone</label>

                  <input
                    type="checkbox"
                    id="cb2"
                    name="mode_of_contact"
                    value="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    checked={formData.mode_of_contact.includes("email")}
                    onChange={handleInputChange}
                  />
                  <label for="cb2">Email</label>
                </div>
                <div className="input_field select_option">
                  <p style={{ display: "inline", paddingRight: "2rem" }}>
                    Marital Status :
                  </p>
                  <select
                    name="marital_status"
                    value={formData.marital_status}
                    onChange={handleInputChange}
                  >
                    <option>Married</option>
                    <option>Single</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </select>
                  <div className="select_arrow"></div>
                </div>
                <div className="input_field radio_option">
                  <p style={{ display: "inline", paddingRight: "2rem" }}>
                    Immediate joiner
                  </p>
                  <input
                    type="radio"
                    name="immediate_joiner"
                    id="rd4"
                    value="yes"
                    checked={formData.immediate_joiner === "yes"}
                    onChange={handleInputChange}
                  />
                  <label for="rd4">Yes</label>
                  <input
                    type="radio"
                    name="immediate_joiner"
                    id="rd5"
                    value="no"
                    checked={formData.immediate_joiner === "no"}
                    onChange={handleInputChange}
                  />
                  <label for="rd5">No</label>
                </div>
                <div className="control-btns">
                  <input
                    className="button"
                    type="submit"
                    value={editingId !== null ? "Update" : "Submit"}
                    onClick={handleSubmit}
                  />

                  <input
                    className="button"
                    type="submit"
                    value="Clear"
                    onClick={handleClear}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="w3-container">
        <h2>Employees list</h2>
        <table className="w3-table-all">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Mode of Contact</th>
              <th>Marital Status</th>
              <th>Immediate Joiner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.first_name}</td>
                  <td>{employee.middle_name || "N/A"}</td>
                  <td>{employee.last_name || "N/A"}</td>
                  <td>{employee.gender || "N/A"}</td>
                  <td>{employee.phone_number}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mode_of_contact.join(", ") || "N/A"}</td>
                  <td>{employee.marital_status || "N/A"}</td>
                  <td>{employee.immediate_joiner || "N/A"}</td>
                  <td>
                    <button
                      className="w3-button w3-blue"
                      onClick={() => handleEdit(employee.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="w3-button w3-red"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontStyle: "italic",
                  }}
                >
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Employee_list;
