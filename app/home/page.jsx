'use client';

import { useState } from "react";

const Dashboard = () => {
  // Obtiene la fecha actual
  const currentDate = new Date();
  // Obtiene el mes y el año actual
  const currentMonth = currentDate.toLocaleDateString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  // Estado para el mes y el año seleccionados
  const [selectedOption, setSelectedOption] = useState('mensual');
  const [selectedMonth, setSelectedMonth] = useState(`${currentMonth} ${currentYear}`);

  // Función para cambiar al mes anterior o siguiente
  const onChangeMonth = (type) => {
    const [month, year] = selectedMonth.split(' ');
    let currentYear = parseInt(year); // Convertir el año a número entero
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const currentMonthIndex = months.findIndex(m => m === month);
  
    let newMonthIndex;
  
    if (type === 'prev') {
      newMonthIndex = currentMonthIndex - 1;
      if (newMonthIndex < 0) {
        newMonthIndex = 11; // Volver a diciembre si vamos atrás desde enero
        currentYear -= 1; // Reducir el año si vamos atrás desde enero
      }
    } else {
      newMonthIndex = currentMonthIndex + 1;
      if (newMonthIndex > 11) {
        newMonthIndex = 0; // Volver a enero si vamos adelante desde diciembre
        currentYear += 1; // Aumentar el año si vamos adelante desde diciembre
      }
    }
  
    const newMonth = months[newMonthIndex];
  
    const newSelectedMonth = `${newMonth} ${currentYear}`;
    const newDate = new Date(newSelectedMonth);
  
    // Verificar si es un mes futuro y evitar actualizar el estado
    if (newDate > new Date()) {
      return;
    }
  
    setSelectedMonth(newSelectedMonth);
  };

  return (
    <main style={{ width: '100%' }} className="flex min-h-screen flex-col items-center justify-between pt-5 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-center mb-5">Dashboard</h1>
        <div className="flex justify-center mb-5">
          <div className="rounded-lg overflow-hidden bg-red-400 flex">
            <button
              className={`flex-1 px-4 py-0 ${selectedOption === 'mensual' ? 'bg-red-500 text-white' : 'bg-red-400 text-black'} hover:bg-red-500 hover:text-white transition duration-300`}
              onClick={() => setSelectedOption('mensual')}
            >
              Mensual
            </button>
            <button
              className={`flex-1 px-4 py-0 ${selectedOption === 'anual' ? 'bg-red-500 text-white' : 'bg-red-400 text-black'} hover:bg-red-500 hover:text-white transition duration-300`}
              onClick={() => setSelectedOption('anual')}
            >
              Anual
            </button>
            <button
              className={`flex-1 px-4 py-0 ${selectedOption === 'historico' ? 'bg-red-500 text-white' : 'bg-red-400 text-black'} hover:bg-red-500 hover:text-white transition duration-300`}
              onClick={() => setSelectedOption('historico')}
            >
              Histórico
            </button>
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <div className="rounded-lg overflow-hidden bg-red-400 flex">
            <button
              className={`flex-1 px-4 py-0 bg-red-500 text-black hover:bg-red-400 hover:text-white transition duration-300`}
              onClick={() => onChangeMonth('prev')}
            >
              {"<"}
            </button>
            <button
              className="flex-1 px-10 py-0 bg-red-400 text-black inline-flex items-center"
              style={{ lineHeight: '1', whiteSpace: 'nowrap' }}
            >
              {selectedMonth}
            </button>
            <button
            className={`flex-1 px-4 py-0 bg-red-500 text-black hover:bg-red-400 hover:text-white transition duration-300`}
            onClick={() => onChangeMonth('next')}
          >
            {">"}
          </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard
