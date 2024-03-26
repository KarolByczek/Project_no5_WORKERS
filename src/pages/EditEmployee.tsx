import React, { useState } from "react";
import { Employee, EmployeeStatus } from "../components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { statusOptions } from "../AUXILIARY OBJECTS/statusoptions";

export function EditEmployee() {
    const location = useLocation();
    const navigate = useNavigate();
    const data: Employee = location.state;
    const [inputValue0, setInputValue0] = useState<string>(data.firstname);
    const [inputValue1, setInputValue1] = useState<string>(data.lastname);
    const [inputValue2, setInputValue2] = useState<string>(data.salary.toString());
    const [inputValue4, setInputValue4] = useState<string>((data.birthdate).toString().substring(0,10));
    

  const makeEmployee = (formdata: FormData):Employee => {
    return {
      id: Date.now().toString(),
      firstname: formdata.get('firstname') as string,
      lastname: formdata.get('lastname') as string,
      birthdate: new Date(formdata.get('birthdate') as string),
      salary: +(formdata.get('salary') as string),
      club_member: formdata.get('club_member') as string,
      status: formdata.get("status") as EmployeeStatus,
      car_owner: formdata.get('car_owner') as string
    }
  }

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formdata = new FormData(form);
    const editedData = makeEmployee(formdata);

    fetch(`http://localhost:3000/employees/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/#bottom_line");
        } else {
          console.log("Something went wrong!");
          throw new Error("Error");
        }
      })
      .catch((err) => console.error(err));
 
    console.log('The employee data has been edited')
  };

//DRY!!
  return (
    <div id="edit_page">
      <h1>EDIT EMPLOYEE DATA:</h1>
      <form className="edit_employee_form" onSubmit={handleEdit}>
        <label htmlFor="firstname">
          First Name:
          <input name="firstname" type="text" onChange={(event) => setInputValue0(event.target.value)} value={inputValue0} />
        </label>
        <label htmlFor="lastname">
          Last Name:
          <input name="lastname" type="text" onChange={(event) => setInputValue1(event.target.value)} value={inputValue1} />
        </label>
        <label htmlFor="salary">
          Salary:
          <input name="salary" type="number" onChange={(event) => setInputValue2(event.target.value)} value={inputValue2} />
        </label>
        <label htmlFor="status">
          Status:
          <select name="status" id="status">
            {statusOptions.map((option) => {
              return (
              <option key={option.value} value={option.value} selected={data.status === option.label}>{option.label}</option>
            )})}
          </select>
        </label>
        <label htmlFor="birthdate">
          Birthdate:
          <input name="birthdate" type="text" onChange={(event) => setInputValue4((event.target.value))} value={inputValue4} />
        </label>
        <label htmlFor="club_member">
          Club Member:
          <select name="club_member">
            <option value="true" selected={data.club_member === "true"}>YES</option>
            <option value="false" selected={data.club_member === "false"}>NO</option>
          </select>
        </label>
        <label htmlFor="car_owner">
          Car Owner:
          <select name="car_owner">
            <option value="true" selected={data.car_owner === "true"}>YES</option>
            <option value="false" selected={data.car_owner === "false"}>NO</option>
          </select>
        </label>
        <button type="submit">SAVE AFTER EDITING HER OR HIM</button>
      </form>
    </div>
  );
}
