import { useTranslation } from "react-i18next";
import { collectionRef } from "../HomePage";
import { deleteDoc, doc } from "firebase/firestore";

const { t } = useTranslation();

export const QuestionModal = (props: {
  dataset: any;
  toDelete: any;
  item: any;
  className: string;
  setter01: Function;
  setter02: Function;
  setter03: Function;
}) => {

  async function onClickButton01(empl:any) {
    
      const employeeRef = doc(collectionRef, empl);
      await deleteDoc(employeeRef);

    props.setter01(props.dataset.filter((item: any) => item !== props.item));
    props.setter03([...props.toDelete, props.item]);
    props.setter02(false);
  }

  return (
    <div>
      <div className="back_to_black"></div>
      <div className={props.className}>
        {t("delete_confirmation")}
        <div>
          {props.item.firstname} {props.item.lastname}, {t("birthdate")}: {}
          {props.item.birthdate.toString().substring(0, 10)}
        </div>
        <div className="modbuttons">
          <button onClick={() => onClickButton01(props.item.id)}>{t("confirmation")}</button>
          <button
            onClick={() => {
              props.setter02(false);
            }}
          >
            {t("cancellation")}
          </button>
        </div>
      </div>
    </div>
  );
};
