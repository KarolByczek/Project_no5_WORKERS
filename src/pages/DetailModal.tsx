//import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { Employee } from "../components/Table";
import "../index.scss";

export const DetailModal = () => {
  const location = useLocation();
  console.log(location.state);
  const data: Employee = location.state;

  const dateFormater = (date0: Date): string => {
    const formatedmonth =
      date0.getMonth() < 10 ? "0" + (date0.getMonth() + 1) : date0.getMonth();
    const formatedday =
      date0.getDate() < 10 ? "0" + date0.getDate() : date0.getDate();
    return date0.getFullYear() + "-" + formatedmonth + "-" + formatedday;
  };

  return (
    <div className="detail_container">
      <Link className='detail_modal_return' to={'/'}>RETURN TO HOME PAGE</Link>
      <h1>DETAILS:</h1>
      <div className="detail_records">
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
        <label htmlFor="fucker">
          Fucker:
          <input type="text" id="fucker" readOnly value={`${data.fucker}`} />
        </label>
        <label htmlFor="sucker">
          Sucker:
          <input type="text" id="sucker" readOnly value={`${data.sucker}`} />
        </label>
      </div>
    </div>
  );
};
