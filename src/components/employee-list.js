// Auther : Mansi Kapadia
// 8-10-2023

import "../components/employee-list.css";
import React, { useState, useEffect } from "react";

const EmployeeList = ({
  employees,
  handleDelete,
  handleSelectedDelete,
  handleSave,
}) => {
  const [records, setRecords] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [editedValues, setEditedValues] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  // variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const nPage = Math.ceil(employees.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    setRecords(employees.slice(firstIndex, lastIndex)); // for pagination
    
    // if all the records are deleted from the last page it shows the second last page
    if(currentPage > 0 && nPage > 0 && currentPage > nPage) setCurrentPage(nPage);  
  }, [currentPage, employees]);

  //#region Edit and Delete employee records
  
  // to select single record
  const handleSelection = (id) => {
    setSelectedEmployee((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // to select all the records
  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedEmployee([]);
    } else {
      setSelectedEmployee(
        employees.slice(firstIndex, lastIndex).map((employee) => employee.id)
      );
    }
    setIsSelectAll(!isSelectAll);
  };

  //to edit employee
  const handleEditEmployee = (id) => {
    setEditMode({ ...editMode, [id]: true });
    setEditedValues((prev) => ({
      ...prev,
      [id]: {
        name: employees.find((employee) => employee.id === id).name,
        email: employees.find((employee) => employee.id === id).email,
        role: employees.find((employee) => employee.id === id).role,
      },
    }));
  };

  //to save editted employee data
  const handleSaveEmployees = (id) => {
    // Save edited values for selected employees
    handleSave(id , editedValues[id]);

    setEditMode((prev) => ({
      ...prev,
      [id]: false,
    }));

    setEditedValues((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  //#endregion

  // #region  handle pagination
  const prePage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < nPage) setCurrentPage(currentPage + 1);
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  //#endregion

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>
              {" "}
              <input
                type="checkbox"
                checked={isSelectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((employee) => (
            <tr
              key={employee.id}
              style={{
                backgroundColor: selectedEmployee.includes(employee.id)
                  ? "#ddd"
                  : "transparent",
              }}
            >
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleSelection(employee.id)}
                  checked={selectedEmployee.includes(employee.id)}
                />
              </td>
              {editMode[employee.id] ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedValues[employee.id].name}
                      onChange={(e) =>
                        setEditedValues((prev) => ({
                          ...prev,
                          [employee.id]: {
                            ...prev[employee.id],
                            name: e.target.value,
                          },
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedValues[employee.id].email}
                      onChange={(e) =>
                        setEditedValues((prev) => ({
                          ...prev,
                          [employee.id]: {
                            ...prev[employee.id],
                            email: e.target.value,
                          },
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedValues[employee.id].role}
                      onChange={(e) =>
                        setEditedValues((prev) => ({
                          ...prev,
                          [employee.id]: {
                            ...prev[employee.id],
                            role: e.target.value,
                          },
                        }))
                      }
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </>
              )}
              <td>
                {editMode[employee.id] ? (
                  <button className="btn" onClick={() => handleSaveEmployees(employee.id)}>
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-action"
                    onClick={() => handleEditEmployee(employee.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-action btn-delete"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={prePage}
          disabled={currentPage === 1}
          className="page-button prev-next"
        >
          Previous
        </button>

        {numbers.map((n, i) => (
          <button
            key={i}
            onClick={() => changeCurrentPage(n)}
            disabled={currentPage === i + 1}
            className={`page-button ${currentPage === n ? "active" : ""}`}
          >
            {n}
          </button>
        ))}
        <button
          className="page-button prev-next"
          onClick={nextPage}
          disabled={currentPage === nPage}
        >
          Next
        </button>
      </div>

      <button
        onClick={() => {
          handleSelectedDelete(selectedEmployee);
          if (isSelectAll) setIsSelectAll(!isSelectAll);
          setSelectedEmployee([]);
        }}
        className="btn btn-delete"
        hidden={selectedEmployee.length === 0}
      >
        Delete Selected
      </button>
    </div>
  );
};

export default EmployeeList;
