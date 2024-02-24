import React from 'react'

const MonthCard = () => {
  return (
    <div className="mx-2 mt-2 flex justify-center  mb-4">
            <div className="lg:w-1/2 w-full bg-white rounded-lg border border-gray-300 shadow-lg p-4">
              <div className="flex justify-between">
                <div className="text-xl">
                  <p className="text-red-400 font-light">17 ENERO | Miércoles</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xl" style={{ marginBottom: "0.5rem" }}>Beneficio - ingreso</p>
              </div>
              <div className="flex justify-end">
                <div className="flex items-center">
                  <p className="text-xl font-bold" style={{ marginRight: "0.5rem" }}>1500€</p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default MonthCard
