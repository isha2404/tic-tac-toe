import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const gameboard = document.getElementById('gameboard');
const infoDisplay = document.getElementById('info');
const startCells = ["","","","","","","","",""];

let go="circle";
infoDisplay.textContent = "Circle goes first"

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', addGo);
    gameboard.append(cellElement);

  })
}
createBoard();

function addGo(e){
 const goDisplay = document.createElement('div'); 
 goDisplay.classList.add(go);
 e.target.append(goDisplay);  
 go = go === 'circle' ? "cross" : "circle";
 infoDisplay.textContent = "it is now " + go + "'s turn"
 e.target.removeEventListener("click", addGo);
 checkScore()
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  
  winningCombos.forEach(arr => {
    const circleWins = arr.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))
    if (circleWins) {
      infoDisplay.textContent = "Circle wins!";
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  });

 

  winningCombos.forEach(arr => {
    const circleWins = arr.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))
    if (circleWins) {
      infoDisplay.textContent = "Cross wins!";
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  });


}
