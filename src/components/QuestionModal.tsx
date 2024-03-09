import { useTranslation } from "react-i18next";
import { Employee } from "./Table";

export const QuestionModal = (props: {
  dataset: Employee[];
  item: Employee;
  className: string;
  hook01: Function;
  hook02: Function;
}) => {
  const { t } = useTranslation();

  const onClickButton01 = () => {
    fetch(`http://localhost:3000/employees/${props.item.id}`, {
      method: "DELETE",
      body: JSON.stringify(props.item),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Response is ok");
        } else {
          console.log("Something went wrong!");
          throw new Error("Fatal error!");
        }
      })
      .then(() => console.log("The employee data has been deleted"))
      .catch((err) => console.error(err));

    props.hook01(props.dataset.filter((employee) => employee !== props.item));
    props.hook02(false);
  };

  return (
    <div>
    <div className="back_to_black"></div>
      <div className={props.className}>
        {t("confirmation")}
        <div>
          {props.item.firstname} {props.item.lastname}, {t("birthdate")}: {}
          {props.item.birthdate.toString().substring(0, 10)}
        </div>
        <div className="modbuttons">
          <button onClick={onClickButton01}>{t("yes")}</button>
          <button
            onClick={() => {
              props.hook02(false);
            }}
          >
            {t("cancellation")}
          </button>
        </div>
      </div>
      </div>
  );
};
