//import React from 'react'
import { useLocation } from "react-router-dom";
import { Employee } from './Table';

export const DetailModal = () => {
    const location = useLocation();
    console.log(location.state);
    const data:Employee = location.state;

  return (
    <div className='container'>
      <div className=" mb-5 fw-bold fs-5">DETAILS:</div>
      <div className="d-flex flex-column">
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
