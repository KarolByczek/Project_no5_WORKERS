import React from 'react';
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type EmployeeStatus = "weak" | "strong" | "medium";

export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  salary: number;
  status: EmployeeStatus;
  birthdate: Date;
  fucker: boolean;
  sucker: boolean;
}

export const Table = (props: { data: any[] }) => {
  const navigate = useNavigate();
  const [filtereddata, setFiltereddata] = useState(props.data);

  const renderStatus = (status: EmployeeStatus): string => {
    switch (status) {
      case "weak":
        return ":(";
      case "strong":
        return ":)";
      case "medium":
        return ":/";
      default:
        return "?";
    }
  };

  const findByPhrase = (
    columns: string[],
    item: {[key:string]:string},
    phrase: string
  ): boolean => {
    let result = false;
    columns.forEach((key) => {
      const field = item[key].toString();
      console.log(field);
      console.log(field.toLowerCase());
      console.log(result);
      if (field.toLowerCase().includes(phrase)) 
      {result = true;
      return;
      }
    });
    return result;
  }
  

  const onChangeHandler = (event: React.KeyboardEvent): void => {
    const input = event.target as HTMLInputElement;
    const phrase01 = input.value.toLowerCase();
    const cols = ["firstname", "lastname", "birthdate", "salary"];

    const data01 = props.data.filter((empl) => {
      return findByPhrase(cols, empl as unknown as {[key:string]:string}, phrase01)
    });
    setFiltereddata(data01);
  };

  const onClickHandler = (
    event: MouseEvent<HTMLTableRowElement>,
    item: Employee
  ): void => {
    event.preventDefault();
    navigate("/details", { state: item });
  };

  return (
    <>
      <div className="searchbar">
          SEARCH FOR:
          <input
            placeholder="Type any employee data..."
            type='search'
            onKeyUp={onChangeHandler}
          />
      </div>
      <table className="table">
        <thead className="thead">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {filtereddata.map((employee) => {
            return (
              <tr
                key={employee.id}
                className="tablerow"
                onClick={(event) => onClickHandler(event, employee)}
              >
                <td>{employee.id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.salary}</td>
                <td>{renderStatus(employee.status)}</td>
                <td>{`${employee.birthdate}`.substring(0, 16)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
