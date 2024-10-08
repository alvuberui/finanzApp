'use client';

import { useEffect, useState } from "react";
import { ButtonsMenu, DatePickerMonth, DatePickerYear } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { AnualBenefit, AnualBills, AnualDividend, AnualInnecesary, AnualInvestment, AnualNecessary, AnualReview, HistorialReview, HistoricalBenefits, HistoricalBills, HistoricalDividends, HistoricalUnnecesary, MonthBard, MonthCard, MonthDonut } from "./components";
import HistoricalNecessary from "./components/HistoricalNecessary";
import HistoricalInvestment from "./components/HistoricalInvestment";
import HistoricalMoney from "./components/HistoricalMoney";
import useTransaction from "../handlers/useTransaction";
import LoadingSpinner from "../components/LoadingSpinner";
import AnualSaves from "./components/AnualSaves";
import HistoricalSaves from "./components/HistoricalSaves";

const Dashboard = () => {

  const [selectedOption, setSelectedOption] = useState(0);
  const [typeSelected, setTypeSelected] = useState(0);
  const [annualOption, setAnnualOption] = useState(0);
  const [historicalOption, setHistoricalOption] = useState(0);
  const [monthSelected, setMonthSelected] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ allTransactions, setAllTransactions ] = useState([]);
  const [ anualTransactions, setAnualTransactions ] = useState([]);
  const [ yearSelected, setYearSelected ] = useState('');
  const { getTransactionsByMonth, deleteTransaction, getAllTransactions, getTransactionsByYear } = useTransaction();

  const handleDeleteTransaction = async (type, id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta transacción?");
  
    if (confirmDelete) {
      const res = await deleteTransaction(type, id, setIsLoading);
      if(res) {
        const newTransactions = transactions.filter(transaction => transaction._id !== id);
        setTransactions(newTransactions);
        const data = await getAllTransactions();
        setAllTransactions(data);
      }
    }
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        if ( monthSelected !== '' ) {
          const year = parseInt(monthSelected.split('-')[0]);
          const month = monthSelected.split('-')[1];
          const data = await getTransactionsByMonth(year, month, setIsLoading);
          setTransactions(data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [monthSelected]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setAllTransactions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    setMonthSelected(`${year}-${month}`);
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
        setIsLoading(true);
            if (yearSelected !== '') {
                const data = await getTransactionsByYear(yearSelected, setIsLoading);
                setAnualTransactions(data);
            }
    };
    fetchTransactions();
}, [yearSelected]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between pt-5 bg-white">
      { isLoading && <LoadingSpinner />}
      <div className="w-full">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
          <div className="mx-auto w-max">
            <div className="rounded-lg overflow-hidden shadow-xl bg-white flex">
              <ButtonsMenu setFunction={setSelectedOption} state={selectedOption} listNames={['Mensual', 'Anual', 'Histórico']} />
            </div>
          </div>
        </div>
        {selectedOption === 0 ?
          <>
            <div className="mx-auto w-max mb-5">
            <div className="rounded-lg overflow-hidden bg-white flex items-center border border-gray-300 shadow-lg">
              <DatePickerMonth monthSelected={monthSelected} setMonthSelected={setMonthSelected}/>
            </div>
          </div>
            <div className="mx-auto w-max">
              <div className="rounded-lg overflow-hidden shadow-xl bg-white flex">
                <ButtonsMenu setFunction={setTypeSelected} state={typeSelected} listNames={['Listado', 'Rosca', 'Barras']} />
              </div>
            </div>
            {typeSelected === 0 && Array.isArray(transactions) && transactions.map((transaction) => (
      <MonthCard values={transaction} handleDelete={handleDeleteTransaction} key={transaction._id} />
    ))}
              {!isLoading && transactions.length === 0 &&
              <div className="mx-2 my-6 flex justify-center  mb-4">
                      <p className="text-black-900 font-light mt-10">No hay transacciones para este mes</p>
              </div>
              }
            {typeSelected === 1 &&
              <MonthDonut transactions={transactions} />
            }
            {typeSelected === 2 &&
              <MonthBard transactions={transactions} />
            }
          </>
          : selectedOption === 1 ?
            <>
              <div className="mx-auto w-max mb-5">
                <div className="rounded-lg overflow-hidden bg-white flex items-center border border-gray-300 shadow-lg">
                  <DatePickerYear setYearSelected={setYearSelected} yearSelected={yearSelected}   />
                </div>
              </div>
              <div className="mx-auto w-full sm:w-max pl-2 pr-2">
            <div className="rounded-lg overflow-hidden shadow-xl bg-white flex flex-wrap">
              <ButtonsMenu setFunction={setAnnualOption} state={annualOption} listNames={['Resumen', 'Beneficios', 'Gastos', 'Innecesarios', 'Necesarios', 'Inversion', 'Dividendos', 'Ahorros']} />
            </div>
          </div>
              {annualOption === 0 &&
                <AnualReview transactions={anualTransactions} />
              }
              {annualOption === 1 &&
                <AnualBenefit transactions={ anualTransactions.filter((transaction) => transaction.type === 'benefit') } />
              }
              {annualOption === 2 &&
                <AnualBills transactions={ anualTransactions.filter((transaction) => transaction.type === 'expense')  } benefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'benefit')} investmentBenefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'BENEFIT')}/>
              }
              {annualOption === 3 &&
                <AnualInnecesary transactions={ anualTransactions.filter((transaction) => transaction.type === 'expense' && transaction.expenseType === 'UNNECESSARY') } benefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'benefit')} investmentBenefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'BENEFIT')} />
              }
              {annualOption === 4 &&
                <AnualNecessary transactions={ anualTransactions.filter((transaction) => transaction.type === 'expense' && transaction.expenseType === 'MANDATORY') } benefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'benefit')} investmentBenefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'BENEFIT')} />
              }
              {annualOption === 5 &&
                <AnualInvestment  transactions={ anualTransactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'INVESTMENT') } benefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'benefit')} investmentBenefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'BENEFIT')} />
              }
              {annualOption === 6 &&
                <AnualDividend transactions={ anualTransactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'BENEFIT') } benefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'benefit')} investmentBenefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'BENEFIT')} />
              }
              {annualOption === 7 &&
                <AnualSaves transactions={ anualTransactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'BENEFIT') } transactionsInvest={ anualTransactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'INVESTMENT') } benefitTransactions={anualTransactions.filter((transaction) => transaction.type === 'benefit')} expenseTransactions={ anualTransactions.filter((transaction) => transaction.type === 'expense')  } />
              }
            </>
            :
            <>
              <div className="mx-auto w-full sm:w-max pl-2 pr-2">
            <div className="rounded-lg overflow-hidden shadow-xl bg-white flex flex-wrap">
              <ButtonsMenu setFunction={setHistoricalOption} state={historicalOption} listNames={['Resumen', 'Beneficios', 'Gastos', 'Innecesarios', 'Necesarios', 'Inversion', 'Dividendos', "Ahorros"]} />
            </div>
          </div>
              {historicalOption === 0 &&
                <HistorialReview transactions={allTransactions} />
              }
              {historicalOption === 1 &&
                <HistoricalBenefits transactions={allTransactions} />
              }
              {historicalOption === 2 &&
                <HistoricalBills transactions={allTransactions} />
              }
              {historicalOption === 3 &&
                <HistoricalUnnecesary transactions={allTransactions}  />
              }
              {historicalOption === 4 &&
                <HistoricalNecessary transactions={allTransactions} />
              }
              {historicalOption === 5 &&
                <HistoricalInvestment transactions={allTransactions} />
              }
              {historicalOption === 6 &&
                <HistoricalDividends transactions={allTransactions}/>
              }
              {historicalOption === 7 &&
                <HistoricalMoney transactions={allTransactions}/>
              }
              {historicalOption === 8 &&
                <HistoricalSaves transactions={allTransactions}/>
              }
            </>
        }
      </div>
    </main>
  );
}  

export default Dashboard
