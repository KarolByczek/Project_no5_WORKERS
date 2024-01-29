import React from 'react'

export const AddForm = () => {

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
        window.alert('Great Success! You have added your new employee to the list :)');
        const form = event.target as HTMLFormElement;
        const formdata = new FormData(form);
        formdata.forEach(data => console.log(data));
        console.log(formdata.get('status'))
    }

  return (
    <div>
        <h3>PROVIDE DATA OF AN EMPLOYEE YOU WOULD LIKE TO ADD TO THE LIST:</h3>
        <form className='add_employee_form' onSubmit={handleSubmit}>
            <label htmlFor="firstname">First Name:<input name='firstname' type="text" /></label>
            <label htmlFor="lastname">Last Name:<input name='lastname' type="text" /></label>
            <label htmlFor="salary">Salary:<input name='salary' type="number" /></label>
            <label htmlFor="status">Status:<input name='status' type="text" /></label>
            <label htmlFor="birthdate">Birthdate:<input name='birthdate' type="text" /></label>
            <button type="submit">ADD HER OR HIM</button>
        </form>
    </div>
  )
}
