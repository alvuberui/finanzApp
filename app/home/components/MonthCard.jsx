import useTransaction from '@/app/handlers/useTransaction';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MonthCard = ({values, handleDelete}) => {
  const [ transaction, setTransaction ] = useState()

    

  useEffect(() => {
    let res = {};
    const date = new Date(values.date);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const dayWeek = date.toLocaleString('es-ES', { weekday: 'long' });
    res.dayMonth = `${day} ${month} | ${dayWeek}`;
    res.amount = values.quantity;
    res.description = values.description;
    res._id = values._id;

    if(values.type === "investment") {
      const string = values.investmentType === "BENEFIT" ? "Beneficio" : "Invertido";
      res.type = "Inversión (" + string+ ")";
      res.backType = "investment"
    }
    else if(values.type === "expense") {
      const string = values.expenseType === "MANDATORY" ? "Obligatorio" : "Innecesario";
      res.type = "Gasto (" + string + ")";
      res.backType = "expense"
    }
    else {
      res.type = "Beneficio";
      res.backType = "benefit"
    }
    setTransaction(res);
  }, [values])


  if( !transaction ) return (<div></div>);
  return (
    <div className="mx-2 my-6 flex justify-center mb-4">
      <div className="lg:w-1/2 w-full bg-white rounded-lg border border-gray-300 shadow-lg p-4 relative">
        <div className="flex justify-between items-center">
          <div className="text-xl">
            <p className="text-red-400 font-light">{transaction.dayMonth}</p>
          </div>
          <div className="flex items-center">
          <Link  href={'/transaction/update/' + transaction.backType + '/' + transaction._id} >
            <i className="material-icons text-2xl text-gray-500 cursor-pointer mt-1 mr-2">edit</i>
          </Link>
            <i  onClick={ () => handleDelete(values.type, values._id) } className="material-icons text-2xl text-gray-500 cursor-pointer">delete</i>
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
