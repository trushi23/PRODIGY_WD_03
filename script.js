"use strict";

const ContainerEl = document.querySelector(".container");
let playerTxt = document.querySelector(".message");
let restartBtn = document.getElementById("restartbtn");
let boxes = document.querySelectorAll(".box");

const O_TXT = "O"
const X_TXT = "X"

let currentPlayer = X_TXT;
let spaces = Array(9).fill(null);
let winnnerIdicator = getComputedStyle(document.body).getPropertyValue("--darkColor",);

const startGame = () => {
     boxes.forEach((boxs) => boxs.addEventListener("click", boxClicked));
};

function boxClicked(e)
{
     const id = e.target.id;

     if(!spaces[id])
     {
          spaces[id] = currentPlayer;
          e.target.innerText = currentPlayer;

          if(playerHasWon() != false)
          {
               playerTxt.innerHTML = ` <h2 class="message">Congratulations Player ${currentPlayer}</h2>`;
               winnnerIdicator = playerHasWon();
               winnnerIdicator.map((box) => (boxes[box].style.backgroundColor = "#f4d03f"),
               );

               ContainerEl.classList.add('success');
          }
          currentPlayer = currentPlayer == X_TXT ? O_TXT : X_TXT;
     }
}

const winingCombination = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6],
];

function playerHasWon()
{
     for(const condition of winingCombination)
     {
          let [a,b,c] = condition;

          if(spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c])
          {
               return [a,b,c];
          }
     }
     return false;
}

restartBtn.addEventListener('click', restartGame);
function restartGame()
{
     spaces.fill(null);
     boxes.forEach((box) => {
          box.innerHTML = "";
          box.style.backgroundColor = ""
     })
     playerTxt.innerHTML = "Tic Tac Toe"
     currentPlayer = O_TXT;
     ContainerEl.classList.remove('success');
}

startGame()
