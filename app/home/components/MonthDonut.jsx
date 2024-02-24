'use client';
import { ListElements } from '@/app/components';

import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,);

const MonthDonut = () => {

    const data = {
        labels: ['Gastos innecesarios', 'Ahorro', 'Dinero invertido', 'Gastos necesarios'],
        datasets: [
            {
                label: 'Cantidad',
                data: [12, 19, 3, 5],
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


    return (

        <div className="flex my-6 justify-center items-center text-center">
            <div className="flex w-2/3 flex-col mb-4 lg:flex-row  items-center text-center justify-center">
                <div className="w-full lg:w-3/6 my-2 mx-1">
                    <div className="rounded-lg overflow-hidden border border-gray-300 shadow-lg chart-container">
                        <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Datos Reales</h2>
                        <Doughnut className="h-80 w-full" data={data} />
                        <div className="flex justify-center items-center">
                            <ListElements
                                colors={['bg-black', 'bg-red-900', 'bg-red-400', 'bg-lime-400', 'bg-pink-500', 'bg-yellow-500', 'bg-blue-400']}
                                titles={['Beneficio total:', 'Gastos totales:', 'Gastos innecesarios:', 'Gastos necesarios:', 'Resultados inversiones:', 'Dinero invertido:', 'Ahorro:']}
                                values={['1500€', '500€', '30€', '300€', '50€', '50€', '30€']}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full mx-1 my-1 lg:w-3/6">
                    <div className="rounded-lg overflow-hidden border border-gray-300 shadow-lg chart-container">
                        <h2 className="text-center mt-2 mb-2 text-2xl font-bold text-gray-900">Datos Reales</h2>
                        <Doughnut className="h-80 w-full" data={data} />
                        <div className="flex justify-center items-center">
                            <ListElements
                                colors={['bg-black', 'bg-red-900', 'bg-red-400', 'bg-lime-400', 'bg-pink-500', 'bg-yellow-500', 'bg-blue-400']}
                                titles={['Beneficio total:', 'Gastos totales:', 'Gastos innecesarios:', 'Gastos necesarios:', 'Resultados inversiones:', 'Dinero invertido:', 'Ahorro:']}
                                values={['1500€', '500€', '30€', '300€', '50€', '50€', '30€']}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MonthDonut
