import React from 'react'

export default function Header({title, highlight}) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in leading-[130%]">
          {title}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-4">
              {highlight}
          </span>
      </h1>
    </div>
  )
}
