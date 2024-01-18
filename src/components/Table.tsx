//import React from 'react';

type EmployeeStatus = string;

export interface Employee {
    id:number,
    firstname:string,
    lastname:string,
    salary:number,
    status:string
  }

export const Table = (props: {data:Employee[]}) => {
    const renderStatus = (status:EmployeeStatus):string => {
        switch (status) {
            case 'weak':
              return ':(';
            case 'strong':
              return ':)';
            case 'medium':
              return ':/'
            default:
              return '?'
        }
    }

  return (
    <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Salary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((employee) => {
            return ( 
          <tr>
            <td>{employee.id}</td>
            <td>{employee.firstname}</td>
            <td>{employee.lastname}</td>
            <td>{employee.salary}</td>
            <td>{renderStatus(employee.status)}</td>
          </tr>
            )
          })}
        </tbody>
      </table>
  )
}
