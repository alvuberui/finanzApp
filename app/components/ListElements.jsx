import React from 'react'

const ListElements = ({ colors, titles, values }) => {
    return (
        <ul className="mt-4">
            {
                colors.map((color, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <span className={`inline-block h-2 w-2 rounded-full ${color} mr-2`}></span>
                        <span className="font-bold">{ titles[index]}</span>
                        <span className="ml-2">{ values[index] }</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default ListElements
