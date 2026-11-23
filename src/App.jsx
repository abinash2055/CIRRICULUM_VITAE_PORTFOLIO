import React from 'react'

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold text-blue-500">
        Welcome to My Portfolio
      </h1>

      <p className="mt-4 text-lg text-gray-400">
        Full Stack Developer | Python AI/ML Developer
      </p>

      <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700 transition">
        Explore My Work
      </button>
    </div>
  )
}

export default App
