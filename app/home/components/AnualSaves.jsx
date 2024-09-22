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

const AnualSaves = ({ transactions, transactionsInvest, benefitTransactions, expenseTransactions }) => {
    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const staticData = {
    labels,
    datasets: [
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
        text: 'Beneficio de inversiones anuales',
      },
    },
  };

  useEffect(() => {
    // Inicializamos un array con 12 posiciones (para los 12 meses del año)
    let months = new Array(12).fill(0);
  
    // Sumar las cantidades de las transacciones normales
    months = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      acc[month] += transaction.quantity;
      return acc;
    }, months);

    // Restar las cantidades de las transacciones de inversiones
    months = transactionsInvest.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      acc[month] -= transaction.quantity; // Restar inversiones
      return acc;
    }, months);
  
    // Sumar las cantidades de las transacciones de beneficios
    months = benefitTransactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      acc[month] += transaction.quantity; // Sumar beneficios
      return acc;
    }, months);
  
    // Restar las cantidades de las transacciones de gastos
    months = expenseTransactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).getMonth();
      acc[month] -= transaction.quantity; // Restar gastos
      return acc;
    }, months);
  
    // Actualizamos los datos del gráfico
    const updatedData = {
      ...staticData,
      datasets: [
        {
          ...staticData.datasets[0],
          data: months,
        },
      ],
    };
  
    setData(updatedData);
  }, [transactions, benefitTransactions, expenseTransactions]);

  const [data, setData] = useState(staticData);
  return (
    <div className="flex my-6 justify-center items-center text-center">
      <div className="rounded-lg overflow-hidden border border-gray-300 my-2 lg:w-1/2 w-full shadow-lg chart-container">
        <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Comparación de datos</h2>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default AnualSaves
