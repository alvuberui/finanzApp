'use client';

import { useState } from "react";
import { ButtonsMenu, DatePickerMonth, DatePickerYear } from "../components";

import { AnualBenefit, AnualBills, AnualDividend, AnualInnecesary, AnualInvestment, AnualNecessary, AnualReview, MonthBard, MonthCard, MonthDonut } from "./components";

const Dashboard = () => {

  const [selectedOption, setSelectedOption] = useState(0);
  const [typeSelected, setTypeSelected] = useState(0);
  const [ historicalOption, setHistoricalOption ] = useState(0);


  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between pt-5 bg-white">
      <div className="  w-full">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
          <div className="mx-auto w-max">
            <div className="rounded-lg overflow-hidden shadow-xl bg-white flex">
              <ButtonsMenu setFunction={setSelectedOption} state={selectedOption} listNames={['Mensual', 'Anual', 'Histórico']} />
            </div>
          </div>
        </div>

        {selectedOption === 0 &&
          <div className="mx-auto w-max mb-5">
            <div className="rounded-lg overflow-hidden bg-white flex items-center border border-gray-300 shadow-lg">
              <DatePickerMonth />
            </div>
          </div>
        }

        {selectedOption === 1 &&
          <div className="mx-auto w-max mb-5">
            <div className="rounded-lg overflow-hidden bg-white flex items-center border border-gray-300 shadow-lg">
              <DatePickerYear />
            </div>
          </div>
        }


        {
          selectedOption === 0 ?
            <>
              <div className="mx-auto w-max">
                <div className="rounded-lg overflow-hidden shadow-xl bg-white flex">
                  <ButtonsMenu setFunction={setTypeSelected} state={typeSelected} listNames={['Listado', 'Rosca', 'Barras']} />
                </div>
              </div>
              {
                typeSelected === 0 &&
                <MonthCard />
              }
              {
                typeSelected === 1 &&
                <MonthDonut />
              }
              {
                typeSelected === 2 &&
                <MonthBard />
              }
            </>
            : selectedOption === 1 ?
              <>
                <div className="mx-auto w-max">
                  <div className="rounded-lg overflow-hidden shadow-xl bg-white flex">
                    <ButtonsMenu setFunction={setTypeSelected} state={typeSelected} listNames={['Resumen', 'Beneficios', 'Gastos', 'Innecesarios', 'Necesarios', 'Inversion', 'Dividendos']} />
                  </div>
                </div>
                {
                  typeSelected === 0 &&
                  <AnualReview />
                }
                {
                  typeSelected === 1 &&
                  <AnualBenefit />
                }
                {
                  typeSelected === 2 &&
                  <AnualBills />
                }
                {
                  typeSelected === 3 &&
                  <AnualInnecesary />
                }
                {
                  typeSelected === 4 &&
                  <AnualNecessary />
                }
                {
                  typeSelected === 5 &&
                  <AnualInvestment />
                }
                {
                  typeSelected === 6 &&
                  <AnualDividend />
                }
              </>
              :
              <>
                <div className="mx-auto w-max">
                  <div className="rounded-lg overflow-hidden shadow-xl bg-white flex">
                    <ButtonsMenu setFunction={setHistoricalOption} state={historicalOption} listNames={['Resumen', 'Beneficios', 'Gastos', 'Innecesarios', 'Necesarios', 'Inversion', 'Dividendos', 'Fondos']} />
                  </div>
                </div>
                {
                  typeSelected === 0 &&
                  <MonthCard />
                }
                {
                  typeSelected === 1 &&
                  <MonthDonut />
                }
                {
                  typeSelected === 2 &&
                  <MonthBard />
                }
              </>
        }

      </div>
    </main>
  );
}

export default Dashboard
