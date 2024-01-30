import React from "react";
import { Employee } from "../components/Table";
import { useLocation } from "react-router-dom";

export function EditEmployee() {

    const location = useLocation();
    console.log(location.state);
    const data: Employee = location.state;

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

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    //window.alert('Great Success! You have added your new employee to the list :)');
    const form = event.target as HTMLFormElement;
    const formdata = new FormData(form);

    const editedData = makeEmployee(formdata);
    console.log(editedData);

    console.log('Formularz został wysłany')
  };

  return (
    <div>
      <h3>EDIT EMPLOYEE DATA:</h3>
      <form className="add_employee_form" onSubmit={handleEdit}>
        <label htmlFor="firstname">
          First Name:
          <input name="firstname" type="text" value={data.firstname} />
        </label>
        <label htmlFor="lastname">
          Last Name:
          <input name="lastname" type="text" value={data.lastname} />
        </label>
        <label htmlFor="salary">
          Salary:
          <input name="salary" type="number" value={data.salary} />
        </label>
        <label htmlFor="status">
          Status:
          <input name="status" type="text" value={data.status} />
        </label>
        <label htmlFor="birthdate">
          Birthdate:
          <input name="birthdate" type="text" value={data.birthdate.toString()} />
        </label>
        <label htmlFor="fucker">
          Fucker:
          <input name="fucker" type="text" value={data.fucker.toString()} />
        </label>
        <label htmlFor="sucker">
          Sucker:
          <input name="sucker" type="text" value={data.sucker.toString()} />
        </label>
        <button type="submit">SAVE AFTER EDITING HER OR HIM</button>
      </form>
    </div>
  );
}
