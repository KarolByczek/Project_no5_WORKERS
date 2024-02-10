import React from "react";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionModal } from "./QuestionModal";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const $showcase: any = document.querySelector(".questionmodal");
  const [filtereddata, setFiltereddata] = useState<Employee[]>(props.data);
  const [filtereddataForSorting, setFiltereddataForSorting] = useState<Employee[]>(props.data);
  const [sortDirection, setSortDirection] = useState<string>("default");
  const [sortBy, setSortBy] = useState<string>("none");
  const [currentGuy, setCurrentGuy] = useState<Employee>(props.data[0]);


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
    setFiltereddataForSorting(data01)
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

  const onClickHandler03 = (
    event: MouseEvent<HTMLButtonElement>,
    guyToDelete: Employee
  ): void => {
    event.preventDefault();
    $showcase.style.display = "block";
    setCurrentGuy(guyToDelete);
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
    let sortedData = [...filtereddataForSorting];
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
      sortedData = [...filtereddataForSorting];
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
        {t("search_for")}
        <input
          placeholder={t('search_placeholder')}
          type="search"
          onKeyUp={onChangeHandler}
        /><span> </span>
        {t("employee_result", {count: filtereddata.length})}
      </div>
      <QuestionModal
        className={"questionmodal"}
        dataset={filtereddata}
        item={currentGuy}
        hook={setFiltereddata}
        element={$showcase}
      />
      <table className="table">
        <thead className="thead">
          <tr>
            <th>ID</th>
            <th
              onClick={(event) => handleHeaderColumnClick(event, "firstname")}
            >
              {t("first_name")}
              {showArrow("firstname")}
            </th>
            <th onClick={(event) => handleHeaderColumnClick(event, "lastname")}>
              {t("last_name")}
              {showArrow("lastname")}
            </th>
            <th onClick={(event) => handleHeaderColumnClick(event, "salary")}>
              {t("salary")}
              {showArrow("salary")}
            </th>
            <th onClick={(event) => handleHeaderColumnClick(event, "status")}>
              {t("status")}
              {showArrow("status")}
            </th>
            <th
              onClick={(event) => handleHeaderColumnClick(event, "birthdate")}
            >
              {t("birthdate")}
              {showArrow("birthdate")}
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
                    {t("details")}
                  </button>
                  <button
                    onClick={(event) => onClickHandler02(event, employee)}
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={(event) => onClickHandler03(event, employee)}
                  >
                    {t("remove")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <p>
          {t("sorted_by")} {sortBy}
        </p>
        <p>
          {t("sorting_direction")} {sortDirection}
        </p>
      </div>
    </>
  );
};
