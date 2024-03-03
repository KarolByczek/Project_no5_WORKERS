import React, { useState } from "react";
import { Employee, EmployeeStatus } from "../components/Table";
import { useLocation, useNavigate } from "react-router-dom";

export interface SelectOptions {
  value: string,
  label: string
}

export function EditEmployee() {
    const location = useLocation();
    const navigate = useNavigate()
    const data: Employee = location.state;
    const [inputValue0, setInputValue0] = useState<string>(data.firstname);
    const [inputValue1, setInputValue1] = useState<string>(data.lastname);
    const [inputValue2, setInputValue2] = useState<string>(data.salary.toString());
    const [inputValue3, setInputValue3] = useState<string>(data.status);
    const [inputValue4, setInputValue4] = useState<string>(new Date(data.birthdate).toString());
    const [inputValue5, setInputValue5] = useState<string>(data.fucker.toString());
    const [inputValue6, setInputValue6] = useState<string>(data.sucker.toString())
    
const selectOptions:SelectOptions[] = [
  {value: 'weak', label: 'weak'},
  {value: 'medium', label: 'medium'},
  {value: 'strong', label: 'strong'}
]

  const makeEmployee = (formdata: FormData):Employee => {
    return {
      id: Date.now().toString(),
      firstname: formdata.get('firstname') as string,
      lastname: formdata.get('lastname') as string,
      birthdate: new Date(formdata.get('birthdate') as string),
      salary: formdata.get('salary') as unknown as number,
      fucker: formdata.get('fucker') as unknown as boolean,
      status: formdata.get("status") as EmployeeStatus,
      sucker: formdata.get('sucker') as unknown as boolean
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
          navigate("/");
        } else {
          console.log("Something went wrong!");
          throw new Error("Mi scusi, tu es putana!");
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
            {selectOptions.map((option) => {
              return (
              <option key={option.value} value={option.value} selected={inputValue3 === option.label}>{option.label}</option>
            )})}
          </select>
        </label>
        <label htmlFor="birthdate">
          Birthdate:
          <input name="birthdate" type="text" onChange={(event) => setInputValue4(event.target.value)} value={inputValue4.substring(0, 15)} />
        </label>
        <label htmlFor="fucker">
          Fucker:
          <input name="fucker" type="text" onChange={(event) => setInputValue5(event.target.value)} value={inputValue5} />
        </label>
        <label htmlFor="sucker">
          Sucker:
          <input name="sucker" type="text" onChange={(event) => setInputValue6(event.target.value)} value={inputValue6} />
        </label>
        <button type="submit">SAVE AFTER EDITING HER OR HIM</button>
      </form>
    </div>
  );
}
