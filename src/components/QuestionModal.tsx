//import { ReactNode } from "react";
import { Employee } from "./Table";

export const QuestionModal = (props: {
  dataset: Employee[];
  item: Employee;
  className: string;
  hook: Function;
  element: Element | null;
}) => {
  //const [state, setState] = useState<Employee[]>([]);
  const $showcase: Element | null = document.querySelector(props.className);

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

    const filteredonceagain = props.dataset.filter((one) => {
      return one !== props.item;
    });

    props.hook([...filteredonceagain]);

    props.element.style.display = "none";
  };

  return (
    <div className={props.className}>
      <div>
        You really wanna do this?
        <button onClick={onClickButton01}>Yes</button>
        <button
          onClick={() => {
            props.element.style.display = "none";
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
