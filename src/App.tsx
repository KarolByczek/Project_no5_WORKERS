import { Table } from "./components/Table";
import { Employee } from "./components/Table";
import { useState } from "react";
import { DetailModal } from "./components/DetailModal";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";



const employees:Employee[] = [
  {
    id: 0,
    firstname: "Jan",
    lastname: "Nowak",
    salary: 2500,
    status: "weak",
    birthdate: new Date('2000-10-13'),
    fucker: true,
    sucker: true 
  },
  {
    id: 1,
    firstname: "Zbigniew",
    lastname: "Szarota",
    salary: 3000,
    status: "strong",
    birthdate: new Date('1999-10-21'),
    fucker: false,
    sucker: true
  },
  {
    id: 2,
    firstname: "Waldemar",
    lastname: "Siekieratka",
    salary: 2600,
    status: "weak",
    birthdate: new Date('1994-08-31'),
    fucker: true,
    sucker: false
  },
  {
    id: 3,
    firstname: "Arleta",
    lastname: "Bomba",
    salary: 2800,
    status: "medium",
    birthdate: new Date('1990-10-10'),
    fucker: false,
    sucker: false
  }
];


function App() {
  const [listof] = useState<Employee[]>(employees);

  return (
    <>
      <h1>WORKERS</h1>
      <Table data={listof} />
      <DetailModal />
    </>
  );
}

export default App;
