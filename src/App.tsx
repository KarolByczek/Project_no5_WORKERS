import { Table } from "./components/Table";
import "./App.css";

export interface Employee {
  id:number,
  firstname:string,
  lastname:string,
  salary:number,
  status:string
}

const data:Employee[] = [
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
  return (
    <>
      <h1>WORKERS</h1>
      <Table/>
    </>
  );
}

export default App;
