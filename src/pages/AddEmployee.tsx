
import { useNavigate } from "react-router-dom";
import { statusOptions } from "../AUXILIARY OBJECTS/statusoptions";
import { useTranslation } from "react-i18next";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDB9ZO1qAg3JMm6PVK1up8yrNWgBZKNi5Y",
  authDomain: "projectno5-workers-database.firebaseapp.com",
  projectId: "projectno5-workers-database",
  storageBucket: "projectno5-workers-database.appspot.com",
  messagingSenderId: "476845290981",
  appId: "1:476845290981:web:8017cc10c34b73cad5eb0c",
  measurementId: "G-FR61PS7RPS",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

async function addData(makerFunction:Function, makerdata:any) {
    addDoc(
        collection(db, "WORKERS_DATA"),
        makerFunction(makerdata)
      );
    };


export function AddEmployee() {

  const navigate = useNavigate();
  const { t } = useTranslation();
  
 
  function makeEmployee(formdata: FormData) {
    return {
      id: Date.now().toString(),
      firstname: formdata.get("firstname") as string,
      lastname: formdata.get("lastname") as string,
      birthdate: Timestamp.fromDate(new Date(formdata.get("birthdate") as string)),
      salary: +(formdata.get("salary") as string),
      club_member: formdata.get("club_member") as string,
      status: formdata.get("status") as string,
      car_owner: formdata.get("car_owner") as string,
    };
  }
  
 
  const handleAddEmployee = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const specformdata = new FormData(form);

    addData(makeEmployee, specformdata);
    
      navigate('/')
  };

  
  return (
    <div className="add_page">
      <h2>{t("add_employee_text")}</h2>
      <form className="add_employee_form" onSubmit={handleAddEmployee}>
        <label htmlFor="firstname">
          {t("first_name")}:
          <input name="firstname" type="text" />
        </label>
        <label htmlFor="lastname">
          {t("last_name")}:
          <input name="lastname" type="text" />
        </label>
        <label htmlFor="salary">
          {t("salary")}:
          <input name="salary" type="number" />
        </label>
        <label htmlFor="status">
          {t("status")}:
          <select name="status">
            {statusOptions.map((opt) => {
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="birthdate">
          {t("birthdate")}:
          <input name="birthdate" type="text" />
        </label>
        <label htmlFor="club_member">
          {t("clubmember")}:
          <select name="club_member">
            <option value="true">{t("confirmation")}</option>
            <option value="false">{t("denial")}</option>
          </select>
        </label>
        <label htmlFor="car_owner">
          {t("carowner")}:
          <select name="car_owner">
            <option value="true">{t("confirmation")}</option>
            <option value="false">{t("denial")}</option>
          </select>
        </label>
        <button type="submit">{t("add_button")}</button>
      </form>
    </div>
  );
}
