$(document).ready(function () {
  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let score = { "Player 1": 0, "Player 2": 0, Computer: 0 };
  let player1Name = "Player 1";
  let player2Name = "Player 2";
  let isTwoPlayerMode = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  $("#player1Name").focusout(function () {
    player1Name = $(this).val() || "Player 1";
    updateScoreLabels();
  });

  $("#player2Name").focusout(function () {
    if (isTwoPlayerMode) {
      player2Name = $(this).val() || "Player 2";
      updateScoreLabels();
    }
  });

  $("#twoPlayerMode").click(function () {
    isTwoPlayerMode = true;
    $("#player2Name").show();
    player2Name = $("#player2Name").val() || "Player 2";
    startNewGame();
  });

  $("#playerComputerMode").click(function () {
    isTwoPlayerMode = false;
    $("#player2Name").hide();
    player2Name = "Computer";
    startNewGame();
  });

  $(".cell").click(function () {
    const clickedCellIndex =
      parseInt($(this).attr("id").replace("cell", "")) - 1;
    if (
      gameState[clickedCellIndex] !== "" ||
      !gameActive ||
      (!isTwoPlayerMode && currentPlayer === "O")
    ) {
      return;
    }
    handleCellPlayed($(this), clickedCellIndex);
    handleResultValidation();

    if (gameActive && !isTwoPlayerMode && currentPlayer === "O") {
      computerMove();
    }
  });

  $("#newGame").click(startNewGame);

  function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.text(currentPlayer);
    clickedCell.addClass(currentPlayer === "X" ? "x" : "o");
  }

  function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function handleResultValidation() {
    let roundWon = false;
    let winningIndexes = [];
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        winningIndexes = winCondition;
        break;
      }
    }

    if (roundWon) {
      updateScore(currentPlayer);
      gameActive = false;
      winningIndexes.forEach((index) => {
        $("#cell" + (index + 1)).addClass("win");
      });
      return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      gameActive = false;
      return;
    }

    handlePlayerChange();
  }

 function updateScore(winner) {
    let winnerName = winner === 'X' ? player1Name : (isTwoPlayerMode ? player2Name : 'Computer');
    
    // Ensure the winner's name is in the score object and it's a number
    if (!score[winnerName]) {
        score[winnerName] = 0;
    }
    
    score[winnerName] += 3;
    updateScoreLabels();
}

function updateScoreLabels() {
    $("#scoreX").text(player1Name + "'s score: " + (score[player1Name] || 0));
    $("#scoreO").text((isTwoPlayerMode ? player2Name : 'Computer') + "'s score: " + (score[isTwoPlayerMode ? player2Name : 'Computer'] || 0));
}


 function computerMove() {
    let move = getWinningMove('O') || getWinningMove('X') || takeCenter() || takeCorner() || getRandomMove();

    if (move !== null) {
        gameState[move] = 'O';
        const cell = $("#cell" + (move + 1));
        cell.text('O');
        cell.addClass('o');
        handleResultValidation();
    }
}

function getWinningMove(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === player && gameState[b] === player && gameState[c] === "") {
            return c;
        } else if (gameState[a] === player && gameState[c] === player && gameState[b] === "") {
            return b;
        } else if (gameState[b] === player && gameState[c] === player && gameState[a] === "") {
            return a;
        }
    }
    return null;
}

function takeCenter() {
    const center = 4;
    if (gameState[center] === "") {
        return center;
    }
    return null;
}

function takeCorner() {
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(index => gameState[index] === "");
    if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }
    return null;
}

function getRandomMove() {
    const availableSpots = gameState.map((cell, idx) => cell === "" ? idx : null).filter(val => val !== null);
    if (availableSpots.length > 0) {
        return availableSpots[Math.floor(Math.random() * availableSpots.length)];
    }
    return null;
}
 
  function startNewGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    $(".cell").text("").removeClass("x o win");
    updateScoreLabels();

    // If it's a player-computer game and computer has to start, make a move
    if (!isTwoPlayerMode && currentPlayer === "O") {
      computerMove();
    }
  }

  // Call startNewGame to initialize the game
  startNewGame();
});
