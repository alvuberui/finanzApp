'use client';

import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

ChartJS.register(
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

const MonthBard = ({ transactions }) => {
  const labels = ['Gastos totales', 'Gastos necesarios', 'Gastos innecesarios', 'Dinero invertido', 'Ahorro'];

  const initialData = {
    labels,
    datasets: [
      {
        label: 'Valores reales',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Valores objetivos',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const [realData, setRealData] = useState(initialData);

  useEffect(() => {
    const innecesary = transactions.filter(
      (transaction) => transaction.type === 'expense' && transaction.expenseType === 'UNNECESSARY'
    );
    const necessary = transactions.filter(
      (transaction) => transaction.type === 'expense' && transaction.expenseType === 'MANDATORY'
    );
    const investmentBenefit = transactions.filter(
      (transaction) => transaction.type === 'investment' && transaction.investmentType === 'BENEFIT'
    );
    const investment = transactions.filter(
      (transaction) => transaction.type === 'investment' && transaction.investmentType === 'INVESTMENT'
    );
    const benefit = transactions.filter((transaction) => transaction.type === 'benefit');

    const benefitInvestment = investmentBenefit.reduce((acc, curr) => acc + curr.quantity, 0);
    const benefitAmount = benefit.reduce((acc, curr) => acc + curr.quantity, 0);
    const totalBenefit = benefitAmount + benefitInvestment;
    const innecesaryAmount = innecesary.reduce((acc, curr) => acc + curr.quantity, 0);
    const necessaryAmount = necessary.reduce((acc, curr) => acc + curr.quantity, 0);
    const totalExpense = innecesaryAmount + necessaryAmount;
    const investmentAmount = investment.reduce((acc, curr) => acc + curr.quantity, 0);
    const savingAmount = totalBenefit - totalExpense - investmentAmount;

    const updatedRealData = {
      ...initialData,
      datasets: [
        {
          ...initialData.datasets[0],
          data: [totalExpense, necessaryAmount, innecesaryAmount, investmentAmount, savingAmount],
        },
        {
          ...initialData.datasets[1],
          data: [
            (totalBenefit * 0.55).toFixed(2),
            (totalBenefit * 0.4).toFixed(2),
            (totalBenefit * 0.15).toFixed(2),
            (totalBenefit * 0.1).toFixed(2),
            (totalBenefit * 0.35).toFixed(2),
          ],
        },
      ],
    };

    setRealData(updatedRealData);
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Real vs ideal',
      },
    },
  };

  return (
    <div className="flex my-6 justify-center items-center text-center ">
      <div className="rounded-lg overflow-hidden border border-gray-300 my-2 lg:w-1/2 w-full shadow-lg chart-container">
        <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Comparación de datos</h2>
        <Bar options={options} data={realData} />
      </div>
    </div>
  );
};

export default MonthBard;
