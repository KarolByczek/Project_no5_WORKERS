import React, { useEffect } from "react";
import { MouseEvent, useState } from "react";
import { QuestionModal } from "./QuestionModal";
import { useNavigate } from "react-router-dom";
//import { StyleState } from "../HomePage";
import { useTranslation } from "react-i18next";

export type EmployeeStatus = "junior" | "mid" | "senior";

export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  salary: number;
  status: EmployeeStatus;
  birthdate: Date;
  club_member: string;
  car_owner: string;
}

/*export interface EmployeesDTO {
  id: string,
  firstname: string,
  lastname: string,
  salary: number,
  status: EmployeeStatus,
  birthdate: string,
  club_member: string,
  car_owner: string
}*/

export const Table = (props: { data: Employee[] }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [filtereddata, setFiltereddata] = useState<Employee[]>(props.data);
  const [filtereddataForSorting, setFiltereddataForSorting] = useState<
    Employee[]
  >(props.data);
  const [sortDirection, setSortDirection] = useState<string>("default");
  const [sortBy, setSortBy] = useState<string>("none");
  const [isQuestModOn, setIsQuestModOn] = useState<boolean>(false);
  const [currentEmpl, setCurrentEmpl] = useState<Employee>();
  const [deletedEmpls, setDeletedEmpls] = useState<Employee[]>([]);
  const [styleState, setStyleState] = useState<object>({});

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 200 && window.innerWidth > 740) {
        setStyleState({
          position: "sticky",
          top: "0",
        });
      } else {
        setStyleState({
          position: "relative",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setStyleState]);

  const renderStatus = (status: EmployeeStatus): string => {
    switch (status) {
      case "junior":
        return "➤";
      case "mid":
        return "➤➤";
      case "senior":
        return "➤➤➤";
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
    const data02 = data01.filter((one) => !deletedEmpls.includes(one));
    setFiltereddata(data02);
    setFiltereddataForSorting(data01);
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
    item: Employee
  ): void => {
    event.preventDefault();
    setIsQuestModOn(true);
    setCurrentEmpl(item);
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
      tempsortdir = "default";
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
          placeholder={t("search_placeholder")}
          type="search"
          onKeyUp={onChangeHandler}
        />
      </div>
      <span className="employees_count">
        {t("employee_result", { count: filtereddata.length })}
      </span>
      <table className="table">
        <thead className="thead" style={styleState}>
          <span>
            <i>SORT EMPLOYEES BY:</i>
          </span>
          <tr>
            <th className="not_for_sorting">ID</th>
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
            <th className="not_for_sorting">{t("actions")}</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {filtereddata.map((employee) => {
            return (
              <tr key={employee.id} className="tablerow">
                <td>
                  <span>ID:</span>
                  {employee.id}
                </td>
                <td>
                  <span>{t("first_name")}:</span>
                  {employee.firstname}
                </td>
                <td>
                  <span>{t("last_name")}:</span>
                  {employee.lastname}
                </td>
                <td>
                  <span>{t("salary")}:</span>
                  {employee.salary}
                </td>
                <td>
                  <span>{t("status")}:</span>
                  {renderStatus(employee.status)}
                </td>
                <td>
                  <span>{t("birthdate")}:</span>
                  {employee.birthdate.toString().substring(0, 10)}
                </td>
                <td className="buttons">
                  <span>Actions:</span>
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
                {isQuestModOn === true && employee === currentEmpl ? (
                  <QuestionModal
                    dataset={filtereddata}
                    toDelete={deletedEmpls}
                    className="question_modal"
                    item={employee}
                    setter01={setFiltereddata}
                    setter02={setIsQuestModOn}
                    setter03={setDeletedEmpls}
                  />
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <p>
          <strong>
            {t("sorted_by")}<span> </span>
            {sortBy === "firstname" ? t("first_name") : null}
            {sortBy === "lastname" ? t("last_name") : null}
            {sortBy === "salary" ? t("salary") : null}
            {sortBy === "status" ? t("status") : null}
            {sortBy === "birthdate" ? t("birthdate") : null}
            {sortBy === "none" ? t("none") : null}
          </strong>
        </p>
        <p>
          <strong>
            {t("sorting_direction")}<span> </span>
            {sortDirection === "default" ? t("default") : null}
            {sortDirection === "ascending" ? t("ascending") : null}
            {sortDirection === "descending" ? t("descending") : null}
          </strong>
        </p>
      </div>
    </>
  );
};
