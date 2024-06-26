import { Table } from "./components/Table";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export type EmployeeStatus = "junior" | "mid" | "senior";

export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  salary: number;
  status: EmployeeStatus;
  birthdate: Timestamp;
  car_owner: boolean;
  club_member: boolean;
}

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
const db = getFirestore(app);
export const collectionRef = collection(db, "WORKERS_DATA");

function HomePage() {
  const [dbdata, setDbdata] = useState<Employee[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function unsub() {
      onSnapshot(collectionRef, (QuerySnapshot) => {
        const items: Employee[] = [];
        QuerySnapshot.forEach((doc: DocumentData) => {
          items.push(doc.data());
        });
        setDbdata(items);
      });
    }
    return () => {
      unsub();
    };
  }, [onSnapshot]);

  return (
    <div className="home_page">
      <Link className="link" to="add_form">
        <div className="add_employee_link">{t("add_a_new")}</div>
      </Link>
      <h1>{t("employees")}</h1>
      {dbdata.length > 0 ? <Table data={dbdata} /> : null}
    </div>
  );
}

export default HomePage;
