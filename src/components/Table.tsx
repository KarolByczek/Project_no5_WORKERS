//import React from 'react';
import { MouseEvent } from "react";
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

  const renderStatus = (status:EmployeeStatus): string => {
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

  const onClickHandler = (event: MouseEvent<HTMLTableRowElement>, item:Employee):void => {
    event.preventDefault();
    navigate('/details', {state: item});
  }


  return (
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
        {props.data.map((employee) => {
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
              <td>{(`${employee.birthdate}`).substring(0, 16)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
