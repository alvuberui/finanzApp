'use client';
import { ListElements } from '@/app/components';
import { useEffect, useState } from 'react';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,);

const AnualReview = ({ transactions }) => {
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

    const [ realData, setRealData ] = useState(data);
    const [ elementList, setElementList ] = useState([]);
    const [ idealList, setIdealList ] = useState([]);

    useEffect(() => {
        const innecesary = transactions.filter((transaction) => transaction.type === 'expense' && transaction.expenseType === 'UNNECESSARY');
        const necessary = transactions.filter((transaction) => transaction.type === 'expense' && transaction.expenseType === 'MANDATORY');
        const investmentBenefit = transactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'BENEFIT');
        const investment = transactions.filter((transaction) => transaction.type === 'investment' && transaction.investmentType === 'INVESTMENT');
        const benefit = transactions.filter((transaction) => transaction.type === 'benefit');

        const benefitInvestment = investmentBenefit.reduce((acc, curr) => acc + curr.quantity, 0);
        const benefitAmount = benefit.reduce((acc, curr) => acc + curr.quantity, 0);
        const totalBenefit = benefitAmount + benefitInvestment;
        const innecesaryAmount = innecesary.reduce((acc, curr) => acc + curr.quantity, 0);
        const necessaryAmount = necessary.reduce((acc, curr) => acc + curr.quantity, 0);
        const totalExpense = innecesaryAmount + necessaryAmount;
        const investmentAmount = investment.reduce((acc, curr) => acc + curr.quantity, 0);
        const savingAmount = totalBenefit - totalExpense - investmentAmount;

        const innecesaryPercentage = (innecesaryAmount * 100) / totalBenefit;
        const necessaryPercentage = (necessaryAmount * 100) / totalBenefit;
        const investmentPercentage = (investmentAmount * 100) / totalBenefit;
        const savingPercentage = (savingAmount * 100) / totalBenefit;

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

export default AnualReview
