'use client';
import { ListElements } from '@/app/components';

import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,);

const AnualInvestment = () => {

    const labels = ['Gastos totales', 'Gastos necesarios', 'gastos innecesarios', 'Dinero invertido', 'Ahorro'];

    const data_bar = {
        labels,
        datasets: [
            {
                label: 'Valores objetivo',
                data: [-100, 10, 20, 30, 40, 50, 60],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Valores reales',
                data: [10, 20, 30, 40, 50, 60, 70],
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
            text: 'Chart.js Bar Chart',
          },
        },
      };
    
      return (
        <div className="flex justify-center items-center text-center ">
            <div className="rounded-lg overflow-hidden border border-gray-300 my-2 lg:w-1/2 w-full shadow-lg chart-container">
                <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Comparación de datos</h2>
                <Bar options={options} data={data_bar} />
            </div>
        </div>
    )
}

export default AnualInvestment