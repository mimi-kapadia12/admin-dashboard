// Auther : Mansi Kapadia
// 8-10-2023

import EmployeeList from "./components/employee-list";
import { fetchEmployees } from "../src/services/employee-service";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  const handleDelete = (id) => {
    setEmployees(employees.filter((record) => record.id !== id));
  };

  const handleSelectedDelete = (ids) => {
    setEmployees(employees.filter((record) => !ids.includes(record.id)));
  };

  const fetchData = async () => {
    try {
      const data = await fetchEmployees();
      data.forEach((element) => {
        element.show = true;
      });
      setEmployees(data);
    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
    }
  };

  const handleSave = (id , edittedRecord) => {    
    setEmployees((record) => {
      return record.map((employee) => {        
        if (employee.id == id) {          
          return {
            ...employee,
            name: edittedRecord.name,
            email: edittedRecord.email,
            role: edittedRecord.role,
          };
        } else return employee;
      });
    });
  };

  const handleSearch = (e) => {
    let searchText = e.target.value;
    searchText = searchText.toLowerCase();

    setEmployees((record) => {
      return record.filter((employee) => {
        if (
          employee.name.toLowerCase().includes(searchText) ||
          employee.email.toLowerCase().includes(searchText) ||
          employee.role.toLowerCase().includes(searchText)
        ) {
          employee.show = true;
          return employee;
        }
        employee.show = false;
        return employee;
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h3>Employee List </h3>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        onChange={handleSearch}
      />

      <EmployeeList
        employees={employees.filter((record) => record.show)}
        handleDelete={handleDelete}
        handleSelectedDelete={handleSelectedDelete}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App;
