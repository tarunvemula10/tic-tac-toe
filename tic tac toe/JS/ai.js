let xTurn = true;
let square = document.querySelectorAll('[square-index]');

let isFilled = [false, false, false, false, false, false, false, false];
let xCombos = [false, false, false, false, false, false, false, false];
let oCombos = [false, false, false, false, false, false, false, false];

let filledIndex = [];

let [xWins, oWins, draw] = [0, 0, 0];
let winCounts = document.querySelectorAll('.score p');

window.addEventListener('mousemove', function(e) {
     const posX = e.clientX;
     const posY = e.clientY;
     const cursorDot = document.getElementsByClassName('cursor-dot')[0];

     cursorDot.style.left = `${posX}px`;
     cursorDot.style.top = `${posY}px`;
     cursorDot.current.animate({
          left: `${posX}px`,
          top: `${posY}px`
     }, {duration: 500, fill:'forwards'});
});

function checkCombos(combinations) {
     if((combinations[0] && combinations[1] && combinations[2])) {
          return true;
     } else if((combinations[3] && combinations[4] && combinations[5])) {
          return true;
     } else if((combinations[6] && combinations[7] && combinations[8])) {
          return true;
     } else if((combinations[0] && combinations[3] && combinations[6])) {
          return true;
     } else if((combinations[1] && combinations[4] && combinations[7])) {
          return true;
     } else if((combinations[2] && combinations[5] && combinations[8])) {
          return true;
     } else if((combinations[0] && combinations[4] && combinations[8])) {
          return true;
     } else if((combinations[2] && combinations[4] && combinations[6])) {
          return true;
     } else {
          return false;
     }
}

function checkWinner() {
     if(checkCombos(xCombos)) {
          xWins += 1;
          winCounts[0].innerText = xWins;
          xTurn = true;
          return true;
     } else if(checkCombos(oCombos)) {
          oWins += 1;
          winCounts[2].innerText = oWins;
          xTurn = false;
          return true;
     } else if(isFilled.every(element => element === true)) {
          draw += 1;
          winCounts[1].innerText = draw;
          return true;
     }
     return false;
}

square.forEach((element, index) => {
     element.addEventListener('click', function() {
          if(!isFilled[index]) {
               element.classList.add('x');
               element.classList.add('text-info');
               element.innerText = 'X';
               isFilled[index] = true;
               xCombos[index] = true;
               filledIndex.push(index);
               (checkWinner()) ? setTimeout(resetGame, 100) : setTimeout(playAI, 100);
          }
     })
});
function playAI() {
     let randomIndex;
     do {
          randomIndex = Math.floor(Math.random()*10);
          if(randomIndex === 9) randomIndex -= 1;
     } while(filledIndex.includes(randomIndex));
     
     if(!isFilled[randomIndex]) {
          square[randomIndex].classList.add('o');
          square[randomIndex].classList.add('text-warning');
          square[randomIndex].innerText = 'O';
          isFilled[randomIndex] = true;
          oCombos[randomIndex] = true;
          filledIndex.push(randomIndex);
     }
     if(checkWinner()) setTimeout(resetGame, 10);
}
//to reset the game
function resetGame() {
     square.forEach((element, index) => {
          element.innerText = '';
          element.classList.remove('x');
          element.classList.remove('o');
          element.classList.remove('text-warning');
          element.classList.remove('text-info');
          isFilled[index] = false;
          xCombos[index] = false;
          oCombos[index] = false;
          filledIndex = [];
     });
}
document.getElementById('reset-game').addEventListener('click', resetGame);

//to reset streak
document.getElementById('reset-streak').addEventListener('click', function() {
     [xWins, oWins, draw] = [0, 0, 0];
     winCounts[0].innerText = 0;
     winCounts[1].innerText = 0;
     winCounts[2].innerText = 0;
});