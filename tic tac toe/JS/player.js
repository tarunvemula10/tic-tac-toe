let xTurn = true;
let square = document.querySelectorAll('[square-index]');

let isFilled = [false, false, false, false, false, false, false, false];
let xCombos = [false, false, false, false, false, false, false, false];
let oCombos = [false, false, false, false, false, false, false, false];

let [xWins, oWins, draw] = [0, 0, 0];
let winCounts = document.querySelectorAll('.score p');

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

window.addEventListener('mousemove', function(e) {
     const posX = e.clientX;
     const posY = e.clientY;
     const cursorDotO = document.getElementsByClassName('cursor-dot-o')[0];
     const cursorDotX = document.getElementsByClassName('cursor-dot-x')[0];

     if(xTurn) {
          cursorDotX.classList.remove('d-none');
          cursorDotO.classList.add('d-none');
          cursorDotX.style.left = `${posX}px`;
          cursorDotX.style.top = `${posY}px`;
          cursorDotX.current.animate({ left: `${posX}px`, top: `${posY}px` }, {duration: 500, fill:'forwards'});
     } else {
          cursorDotO.classList.remove('d-none');
          cursorDotX.classList.add('d-none');
          cursorDotO.style.left = `${posX}px`;
          cursorDotO.style.top = `${posY}px`;
          cursorDotO.current.animate({ left: `${posX}px`, top: `${posY}px` }, {duration: 500, fill:'forwards'});
     }
})

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
}

square.forEach((element, index) => {
     element.addEventListener('click', function() {
          if(xTurn) {
               if(!isFilled[index]) {
                    element.classList.add('x');
                    element.classList.add('text-info');
                    element.innerText = 'X';
                    isFilled[index] = true;
                    xCombos[index] = true;
                    xTurn = false;
               }
          } else {
               if(!isFilled[index]) {
                    element.classList.add('o');
                    element.classList.add('text-warning');
                    element.innerText = 'O';
                    isFilled[index] = true;
                    oCombos[index] = true;
                    xTurn = true;
               }
          }
          if(checkWinner()) setTimeout(resetGame, 10);
     })
});

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