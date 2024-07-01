import React from 'react'

const ButtonsMenu = ({ setFunction, state, listNames }) => {
  return (
    <div className="flex flex-wrap">
  {listNames.map((name, index) => (
    <button
      key={index}
      className={`px-4 py-2 ${state === index ? 'bg-gray-300 text-black' : 'bg-white text-black'} border hover:bg-gray-200 hover:text-black transition duration-300`}
      style={{ flex: '1 0 auto' }}
      onClick={() => setFunction(index)}
    >
      {name}
    </button>
  ))}
</div>
  )
}

export default ButtonsMenu
