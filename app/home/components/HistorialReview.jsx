'use client';
import { ListElements } from '@/app/components';

import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,);


const HistorialReview = ( { transactions }) => {
  let data = {
    labels: ['Gastos innecesarios', 'Ahorro', 'Dinero invertido', 'Gastos necesarios'],
    datasets: [
        {
            label: 'Porcentaje',
            data: [0, 0, 0, 0],
            backgroundColor: [
                'rgba(248, 113, 113, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(190, 242, 100, 0.5)',
            ],
            borderColor: [
                'rgba(185, 28, 28, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(101, 163, 13, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

let idealData = {
    labels: ['Gastos innecesarios', 'Ahorro', 'Dinero invertido', 'Gastos necesarios'],
    datasets: [
        {
            label: 'Porcentaje',
            data: [15, 35, 10, 40],
            backgroundColor: [
                'rgba(248, 113, 113, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(190, 242, 100, 0.5)',
            ],
            borderColor: [
                'rgba(185, 28, 28, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(101, 163, 13, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

useEffect(() => {
  // Buscamos todas las keys del objeto transactions
  const keys = Object.keys(transactions);
  let benefitInvestment = 0
  let benefitAmount = 0
  let innecesaryAmount = 0
  let necessaryAmount = 0
  let investmentAmount = 0

  // Iteramos sobre las keys
  keys.forEach((key) => {
    // Recorremos cada key obteniendo el valor de cada una
    transactions[key].forEach((transaction) => {
        if(transaction.type === 'expense' && transaction.expenseType === 'UNNECESSARY') {
            innecesaryAmount += parseFloat(transaction.quantity.toFixed(2));
            innecesaryAmount = parseFloat(innecesaryAmount.toFixed(2));
        } else if(transaction.type === 'expense' && transaction.expenseType === 'MANDATORY') {
            necessaryAmount += parseFloat(transaction.quantity.toFixed(2));
            necessaryAmount = parseFloat(necessaryAmount.toFixed(2));
        } else if(transaction.type === 'investment' && transaction.investmentType === 'INVESTMENT') {
            investmentAmount += parseFloat(transaction.quantity.toFixed(2));
            investmentAmount = parseFloat(investmentAmount.toFixed(2));
        } else if(transaction.type === 'investment' && transaction.investmentType === 'BENEFIT') {
            benefitInvestment += parseFloat(transaction.quantity.toFixed(2));
            benefitInvestment = parseFloat(benefitInvestment.toFixed(2));
        } else if(transaction.type === 'benefit') {
            benefitAmount += parseFloat(transaction.quantity.toFixed(2));
            benefitAmount = parseFloat(benefitAmount.toFixed(2));
        }
    });
  });
    const totalExpense =  (innecesaryAmount + necessaryAmount).toFixed(2);
    const totalBenefit = (benefitAmount + benefitInvestment).toFixed(2);
    const savingAmount = (totalBenefit - totalExpense - investmentAmount).toFixed(2);

    const innecesaryPercentage = ((innecesaryAmount * 100) / totalBenefit).toFixed(2);
        const necessaryPercentage = ((necessaryAmount * 100) / totalBenefit).toFixed(2);
        const investmentPercentage = ((investmentAmount * 100) / totalBenefit).toFixed(2);
        const savingPercentage = ((savingAmount * 100) / totalBenefit).toFixed(2);

    data.datasets[0].data = [innecesaryPercentage, savingPercentage, investmentPercentage, necessaryPercentage];
        setElementList([totalBenefit, totalExpense, innecesaryAmount, necessaryAmount, benefitInvestment, investmentAmount, savingAmount]);
        setRealData(data);

        // IDEAL LIST ELEMENTS
        const idealTotalExpense = (totalBenefit * 0.55).toFixed(2);
        const idealNecessaryAmount = (totalBenefit * 0.4).toFixed(2);
        const idealInnecesaryAmount = (totalBenefit * 0.15).toFixed(2);
        const idealInvestmentAmount = (totalBenefit * 0.1).toFixed(2);
        const idealSavingAmount = (totalBenefit * 0.35).toFixed(2);
        setIdealList([totalBenefit, idealTotalExpense, idealInnecesaryAmount, idealNecessaryAmount, idealInvestmentAmount, idealSavingAmount]);
}, [transactions]);

const [ realData, setRealData ] = useState(data);
const [ elementList, setElementList ] = useState([]);
const [ idealList, setIdealList ] = useState([]);

  return (
    <div className="flex my-6 justify-center items-center text-center">
        <div className="flex w-4/5 flex-col mb-4 lg:flex-row items-center text-center justify-center">
            <div className="w-full lg:w-3/6 my-2 mx-1">
                <div className="rounded-lg overflow-hidden border border-gray-300 shadow-lg chart-container">
                    <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Datos Reales</h2>
                    <div className="flex justify-center items-center mx-auto h-80 w-full sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
                        <Doughnut data={realData} />
                    </div>
                    <div className="flex justify-center items-center">
                        <ListElements
                            colors={['bg-black', 'bg-red-900', 'bg-red-400', 'bg-lime-400', 'bg-pink-500', 'bg-yellow-500', 'bg-blue-400']}
                            titles={['Beneficio total:', 'Gastos totales:', 'Gastos innecesarios:', 'Gastos necesarios:', 'Resultados inversiones:', 'Dinero invertido:', 'Ahorro:']}
                            values={elementList}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full mx-1 my-1 lg:w-3/6">
                <div className="rounded-lg overflow-hidden border border-gray-300 shadow-lg chart-container">
                    <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Datos Ideales</h2>
                    <div className="flex justify-center items-center mx-auto h-80 w-full sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
                        <Doughnut data={idealData} />
                    </div>
                    <div className="flex justify-center items-center mb-8">
                        <ListElements
                            colors={['bg-black', 'bg-red-900', 'bg-red-400', 'bg-lime-400', 'bg-yellow-500', 'bg-blue-400']}
                            titles={['Beneficio total:', 'Gastos totales:', 'Gastos innecesarios:', 'Gastos necesarios:', 'Dinero invertido:', 'Ahorro:']}
                            values={idealList}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default HistorialReview
