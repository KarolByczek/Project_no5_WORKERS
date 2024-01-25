//import React from 'react';
import { KeyboardEvent, MouseEvent, useState } from "react";
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

export const Table = (props: { data: Employee[] }) => {
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

  const findByPhrase = (columns:string[], item:any, phrase:string):boolean => {
    columns.forEach(key => {
      const field = item[key];
      field.toLowerCase().includes(phrase)
    })
    return 
  }

  /*const onChangeHandler = (event: KeyboardEvent):void => {
    const input = event.target as HTMLInputElement;
    const phrase = input.value.toLowerCase();
    const data01 = props.data.filter(item => {
      return item.firstname.toLowerCase().includes(phrase)
      || item.lastname.toLowerCase().includes(phrase)
      || item.birthdate.toString().includes(phrase)
      || item.salary.toString().includes(phrase);
    })
    console.log(data01);
    setFiltereddata(data01);
  };*/

  const onClickHandler = (
    event: MouseEvent<HTMLTableRowElement>,
    item: Employee
  ): void => {
    event.preventDefault();
    navigate("/details", { state: item });
  };

  return (
    <>
      <div className="m-4">
        <label htmlFor="formcontrol">
          SEARCH FOR:{" "}
          <input
            type="search"
            id="formcontrol"
            className="formcontrol"
            placeholder="Type any employee data..."
            onKeyUp={onChangeHandler}
          />
        </label>
      </div>
      <table className="table table-striped mt-5">
        <thead className="fs-4">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
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
