//import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { Employee } from "../components/Table";
import "../index.scss";

export const EmployeeDetail = () => {
  const location = useLocation();
  console.log(location.state);
  const data: Employee = location.state;

  const dateFormater = (date0: Date): string => {
    const formatedmonth = date0.getMonth() < 9 ? "0" + (date0.getMonth() + 1) : date0.getMonth() + 1;
    const formatedday = date0.getDate() < 10 ? "0" + date0.getDate() : date0.getDate();
    return date0.getFullYear() + "-" + formatedmonth + "-" + formatedday;
  };

  const renderDetails = (fact:string): string => {
    switch (fact) {
      case "true":
        return "✔️";
      case "false":
        return "❌";
      default:
        return "?";
    }
  };

  return (
    <div className="detail_container">
      <div className="detail_records">
        <h1>DETAILS:</h1>
        <label htmlFor="lastname">
          Lastname:
          <input type="text" id="lastname" readOnly value={data.lastname} />
        </label>
        <label htmlFor="birthdate">
          Birthdate:
          <input
            type="text"
            id="birthdate"
            readOnly
            value={dateFormater(new Date(data.birthdate))}
          />
        </label>
        <label htmlFor="club_member">
          Club Member:
          <input type="text" id="club_member" readOnly value={renderDetails(data.club_member)} />
        </label>
        <label htmlFor="car_owner">
          Car Owner:
          <input type="text" id="car_owner" readOnly value={renderDetails(data.car_owner)} />
        </label>
      </div>
      <Link className='detail_modal_return' to={'/'}>RETURN TO HOME PAGE</Link>
    </div>
  );
};
