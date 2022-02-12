import React from 'react'
import logo from './logo.svg'
import './logo.css'

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center mx-auto p-6 dark:text-white text-2xl font-bold">
      <div>
        <img src={logo} alt="logo" className="w-32 h-32 mx-auto logo" />
        Welcome to my App
      </div>
    </div>
  )
}

export default App
