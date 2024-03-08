import { Employee, EmployeeStatus } from "../components/Table";
import { useNavigate } from "react-router-dom";
import { statusOptions } from "../AUXILIARY OBJECTS/statusoptions";

export function AddEmployee() {
  const navigate = useNavigate();

  const makeEmployee = (formdata: FormData): Employee => {
    return {
      id: Date.now().toString(),
      firstname: formdata.get("firstname") as string,
      lastname: formdata.get("lastname") as string,
      birthdate: new Date(formdata.get("birthdate") as string),
      salary: +(formdata.get("salary") as string),
      club_member: formdata.get("club_member") as unknown as boolean,
      status: formdata.get('status') as EmployeeStatus,
      car_owner: formdata.get("car_owner") as unknown as boolean,
    };
  };

  const handleAddEmployee = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formdata = new FormData(form);

    const newEmployeeToSend = makeEmployee(formdata);
    fetch("http://localhost:3000/employees", {
      method: "POST",
      body: JSON.stringify(newEmployeeToSend),
    })
      .then((response) => {
        if (response.status === 201) {
          navigate("/");
          console.log("The Employee has been added.");
        } else {
          console.log("Something went wrong!");
          throw new Error("Fatal error");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="add_page">
      <h2>PROVIDE DATA OF AN EMPLOYEE YOU WOULD LIKE TO ADD TO THE LIST:</h2>
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
            <select name="status">
              {statusOptions.map((opt) => {
                return (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                );
              })}
            </select>
          </label>
        <label htmlFor="birthdate">
          Birthdate:
          <input name="birthdate" type="text" />
        </label>
        <label htmlFor="club_member">
          Club Member:
          <input name="club_member" type="text" />
        </label>
        <label htmlFor="car_owner">
          Car Owner:
          <input name="car_owner" type="text" />
        </label>
        <button type="submit">ADD THE EMPLOYEE</button>
      </form>
    </div>
  );
}
