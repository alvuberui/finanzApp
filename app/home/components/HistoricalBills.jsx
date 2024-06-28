'use client';

import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Datos ideales vs datos reales',
    },
  },
};

const HistoricalBills = ({transactions}) => {

  const staticData = {
    labels:[],
    datasets: [
      {
        label: 'Datos ideales',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Datos reales',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const [data, setData] = useState(staticData);

  useEffect(() => {
    const keys = Object.keys(transactions);
    const list = [];
    const idealList = [];

    keys.forEach((key) => {
      let quantity = 0;
      let benefitQuatity = 0;
      transactions[key].forEach((transaction) => {
        if(transaction.type === 'expense' ) {
          quantity += transaction.quantity;
        } else if(transaction.type === 'benefit') {
          benefitQuatity += transaction.quantity;
        } else if(transaction.type === 'investment' && transaction.investmentType === 'BENEFIT') {
          benefitQuatity += transaction.quantity;
        }
      });
      list.push(benefitQuatity * 0.55);
      idealList.push(quantity);
    });

    // Crear una copia de staticData para actualizar el estado
    const updatedData = {
      ...staticData,
      labels: keys,
      datasets: [
        {
          ...staticData.datasets[0],
          data: list,
        },
        {
          ...staticData.datasets[1],
          data: idealList,
        }
      ],
    };

    setData(updatedData);
  }, [transactions]);

  return (
    <div className="flex my-6 justify-center items-center text-center ">
      <div className="rounded-lg overflow-hidden border border-gray-300 my-2 lg:w-1/2 w-full shadow-lg chart-container">
        <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Datos históricos</h2>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default HistoricalBills
