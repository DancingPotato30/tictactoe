const gameControl = (() => {
  let gameStart = true;

  let winnerDisplay = document.createElement("div");
  winnerDisplay.classList.add("winner");

  let switchPlayer = (currentPlayer) => {
    if (currentPlayer == playerO) {
      currentPlayer = playerX;
    } else {
      currentPlayer = playerO;
    }
    //console.log("works");
    return currentPlayer;
  };

  let restartBtn = document.createElement("button");
  restartBtn.classList.add("restartBtn");
  restartBtn.textContent = "Play Again!";
  restartBtn.addEventListener("click", () => {
    gameboard.restartBoard();
    gameStart = true;
    document.querySelectorAll(".space").forEach((space) => {
      space.classList.remove("x");
      space.classList.remove("o");
    });
    document.querySelector("body").removeChild(restartBtn);
    document.querySelector("body").removeChild(winnerDisplay);
  });

  let restartBtnMaker = () => {
    document.querySelector("body").appendChild(restartBtn);
    gameStart = false;
  };

  let gameOverDisplay = (lastPlayer, state) => {
    let winner;
    if (lastPlayer == "X") {
      winner = playerX.name;
    } else {
      winner = playerO.name;
    }

    if (state == "win") {
      winnerDisplay.textContent = `${winner} won the game!`;
    } else if (state == "draw") {
      winnerDisplay.textContent = "Draw!";
    }
    document.querySelector("body").appendChild(winnerDisplay);
    restartBtnMaker();
  };

  let putMark = (currentPlayer) => {
    document.querySelectorAll(".space").forEach((space) => {
      space.addEventListener("click", () => {
        //console.log("clicked");
        if (gameStart == false) {
          return;
        } else {
          if (gameboard.getBoard()[space.dataset.grid - 1] == "") {
            gameboard.getBoard()[space.dataset.grid - 1] = currentPlayer.mark;
            gameboard.printBoard();
            gameOverCheck(space);
            currentPlayer = switchPlayer(currentPlayer);
          } else {
            console.log("ERROR");
          }
        }
      });
    });
  };

  let gameOverCheck = (spacePressed) => {
    let spaces = document.querySelectorAll(".space");
    let s1 = spaces[0].textContent;
    let s2 = spaces[1].textContent;
    let s3 = spaces[2].textContent;
    let s4 = spaces[3].textContent;
    let s5 = spaces[4].textContent;
    let s6 = spaces[5].textContent;
    let s7 = spaces[6].textContent;
    let s8 = spaces[7].textContent;
    let s9 = spaces[8].textContent;
    //Horizontal Check
    if (
      (s1 && s1 == s2 && s2 == s3) ||
      (s4 && s4 == s5 && s5 == s6) ||
      (s7 && s7 == s8 && s8 == s9)
    ) {
      gameOverDisplay(spacePressed.textContent, "win");
    }

    //Vertical Check
    else if (
      (s1 && s1 == s4 && s4 == s7) ||
      (s2 && s2 == s5 && s5 == s8) ||
      (s3 && s3 == s6 && s6 == s9)
    ) {
      gameOverDisplay(spacePressed.textContent, "win");
    }

    //Diagonal check
    else if ((s1 && s1 == s5 && s5 == s9) || (s3 && s3 == s5 && s5 == s7)) {
      gameOverDisplay(spacePressed.textContent, "win");
    }

    //Draw Check
    else if (
      s1 != "" &&
      s2 != "" &&
      s3 != "" &&
      s4 != "" &&
      s5 != "" &&
      s6 != "" &&
      s7 != "" &&
      s8 != "" &&
      s9 != ""
    ) {
      gameOverDisplay(spacePressed.textContent, "draw");
    }
  };
  return { putMark };
})();

const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let getBoard = () => {
    return board;
  };
  let printBoard = () => {
    document.querySelectorAll(".space").forEach((space) => {
      if (getBoard()[space.dataset.grid - 1] == "X") {
        space.classList.add("x");
      } else if (getBoard()[space.dataset.grid - 1] == "O") {
        space.classList.add("o");
      }
      space.textContent = getBoard()[space.dataset.grid - 1];
    });
  };

  let restartBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    printBoard();
  };

  let nameInputX = document.querySelector(".xname");
  let nameInputO = document.querySelector(".oname");

  nameInputX.addEventListener("keyup", (e) => {
    playerX.name = nameInputX.value;
  });

  nameInputO.addEventListener("keyup", (e) => {
    playerO.name = nameInputO.value;
  });

  window.addEventListener("load", () => {
    playerX.name = nameInputX.value;
    playerO.name = nameInputO.value;
  });

  return { printBoard, getBoard, restartBoard };
})();

const playerFactory = (mark) => {
  let name;
  let getName = () => {
    return name;
  };
  return { mark, getName };
};
let counter = 0;
playerX = playerFactory("X");
playerO = playerFactory("O");

gameControl.putMark(playerX);

document.querySelector(".checker").addEventListener("click", () => {
  console.log(playerO.name);
  console.log(playerX.name);
});
