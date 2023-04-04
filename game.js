const gameControl = (() => {
  let switchPlayer = (currentPlayer) => {
    if (currentPlayer == playerO) {
      currentPlayer = playerX;
    } else {
      currentPlayer = playerO;
    }
    console.log("works");
    return currentPlayer;
  };
  let putMark = (currentPlayer) => {
    document.querySelectorAll(".space").forEach((space) => {
      space.addEventListener("click", () => {
        console.log("clicked");
        if (gameboard.board[space.dataset.grid - 1] == "") {
          gameboard.board[space.dataset.grid - 1] = currentPlayer.mark;
          gameboard.printBoard();
          currentPlayer = switchPlayer(currentPlayer);
        } else {
          console.log("ERROR");
        }
      });
    });
  };

  return { putMark };
})();

const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let printBoard = () => {
    document.querySelectorAll(".space").forEach((space) => {
      if (board[Number(space.dataset.grid - 1)] == "X") {
        space.classList.add("x");
      } else if (board[space.dataset.grid - 1] == "O") {
        space.classList.add("o");
      }
      space.textContent = board[Number(space.dataset.grid - 1)];
    });
  };
  return { printBoard, board };
})();

const playerFactory = (mark) => {
  return { mark };
};
let counter = 0;
playerX = playerFactory("X");
playerO = playerFactory("O");

gameControl.putMark(playerX);

document.querySelector(".checker").addEventListener("click", () => {
  console.log(gameboard.board);
});
