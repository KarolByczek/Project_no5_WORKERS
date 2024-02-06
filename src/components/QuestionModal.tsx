//import { ReactNode } from "react";

import { useTranslation } from "react-i18next";
import { Employee } from "./Table";

export const QuestionModal = (props: {
  dataset: Employee[];
  item: Employee;
  className: string;
  hook: Function;
  element: any;
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
          throw new Error("Mi scusi, tu es putana!");
        }
      })
      .then(() => console.log("The employee data has been deleted"))
      .catch((err) => console.error(err));

    //const filteredonceagain = props.dataset.filter((one) => {
      //return one !== props.item;
    //});

    //props.hook([...filteredonceagain]);
    document.location.reload();
    props.element.style.display = "none";
  };

  return (
    <div className={props.className}>
      <div>
        {t('confirmation')}
        <button onClick={onClickButton01}>{t('yes')}</button>
        <button
          onClick={() => {
            props.element.style.display = "none";
          }}
        >
          {t('cancellation')}
        </button>
      </div>
    </div>
  );
};
