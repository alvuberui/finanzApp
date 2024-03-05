'use client';

import { useEffect, useState } from "react";

const DatePickerYear = () => {

    const [yearSelected, setYearSelected] = useState('');

    const handleYearChange = (e) => {
        setYearSelected(e.target.value);
    }

    const handleYearChangeByButton = (e) => {
        if (e.target.textContent === '<') {
            setYearSelected(yearSelected - 1);
        } else {
            setYearSelected(yearSelected + 1);
        }
    }

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        setYearSelected(year);
    }, []);
    return (
        <>  
            {
                yearSelected === 2023 ?
                    <button onClick={handleYearChangeByButton} className="text-white  bg-black  px-5 h-full mr-2" disabled={yearSelected === 2023}>{'<'}</button>
                    :
                    <button onClick={handleYearChangeByButton} className="text-black border  bg-white hover:bg-gray-200 px-5 h-full mr-2" disabled={yearSelected === 2023}>{'<'}</button>
            }
            <label className="text-black mr-2">Año:</label>
            <input min={2023} max={new Date().getFullYear()} value={yearSelected} onChange={handleYearChange} type="number" id="year" className="bg-transparent border-none focus:outline-none text-black" />
            {
                yearSelected === new Date().getFullYear() ?
                    <button onClick={handleYearChangeByButton} className="text-white  bg-black  px-5 h-full ml-2" disabled={yearSelected === new Date().getFullYear()}>{'>'}</button>
                    :
                    <button onClick={handleYearChangeByButton} className="text-black border bg-white hover:bg-gray-200 px-5 h-full ml-2" disabled={yearSelected === new Date().getFullYear()}>{'>'}</button>
            }
        </>
    )
}

export default DatePickerYear
