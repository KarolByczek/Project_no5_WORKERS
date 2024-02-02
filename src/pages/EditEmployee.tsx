import React, { useState } from "react";
import { Employee, EmployeeStatus } from "../components/Table";
import { useLocation, useNavigate } from "react-router-dom";

export function EditEmployee() {
    const location = useLocation();
    const navigate = useNavigate()
    const data: Employee = location.state;
    const [inputValue0, setInputValue0] = useState<any>(data.firstname);
    const [inputValue1, setInputValue1] = useState<any>(data.lastname);
    const [inputValue2, setInputValue2] = useState<any>(data.salary);
    const [inputValue3, setInputValue3] = useState<any>(data.status);
    const [inputValue4, setInputValue4] = useState<any>(new Date(data.birthdate).toDateString());
    const [inputValue5, setInputValue5] = useState<any>(data.fucker);
    const [inputValue6, setInputValue6] = useState<any>(data.sucker)
    

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
    //window.alert('Great Success! You have edited your employee data:)');
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


  return (
    <div>
      <h3>EDIT EMPLOYEE DATA:</h3>
      <form className="add_employee_form" onSubmit={handleEdit}>
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
          <input name="status" type="text" onChange={(event) => setInputValue3(event.target.value)} value={inputValue3} />
        </label>
        <label htmlFor="birthdate">
          Birthdate:
          <input name="birthdate" type="text" onChange={(event) => setInputValue4(event.target.value)} value={inputValue4} />
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
