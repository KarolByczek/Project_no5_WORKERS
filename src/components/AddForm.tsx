import React from 'react'

export const AddForm = () => {

    const formClickHandler = () => {
        window.alert('Great Success! You have added your new employee to the list :)')
    }

  return (
    <div>
        <h3>PROVIDE DATA OF AN EMPLOYEE YOU WOULD LIKE TO ADD TO THE LIST:</h3>
        <form className='add_employee_form' action="">
            <label htmlFor="firstname">First Name:<input id='firstname' type="text" /></label>
            <label htmlFor="lastname">Last Name:<input id='lastname' type="text" /></label>
            <label htmlFor="salary">Salary:<input id='salary' type="number" /></label>
            <label htmlFor="status">Status:<input id='status' type="text" /></label>
            <label htmlFor="birthdate">Birthdate:<input id='birthdate' type="text" /></label>
            <input type="submit" value='ADD HER/HIM' onClick={formClickHandler} />
        </form>
    </div>
  )
}
