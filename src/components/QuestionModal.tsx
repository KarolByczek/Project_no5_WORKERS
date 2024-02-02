import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Employee } from './Table';

export const QuestionModal = (props:{dataset:Employee[], item:Employee}) => {
    const [filtereddata, setFiltereddata] = useState<Employee[]>(props.dataset);
    const navigate = useNavigate();

    const onClickButton01 = () => {
        fetch(`http://localhost:3000/employees/${props.item.id}`, {
        method: "DELETE",
        body: JSON.stringify(props.item),
      })
        .then((response) => {
          if (response.ok) {
            navigate("/");
          } else {
            console.log("Something went wrong!");
            throw new Error("Mi scusi, tu es putana!");
          }
        })
        .catch((err) => console.error(err));
  
      const dataminusone = filtereddata.filter((empl) => {
        return empl !== props.item;
      });
      setFiltereddata([...dataminusone]);
  
      console.log("The employee data has been deleted");
    };

  return (
    <div className='questionmodal'>
        You really wanna do this?
        <button onClick={onClickButton01}>Yes</button>
        <button onClick={() => window.alert('cancelled')}>Cancel</button>
    </div>
  )
}
