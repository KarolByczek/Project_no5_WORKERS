import React from "react";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionModal } from "./QuestionModal";

export type EmployeeStatus = "weak" | "strong" | "medium";

export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  salary: number;
  status: EmployeeStatus;
  birthdate: Date;
  fucker: boolean;
  sucker: boolean;
}

/*export interface EmployeesDTO {
  id: string,
  firstname: string,
  lastname: string,
  salary: number,
  status: EmployeeStatus,
  birthdate: string,
  fucker: string,
  sucker: string
}*/

export const Table = (props: { data: Employee[] }) => {
  const navigate = useNavigate();
  const [filtereddata, setFiltereddata] = useState(props.data);
  const [sortDirection, setSortDirection] = useState<string>("default");
  const [sortBy, setSortBy] = useState<string>("none");
  const [showcaseOpen, setShowcaseOpen] = useState<boolean>(false);

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
    event: MouseEvent<HTMLButtonElement>,
    item: Employee
  ): void => {
    event.preventDefault();
    navigate("/details", { state: item });
  };

  const onClickHandler02 = (
    event: MouseEvent<HTMLButtonElement>,
    item: Employee
  ): void => {
    event.preventDefault();
    navigate("/edit_page", { state: item });
  };

  const $showcase: Element | null = document.querySelector(".questionmodal");
  console.log($showcase);

  const onClickHandler03 = (event: MouseEvent<HTMLButtonElement>):void => {
    event.preventDefault();
    let variable = showcaseOpen;
    if (variable === false) {
      $showcase.style.display = 'block';
      variable = true;
    }
    else {
      $showcase.style.display = 'none';
      variable = false;
    }
    setShowcaseOpen(variable);
  };

  const sortAsc = (a: Employee, b: Employee, key: keyof Employee): number => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  };

  const sortDesc = (a: Employee, b: Employee, key: keyof Employee): number => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  };

  const handleHeaderColumnClick = (
    event: MouseEvent,
    key: keyof Employee
  ): void => {
    event.preventDefault();
    let sortedData = [...filtereddata];
    let tempsortdir = sortDirection;

    if (key !== sortBy) {
      tempsortdir = "descending";
    }

    if (tempsortdir === "default") {
      sortedData = sortedData.sort((a, b) => sortAsc(a, b, key));
      tempsortdir = "ascending";
    } else if (tempsortdir === "ascending") {
      sortedData = sortedData.sort((a, b) => sortDesc(a, b, key));
      tempsortdir = "descending";
    } else {
      sortedData = props.data;
      tempsortdir = "default";
    }
    setFiltereddata([...sortedData]);
    setSortBy(key);
    setSortDirection(tempsortdir);
  };

  function showArrow(key: keyof Employee): string {
    if (key === sortBy) {
      switch (sortDirection) {
        case "ascending":
          return "↑";
        case "descending":
          return "↓";
        default:
          return "";
      }
    }
    return "";
  }

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
      <QuestionModal
        className={"questionmodal"}
        dataset={filtereddata}
        item={filtereddata[0]}
      />
      <table className="table">
        <thead className="thead">
          <tr>
            <th>ID</th>
            <th
              onClick={(event) => handleHeaderColumnClick(event, "firstname")}
            >
              First Name{showArrow("firstname")}
            </th>
            <th onClick={(event) => handleHeaderColumnClick(event, "lastname")}>
              Last Name{showArrow("lastname")}
            </th>
            <th onClick={(event) => handleHeaderColumnClick(event, "salary")}>
              Salary{showArrow("salary")}
            </th>
            <th onClick={(event) => handleHeaderColumnClick(event, "status")}>
              Status{showArrow("status")}
            </th>
            <th
              onClick={(event) => handleHeaderColumnClick(event, "birthdate")}
            >
              Birthdate{showArrow("birthdate")}
            </th>
          </tr>
        </thead>
        <tbody className="tbody">
          {filtereddata.map((employee) => {
            return (
              <tr key={employee.id} className="tablerow">
                <td>{employee.id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.salary}</td>
                <td>{renderStatus(employee.status)}</td>
                <td>{new Date(employee.birthdate).toLocaleDateString()}</td>
                <td className="buttons">
                  <button onClick={(event) => onClickHandler(event, employee)}>
                    Details
                  </button>
                  <button
                    onClick={(event) => onClickHandler02(event, employee)}
                  >
                    Edit
                  </button>
                  <button onClick={(event) => onClickHandler03(event)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <p>SORTED BY: {sortBy}</p>
        <p>SORTING DIRECTION: {sortDirection}</p>
      </div>
    </>
  );
};
