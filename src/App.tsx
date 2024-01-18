import { Table } from "./components/Table";
import { Employee } from "./components/Table";
import { useState } from "react";
import "./App.css";


const employees:Employee[] = [
  {
    id: 1,
    firstname: "Jan",
    lastname: "Nowak",
    salary: 2500,
    status: "weak" 
  },
  {
    id: 2,
    firstname: "Zbigniew",
    lastname: "Szarota",
    salary: 3000,
    status: "strong"
  },
  {
    id: 3,
    firstname: "Waldemar",
    lastname: "Siekieratka",
    salary: 2600,
    status: "weak"
  },
  {
    id: 4,
    firstname: "Arleta",
    lastname: "Bomba",
    salary: 2800,
    status: "medium"
  }
]

function App() {
  const [listof] = useState<Employee[]>(employees);

  return (
    <>
      <h1>WORKERS</h1>
      <Table data={listof}/>
    </>
  );
}

export default App;
