import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { statusOptions } from "../AUXILIARY OBJECTS/statusoptions";
import { t } from "i18next";
import { collectionRef } from "../HomePage";
import { doc, updateDoc } from "firebase/firestore";

export function EditEmployee() {
    const location = useLocation();
    const navigate = useNavigate();
    const data: any = location.state;
    const [inputValue0, setInputValue0] = useState<string>(data.firstname);
    const [inputValue1, setInputValue1] = useState<string>(data.lastname);
    const [inputValue2, setInputValue2] = useState<string>(data.salary.toString());
    const [inputValue4, setInputValue4] = useState<string>((data.birthdate).toString());
    

  const makeEmployee = (formdata: FormData):any => {
    return {
      firstname: formdata.get('firstname') as string,
      lastname: formdata.get('lastname') as string,
      birthdate: new Date(formdata.get('birthdate') as string),
      salary: +(formdata.get('salary') as string),
      club_member: formdata.get('club_member') as string,
      status: formdata.get("status") as string,
      car_owner: formdata.get('car_owner') as string
    }
  }

  async function handleEdit (event: React.FormEvent, ref:any) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const editedData = makeEmployee(formData);

  try{
    const employeeRef = doc(collectionRef, ref.id);
    await updateDoc(employeeRef, editedData);
  } catch (error) {
    console.error(error);
  };

  
  };

//DRY!!
  return (
    <div id="edit_page">
      <h1>{t("edit_data")}:</h1>
      <form className="edit_employee_form" onSubmit={(event) => handleEdit(event, data)}>
        <label htmlFor="firstname">
          {t("first_name")}:
          <input name="firstname" type="text" onChange={(event) => setInputValue0(event.target.value)} value={inputValue0} />
        </label>
        <label htmlFor="lastname">
        {t("last_name")}:
          <input name="lastname" type="text" onChange={(event) => setInputValue1(event.target.value)} value={inputValue1} />
        </label>
        <label htmlFor="salary">
        {t("salary")}:
          <input name="salary" type="number" onChange={(event) => setInputValue2(event.target.value)} value={inputValue2} />
        </label>
        <label htmlFor="status">
        {t("status")}:
          <select name="status" id="status">
            {statusOptions.map((option) => {
              return (
              <option key={option.value} value={option.value} selected={data.status === option.label}>{option.label}</option>
            )})}
          </select>
        </label>
        <label htmlFor="birthdate">
        {t("birthdate")}:
          <input name="birthdate" type="text" onChange={(event) => setInputValue4((event.target.value))} value={inputValue4} />
        </label>
        <label htmlFor="club_member">
        {t("clubmember")}:
          <select name="club_member">
            <option value="true" selected={data.club_member === "true"}>{t("confirmation")}</option>
            <option value="false" selected={data.club_member === "false"}>{t("denial")}</option>
          </select>
        </label>
        <label htmlFor="car_owner">
        {t("carowner")}:
          <select name="car_owner">
            <option value="true" selected={data.car_owner === "true"}>{t("confirmation")}</option>
            <option value="false" selected={data.car_owner === "false"}>{t("denial")}</option>
          </select>
        </label>
        <button type="submit">{t("save_edited")}</button>
      </form>
    </div>
  );
}
