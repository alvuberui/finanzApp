import React, {  useEffect, useState } from 'react'

const MonthCard = ({values}) => {
  const [ transaction, setTransaction ] = useState()

  useEffect(() => {
    let res = {};
    // day month sera una cadena de tipo 17 ENERO | Miércoles. Se sacara a partes values.date que es de tipo Date
    const date = new Date(values.date);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const dayWeek = date.toLocaleString('es-ES', { weekday: 'long' });
    res.dayMonth = `${day} ${month} | ${dayWeek}`;
    res.amount = values.quantity;
    res.description = values.description;

    if(values.investmentType === "BENEFIT" || values.investmentType === "INVESTMENT") {
      const string = values.investmentType === "BENEFIT" ? "Beneficio" : "Invertido";
      res.type = "Inversión (" + string+ ")";
    }
    else if(values.expenseType === "MANDATORY" || values.expenseType === "UNNECESARY") {
      const string = values.expenseType === "MANDATORY" ? "Obligatorio" : "Innecesario";
      res.type = "Gasto (" + string + ")";
    }
    else {
      res.type = "Beneficio";
    }
    setTransaction(res);
  }, [values])

  if( !transaction ) return (<div></div>);
  return (
    <div className="mx-2 my-6 flex justify-center  mb-4">
            <div className="lg:w-1/2 w-full bg-white rounded-lg border border-gray-300 shadow-lg p-4">
              <div className="flex justify-between">
                <div className="text-xl">
                  <p className="text-red-400 font-light">{transaction.dayMonth }</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xl" style={{ marginBottom: "0.5rem" }}>{transaction.type} - {transaction.description}</p>
              </div>
              <div className="flex justify-end">
                <div className="flex items-center">
                  <p className="text-xl font-bold" style={{ marginRight: "0.5rem" }}>{transaction.amount}€</p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default MonthCard
