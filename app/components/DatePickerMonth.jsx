'use client';
import { useEffect, useState } from "react";

const DatePickerMonth = ({ monthSelected, setMonthSelected }) => {
  const [ isDateNow, setIsDateNow] = useState(true);
  const currentDate = new Date();

  const handleMonthChange = (e) => {
    const selectedDate = new Date(e.target.value);

    if (selectedDate > currentDate) {
      setMonthSelected(currentDate.toISOString().slice(0, 7));
    } else {
      setMonthSelected(e.target.value);
    }
  };

  const handleMonthChangeByButton = (e) => {
    const currentDate = new Date(monthSelected);
    let newDate;
    if (e.target.textContent === '<') {
      newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    } else {
      newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); 
    if( year === new Date().getFullYear() && month === (new Date().getMonth() +1).toString().padStart(2, '0') ){
      setIsDateNow(true);
    } else {
      setIsDateNow(false);
    }
    setMonthSelected(`${year}-${month}`);
  };


  return (
    <> 
      {monthSelected === '2023-12' ?
      <button onClick={handleMonthChangeByButton} className="text-white  bg-black  px-5 h-full mr-2" disabled={monthSelected === '2023-12'}>{'<'}</button>
      :
      <button onClick={handleMonthChangeByButton} className="text-black border bg-white hover:bg-gray-200 px-5 h-full mr-2">{'<'}</button>
      }
      <label className="text-black mr-2">Mes:</label>
      <input value={monthSelected} min={"2023-12"} max={`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`} onChange={handleMonthChange} type="month" id="date" className="bg-transparent border-none focus:outline-none text-black" />
      { isDateNow ? 
      <button onClick={handleMonthChangeByButton} className="text-white  bg-black  px-5 h-full ml-2" disabled={isDateNow}>{'>'}</button>
      :
      <button onClick={handleMonthChangeByButton} className="text-black border bg-white-200 hover:bg-gray-200 px-5 h-full ml-2" disabled={isDateNow}>{'>'}</button>
      }
    </>
  );
};


export default DatePickerMonth
