//import React from 'react'
import { useLocation } from "react-router-dom";
import { Employee } from "../components/Table";
import "../index.css";

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
      <div className="detail_header">DETAILS:</div>
      <div className="detail_records">
        <label htmlFor="lastname">Lastname:</label>
        <input type="text" id="lastname" readOnly value={data.lastname} />
        <label htmlFor="birthdate">Birthdate:</label>
        <input
          type="text"
          id="birthdate"
          readOnly
          value={dateFormater(new Date(data.birthdate))}
        />
        <label htmlFor="fucker">Fucker:</label>
        <input type="text" id="fucker" readOnly value={`${data.fucker}`} />
        <label htmlFor="sucker">Sucker:</label>
        <input type="text" id="sucker" readOnly value={`${data.sucker}`} />
      </div>
    </div>
  );
};
