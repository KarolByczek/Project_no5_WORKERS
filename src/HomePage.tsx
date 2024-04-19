import { Table } from "./components/Table";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs} from "firebase/firestore";

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

const querySnapshot = await getDocs(collection(db, "WORKERS_DATA"));
querySnapshot.forEach((doc) => {
  console.log(doc.data());
  console.log(doc.get("lastname"));
});

const newdata = querySnapshot.docs;
const onedoc = newdata[0];
const onetimestamp = onedoc.get('birthdate');
const onedate = onetimestamp.toDate();
console.log(onedate.toLocaleDateString('pl-EU'));

function HomePage() {
  const [totalemployees, setTotalemployees] = useState<any>([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch("http://localhost:3000/employees")
      .then((response) => response.json())
      .then((responseData) => setTotalemployees(responseData))
  }, [setTotalemployees]);

  

  return (
    <div className="home_page">
      <Link className="link" to="add_form">
        <div className="add_employee_link">{t("add_a_new")}</div>
      </Link>
      <h1>{t("employees")}</h1>
      {newdata.length > 0 ? <Table data={newdata} /> : null}
    </div>
  );
}

export default HomePage;
