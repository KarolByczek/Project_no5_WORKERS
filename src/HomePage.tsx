import { Table } from "./components/Table";
import { Employee } from "./components/Table";
//import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function HomePage() {
  const [totalemployees, setTotalemployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/employees').then(response => response.json())
    //.then(dapa => console.log(dapa))
    .then(responseData => setTotalemployees(responseData))
  }, [setTotalemployees]);
 

  return (
    <>
      <h1>EMPLOYEES</h1>
      <Link className='add_employee_link' to='add_form'>ADD A NEW EMPLOYEE</Link>
     { totalemployees.length > 0 ? <Table data={totalemployees} />: null}
    </>
  );
}

export default HomePage;
