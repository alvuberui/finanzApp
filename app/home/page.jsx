'use client';

import { useEffect, useState } from "react";
import { ButtonsMenu, DatePickerMonth, DatePickerYear } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { AnualBenefit, AnualBills, AnualDividend, AnualInnecesary, AnualInvestment, AnualNecessary, AnualReview, HistorialReview, HistoricalBenefits, HistoricalBills, HistoricalDividends, HistoricalUnnecesary, MonthBard, MonthCard, MonthDonut } from "./components";
import HistoricalNecessary from "./components/HistoricalNecessary";
import HistoricalInvestment from "./components/HistoricalInvestment";
import HistoricalMoney from "./components/HistoricalMoney";
import useTransaction from "../handlers/useTransaction";

const Dashboard = () => {

  const [selectedOption, setSelectedOption] = useState(0);
  const [typeSelected, setTypeSelected] = useState(0);
  const [annualOption, setAnnualOption] = useState(0);
  const [historicalOption, setHistoricalOption] = useState(0);
  const [monthSelected, setMonthSelected] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const { getTransactionsByMonth, deleteTransaction } = useTransaction();

  const handleDeleteTransaction = async (type, id) => {
    const res = await deleteTransaction(type, id);
    if(res) {
      const data = await getAllTransactions();
      setTransactions(data);
    }
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const data = await getTransactionsByMonth(year, month);
        setTransactions(data);
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

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between pt-5 bg-white">
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
              {!isLoading &&
              <div className="mx-2 my-6 flex justify-center  mb-4">
                      <p className="text-black-900 font-light mt-10">No hay transacciones para este mes</p>
              </div>
              }
            {typeSelected === 1 &&
              <MonthDonut />
            }
            {typeSelected === 2 &&
              <MonthBard />
            }
          </>
          : selectedOption === 1 ?
            <>
              <div className="mx-auto w-max mb-5">
                <div className="rounded-lg overflow-hidden bg-white flex items-center border border-gray-300 shadow-lg">
                  <DatePickerYear />
                </div>
              </div>
              <div className="mx-auto w-max">
                <div className="rounded-lg overflow-hidden shadow-xl bg-white flex">
                  <ButtonsMenu setFunction={setAnnualOption} state={annualOption} listNames={['Resumen', 'Beneficios', 'Gastos', 'Innecesarios', 'Necesarios', 'Inversion', 'Dividendos']} />
                </div>
              </div>
              {annualOption === 0 &&
                <AnualReview />
              }
              {annualOption === 1 &&
                <AnualBenefit />
              }
              {annualOption === 2 &&
                <AnualBills />
              }
              {annualOption === 3 &&
                <AnualInnecesary />
              }
              {annualOption === 4 &&
                <AnualNecessary />
              }
              {annualOption === 5 &&
                <AnualInvestment />
              }
              {annualOption === 6 &&
                <AnualDividend />
              }
            </>
            :
            <>
              <div className="mx-auto w-max">
                <div className="rounded-lg overflow-hidden shadow-xl bg-white flex">
                  <ButtonsMenu setFunction={setHistoricalOption} state={historicalOption} listNames={['Resumen', 'Beneficios', 'Gastos', 'Innecesarios', 'Necesarios', 'Inversion', 'Dividendos', 'Fondos']} />
                </div>
              </div>
              {historicalOption === 0 &&
                <HistorialReview />
              }
              {historicalOption === 1 &&
                <HistoricalBenefits />
              }
              {historicalOption === 2 &&
                <HistoricalBills />
              }
              {historicalOption === 3 &&
                <HistoricalUnnecesary />
              }
              {historicalOption === 4 &&
                <HistoricalNecessary />
              }
              {historicalOption === 5 &&
                <HistoricalInvestment />
              }
              {historicalOption === 6 &&
                <HistoricalDividends />
              }
              {historicalOption === 7 &&
                <HistoricalMoney />
              }
            </>
        }
      </div>
    </main>
  );
}  

export default Dashboard
