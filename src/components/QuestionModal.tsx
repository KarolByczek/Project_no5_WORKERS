import { useTranslation } from "react-i18next";
import { collectionRef } from "../HomePage";
import { deleteDoc, doc } from "firebase/firestore";

export const QuestionModal = (props: {
  dataset: any;
  toDelete: any;
  item: any;
  className: string;
  setter01: Function;
  setter02: Function;
  setter03: Function;
}) => {
  const { t } = useTranslation();

  async function onClickButton01(employee: any) {
    try {
      const docRef = doc(collectionRef, employee.id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log("The errors are:", error);
    }

    props.setter01(props.dataset.filter((oneof: any) => oneof !== props.item));
    props.setter03([...props.toDelete, props.item]);
    props.setter02(false);
  }

  return (
    <div>
      <div className="black_background"></div>
      <div className={props.className}>
        {t("delete_confirmation")}
        <div>
          {props.item.firstname} {props.item.lastname}, {t("birthdate")}: {}
          {props.item.birthdate.toDate().toLocaleDateString("pl-US")}
        </div>
        <div className="modbuttons">
          <button onClick={() => onClickButton01(props.item)}>
            {t("confirmation")}
          </button>
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
