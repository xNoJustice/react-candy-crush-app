import React, { useState, useEffect } from 'react'
import blueCandy from './images/blueCandy.png'
import greenCandy from './images/greenCandy.png'
import orangeCandy from './images/orangeCandy.png'
import purpleCandy from './images/purpleCandy.png'
import redCandy from './images/redCandy.png'
import yellowCandy from './images/yellowCandy.png'
import blank from './images/blank.png'
import logo from './logo.svg'
import './logo.css'

const width = 8
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
]

function App() {
  const [candyGrid, setCandyGrid] = useState([])
  const [draggedCandy, setDraggedCandy] = useState(null)
  const [replacedCandy, setReplacedCandy] = useState(null)
  const [score, setScore] = useState(0)

  function createBoard() {
    const newBoard = []
    for (let i = 0; i < width * width; i += 1) {
      const grid = candyColors[Math.floor(Math.random() * candyColors.length)]
      newBoard.push(grid)
    }
    setCandyGrid(newBoard)
  }

  function checkForRowOfThree() {
    for (let i = 0; i < width * width; i += 1) {
      const rowOfThree = [i, i + 1, i + 2]
      const currentCandy = candyGrid[i]
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ]
      const isBlank = candyGrid[i] === blank

      // eslint-disable-next-line no-continue
      if (notValid.includes(i)) continue

      if (
        rowOfThree.every(
          (index) => candyGrid[index] === currentCandy && !isBlank,
        )
      ) {
        setScore((oldScore) => oldScore + 3)
        rowOfThree.forEach((index) => {
          candyGrid[index] = blank
        })
        return true
      }
    }
    return false
  }

  function checkForRowOfFour() {
    for (let i = 0; i < width * width; i += 1) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const currentCandy = candyGrid[i]
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 61, 62, 63, 64,
      ]
      const isBlank = candyGrid[i] === blank

      // eslint-disable-next-line no-continue
      if (notValid.includes(i)) continue

      if (
        rowOfFour.every(
          (index) => candyGrid[index] === currentCandy && !isBlank,
        )
      ) {
        setScore((oldScore) => oldScore + 4)
        rowOfFour.forEach((index) => {
          candyGrid[index] = blank
        })
        return true
      }
    }
    return false
  }

  function checkForColOfThree() {
    for (let i = 0; i <= 47; i += 1) {
      const colOfThree = [i, i + width, i + width * 2]
      const currentCandy = candyGrid[i]
      const isBlank = candyGrid[i] === blank

      if (
        colOfThree.every(
          (index) => candyGrid[index] === currentCandy && !isBlank,
        )
      ) {
        setScore((oldScore) => oldScore + 3)
        colOfThree.forEach((index) => {
          candyGrid[index] = blank
        })
        return true
      }
    }
    return false
  }

  function checkForColOfFour() {
    for (let i = 0; i <= 39; i += 1) {
      const colOfFour = [i, i + width, i + width * 2, i + width * 3]
      const currentCandy = candyGrid[i]
      const isBlank = candyGrid[i] === blank

      if (
        colOfFour.every(
          (index) => candyGrid[index] === currentCandy && !isBlank,
        )
      ) {
        setScore((oldScore) => oldScore + 4)
        colOfFour.forEach((index) => {
          candyGrid[index] = blank
        })
        return true
      }
    }
    return false
  }

  function moveIntoSquareBelow() {
    for (let i = 0; i <= 55; i += 1) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && candyGrid[i] === blank) {
        candyGrid[i] =
          candyColors[Math.floor(Math.random() * candyColors.length)]
      }

      if (candyGrid[i + width] === blank) {
        candyGrid[i + width] = candyGrid[i]
        candyGrid[i] = blank
      }
    }
  }

  function dragStart(e) {
    setDraggedCandy(parseInt(e.target.id, 10))
  }

  function dragDrop(e) {
    setReplacedCandy(parseInt(e.target.id, 10))
  }

  function dragEnd() {
    const temp = candyGrid[draggedCandy]
    const temp2 = candyGrid[replacedCandy]

    const validMoves = [
      draggedCandy - 1,
      draggedCandy - width,
      draggedCandy + 1,
      draggedCandy + width,
    ]

    const validMove = validMoves.includes(replacedCandy)

    if (!validMove) return

    candyGrid[replacedCandy] = temp
    candyGrid[draggedCandy] = temp2

    const isARowofFour = checkForRowOfFour()
    const isAColofFour = checkForColOfFour()
    const isARowofThree = checkForRowOfThree()
    const isAColofThree = checkForColOfThree()

    if (
      replacedCandy &&
      validMove &&
      (isARowofThree || isARowofFour || isAColofThree || isAColofFour)
    ) {
      setDraggedCandy(null)
      setReplacedCandy(null)
    } else {
      candyGrid[replacedCandy] = temp2
      candyGrid[draggedCandy] = temp
      setCandyGrid([...candyGrid])
    }
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForRowOfFour()
      checkForColOfFour()
      checkForRowOfThree()
      checkForColOfThree()
      moveIntoSquareBelow()
      setCandyGrid([...candyGrid])
    }, 100)
    return () => clearInterval(timer)
  }, [
    checkForColOfThree,
    checkForColOfFour,
    checkForRowOfThree,
    checkForRowOfFour,
    moveIntoSquareBelow,
    candyGrid,
  ])

  return (
    <div className="w-full h-screen flex justify-center items-center mx-auto p-6 dark:text-white text-2xl font-bold">
      <div>
        <img src={logo} alt="logo" className="w-32 h-32 mx-auto logo" />
        <h1 className="text-center pb-4">Candy Crush Game</h1>
        <h3 className="text-center pb-4">{score}</h3>
        <div className="grid grid-cols-8">
          {candyGrid.map((row, i) => (
            <img
              // eslint-disable-next-line
              key={i}
              id={i}
              src={row}
              alt="candy"
              className="w-16 h-16"
              draggable
              onDragStart={(e) => dragStart(e)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={(e) => dragDrop(e)}
              onDragEnd={(e) => dragEnd(e)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
