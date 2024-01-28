import React from "react";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type EmployeeStatus = "weak" | "strong" | "medium";

export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  salary: number;
  status: EmployeeStatus;
  birthdate: Date;
  fucker: boolean;
  sucker: boolean;
  field: any
}

export const Table = (props: { data: Employee[] }) => {
  const navigate = useNavigate();
  const [filtereddata, setFiltereddata] = useState(props.data);
  const [sortDirection, setSortDirection] = useState<string>("default");

  const renderStatus = (status: EmployeeStatus): string => {
    switch (status) {
      case "weak":
        return ":(";
      case "strong":
        return ":)";
      case "medium":
        return ":/";
      default:
        return "?";
    }
  };

  const findByPhrase = (
    columns: string[],
    item: { [key: string]: string },
    phrase: string
  ): boolean => {
    let result = false;
    columns.forEach((key) => {
      const field = item[key].toString();
      console.log(field);
      console.log(field.toLowerCase());
      console.log(result);
      if (field.toLowerCase().includes(phrase)) {
        result = true;
        return;
      }
    });
    return result;
  };

  const onChangeHandler = (event: React.KeyboardEvent): void => {
    const input = event.target as HTMLInputElement;
    const phrase01 = input.value.toLowerCase();
    const cols = ["firstname", "lastname", "birthdate", "salary"];

    const data01 = props.data.filter((empl) => {
      return findByPhrase(
        cols,
        empl as unknown as { [key: string]: string },
        phrase01
      );
    });
    setFiltereddata(data01);
  };

  const onClickHandler = (
    event: MouseEvent<HTMLTableRowElement>,
    item: Employee
  ): void => {
    event.preventDefault();
    navigate("/details", { state: item });
  };

  const sortDesc = (a:Employee, b:Employee, key:keyof Employee): number => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  };

  const sortAsc = (a:Employee, b:Employee, key:keyof Employee): number => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  };

  const handleHeaderColumnClick = (event: MouseEvent, key:keyof Employee): void => {
    event.preventDefault();
    let sortedData = [...filtereddata];

    if (sortDirection === "default") {
      sortedData = sortedData.sort((a, b) => sortDesc(a, b, key));
      setSortDirection("descending");
    } else if (sortDirection === "descending") {
      sortedData = sortedData.sort((a, b) => sortAsc(a, b, key));
      setSortDirection("ascending");
    } else {
      sortedData = props.data;
      setSortDirection("default");
    }
    setFiltereddata([...sortedData]);
  };

  return (
    <>
      <div className="searchbar">
        SEARCH FOR:
        <input
          placeholder="Type any employee data..."
          type="search"
          onKeyUp={onChangeHandler}
        />
      </div>
      <table className="table">
        <thead className="thead">
          <tr>
            <th>ID</th>
            <th onClick={(event) => handleHeaderColumnClick(event, "firstname")}>First Name</th>
            <th onClick={(event) => handleHeaderColumnClick(event, "lastname")}>Last Name</th>
            <th onClick={(event) => handleHeaderColumnClick(event, "salary")}>Salary</th>
            <th>Status</th>
            <th onClick={(event) => handleHeaderColumnClick(event, "birthdate")}>Birthdate</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {filtereddata.map((employee) => {
            return (
              <tr
                key={employee.id}
                className="tablerow"
                onClick={(event) => onClickHandler(event, employee)}
              >
                <td>{employee.id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.salary}</td>
                <td>{renderStatus(employee.status)}</td>
                <td>{`${employee.birthdate}`.substring(0, 16)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
