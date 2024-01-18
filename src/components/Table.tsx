import React from 'react'

export const Table = () => {
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
          {data.map((employee) => {
            return ( 
          <tr>
            <td>{employee.id}</td>
            <td>{employee.firstname}</td>
            <td>{employee.lastname}</td>
            <td>{employee.salary}</td>
            <td>{employee.status}</td>
          </tr>
            )
          })}
        </tbody>
      </table>
  )
}
