import React from 'react'

const InfoHome = ({ title, text }) => {
  return (
    <a
      style={{ width: '95%', height: '100%' }}
      className="group lg:mr-1 xl:mr-1 shadow-lg rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100 hover:dark:bg-gray-100 text-center sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {title}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 text-sm opacity-50">
        {text}
      </p>
    </a>
  )
}

export default InfoHome
