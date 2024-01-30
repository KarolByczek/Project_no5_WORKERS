import React from "react";
import { Employee } from "../components/Table";
import { useNavigate } from "react-router-dom";

export function AddEmployee() {
  const navigate = useNavigate();

  const makeEmployee = (formdata: FormData):Employee => {
    return {
      id: +Date.now(),
      firstname: formdata.get('firstname') as string,
      lastname: formdata.get('lastname') as string,
      birthdate: new Date(formdata.get('birthdate') as string),
      salary: formdata.get('salary') as unknown as number,
      fucker: formdata.get('fucker') as unknown as boolean,
      status: 'weak',
      sucker: formdata.get('sucker') as unknown as boolean
    }
  }

  const handleAddEmployee = (event: React.FormEvent) => {
    event.preventDefault();
    //window.alert('Great Success! You have added your new employee to the list :)');
    const form = event.target as HTMLFormElement;
    const formdata = new FormData(form);

    const newEmployeeToSend = makeEmployee(formdata);
    navigate("/", { state: newEmployeeToSend });
    console.log(newEmployeeToSend);
    console.log('Formularz zstał wysłany')
  };


  return (
    <div>
      <h3>PROVIDE DATA OF AN EMPLOYEE YOU WOULD LIKE TO ADD TO THE LIST:</h3>
      <form className="add_employee_form" onSubmit={handleAddEmployee}>
        <label htmlFor="firstname">
          First Name:
          <input name="firstname" type="text" />
        </label>
        <label htmlFor="lastname">
          Last Name:
          <input name="lastname" type="text" />
        </label>
        <label htmlFor="salary">
          Salary:
          <input name="salary" type="number" />
        </label>
        <label htmlFor="status">
          Status:
          <input name="status" type="text" />
        </label>
        <label htmlFor="birthdate">
          Birthdate:
          <input name="birthdate" type="text" />
        </label>
        <label htmlFor="fucker">
          Fucker:
          <input name="fucker" type="text" />
        </label>
        <label htmlFor="sucker">
          Sucker:
          <input name="sucker" type="text" />
        </label>
        <button type="submit">ADD HER OR HIM</button>
      </form>
    </div>
  );
}
