import React from 'react'

const ButtonsMenu = ({ setFunction, state, listNames }) => {
  return (
    <div>
      {
        listNames.map((name, index) => (
          <button
            key={index}
            className={`flex-1 px-4 py-0 ${state === index ? 'bg-gray-300 text-black' : 'bg-white-400 text-black'} border hover:bg-gray-200 hover:text-black transition duration-300`}
            onClick={() => setFunction(index)}
          >
            {name}
          </button>
        ))
      }
    </div>
  )
}

export default ButtonsMenu
