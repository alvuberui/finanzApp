'use client';

import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

const AnualBills = ({ transactions, benefitTransactions, investmentBenefitTransactions }) => {
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const staticData = {
    labels,
    datasets: [
      {
        label: 'Valores objetivo',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Valores reales',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gastos anuales',
      },
    },
  };

  const [data, setData] = useState(staticData);

  useEffect(() => {
    const months = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      acc[month] += transaction.quantity;
      return acc;
    }, new Array(12).fill(0));

    const idealData = benefitTransactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      acc[month] += transaction.quantity;
      return acc;
    }, new Array(12).fill(0));

    const idealDataInvestment = investmentBenefitTransactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      acc[month] += transaction.quantity;
      return acc;
    }, new Array(12).fill(0));

    const idealDataTotal = idealData.map((value, index) => value + idealDataInvestment[index]);
    const idealData55 = idealDataTotal.map(value => value * 0.55);

    const updatedData = {
      ...staticData,
      datasets: [
        {
          ...staticData.datasets[0],
          data: idealData55,
        },
        {
          ...staticData.datasets[1],
          data: months,
        },
      ],
    };

    setData(updatedData);
  }, [transactions, benefitTransactions, investmentBenefitTransactions]);

  return (
    <div className="flex my-6 justify-center items-center text-center">
      <div className="rounded-lg overflow-hidden border border-gray-300 my-2 lg:w-1/2 w-full shadow-lg chart-container">
        <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Comparación de datos</h2>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default AnualBills;
