'use client';

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
import { useEffect, useState } from 'react';
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
      text: 'Chart.js Line Chart',
    },
  },
};

const HistoricalBenefits = ({ transactions }) => {

  const staticData = {
    labels: [],
    datasets: [
      {
        label: 'Beneficios por año',
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

    keys.forEach((key) => {
      let quantity = 0;
      transactions[key].forEach((transaction) => {
        if(transaction.type === 'investment' && transaction.investmentType === 'BENEFIT') {
          quantity += transaction.quantity;
        } else if(transaction.type === 'benefit') {
          quantity += transaction.quantity;
        }
      });
      list.push(quantity);
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
      ],
    };

    setData(updatedData);
  }, [transactions]);

  return (
    <div className="flex my-6 justify-center items-center text-center ">
      <div className="rounded-lg overflow-hidden border border-gray-300 my-2 lg:w-1/2 w-full shadow-lg chart-container">
        <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Comparación de datos</h2>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default HistoricalBenefits;
