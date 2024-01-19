import { Table } from "./components/Table";
import { Employee } from "./components/Table";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";


const employees:Employee[] = [
  {
    id: 1,
    firstname: "Jan",
    lastname: "Nowak",
    salary: 2500,
    status: "weak",
    birthdate: new Date('2000-10-13') 
  },
  {
    id: 2,
    firstname: "Zbigniew",
    lastname: "Szarota",
    salary: 3000,
    status: "strong",
    birthdate: new Date('1999-10-21')
  },
  {
    id: 3,
    firstname: "Waldemar",
    lastname: "Siekieratka",
    salary: 2600,
    status: "weak",
    birthdate: new Date('1994-08-31')
  },
  {
    id: 4,
    firstname: "Arleta",
    lastname: "Bomba",
    salary: 2800,
    status: "medium",
    birthdate: new Date('1990-10-10')
  }
];

const clickTheRow = () => {
  window.alert('HEY, WHATs UP?!');
}

function App() {
  const [listof] = useState<Employee[]>(employees);

  return (
    <>
    <div className="container">
      <h1>WORKERS</h1>
      <Table data={listof} onClick={clickTheRow}/>
    </div>
    </>
  );
}

export default App;
