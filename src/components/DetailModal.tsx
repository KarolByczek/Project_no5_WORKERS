//import React from 'react'
import { useLocation } from "react-router-dom";
import { Employee } from "./Table";
import '../index.css';

export const DetailModal = () => {
  const location = useLocation();
  console.log(location.state);
  const data: Employee = location.state;

  return (
    <div className="detail_container">
      <div className="detail_header">DETAILS:</div>
      <div className="detail_records">
        <label htmlFor="lastname">Lastname:</label>
        <input type="text" id="lastname" readOnly value={data.lastname} />
        <label htmlFor="fucker">Fucker:</label>
        <input type="text" id="fucker" readOnly value={`${data.fucker}`} />
        <label htmlFor="sucker">Sucker:</label>
        <input type="text" id="sucker" readOnly value={`${data.sucker}`} />
      </div>
    </div>
  );
};
