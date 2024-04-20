// DOMs
const playNowButton = document.getElementById("play-now");
const restartButton = document.getElementById("restart");
const boxes = document.querySelectorAll(".box");

// Initialize counts for tracking button clicks
let playNowCount = 0;
let restartCount = 0;

// Function to randomly select the starting player ('X' or 'O')
const getRandomStartingPlayer = () => {
    return Math.random() < 0.5 ? 'X' : 'O'; 
};

// Event Listener for restart button
restartButton.addEventListener("click", function() {
    restartCount++;
    console.log("Restart Game button clicked " + restartCount + " times.");
});

// Initialize variables to keep track of the game state
let currentPlayer;
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the game board, initially empty
let gameActive = true; // Flag to indicate if the game is still active
let playerXWins = 0; // Counter for player X wins
let playerOWins = 0; // Counter for player O wins

// Function to check if a player has won
const checkWin = () => {
    // Define Winning Combinations
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]              // Diagonal
    ];

    // Iterate over each winning condition
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        // Check if the positions match and are not empty
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true; // If a winning combination is found, return true
        }
    }
    return false; // Return false if no winning combination is found
};

// Function to save the game state to local storage
const saveGameState = () => {
    const gameState = {
        savedCurrentPlayer: currentPlayer,
        savedGameBoard: gameBoard,
        savedGameActive: gameActive,
        savedPlayerXWins: playerXWins,
        savedPlayerOWins: playerOWins
    };
    localStorage.setItem('ticTacToeGameState', JSON.stringify(gameState));
};

// Function to restart the game
const restartGame = () => {
    // Reset game state variables
    currentPlayer = getRandomStartingPlayer(); // Randomly select the starting player
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Clear the game board
    gameActive = true; // Set game to active
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`; // Update status message

    // Clear the content of each box in the UI
    boxes.forEach((box) => {
        box.innerText = '';
    });
    
    // Clear local storage
    localStorage.removeItem('ticTacToeGameState');
};

// Add click event listener to the restart button
document.getElementById('restart').addEventListener('click', () => {
    restartGame(); // Call restartGame function when the restart button is clicked
    saveGameState(); // Save game state after restarting
});

// Function to handle player's move
const handleMove = (boxIndex) => {
    // Check if the box is already filled or if the game is not active, do nothing
    if (gameBoard[boxIndex] !== '' || !gameActive) {
        return;
    }

    // Update the game board with the current player's symbol
    gameBoard[boxIndex] = currentPlayer;

    // Update the UI to show the player's symbol in the clicked box
    document.getElementsByClassName('box')[boxIndex].innerText = currentPlayer;

    // Check if the game is won after each move
    if (checkWin()) {
        document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
        gameActive = false; // Set game to inactive
        
        // Update win counters
        if (currentPlayer === 'X') {
            playerXWins++;
            document.getElementById('playerXWins').innerText = `Player X Wins: ${playerXWins}`;
        } else {
            playerOWins++;
            document.getElementById('playerOWins').innerText = `Player O Wins: ${playerOWins}`;
        }
        saveGameState(); // Save game state after a win
        return;
    }

    // Check if the game is a tie (if there are no empty boxes left)
    if (!gameBoard.includes('')) {
        document.getElementById('status').innerText = "It's a tie!";
        gameActive = false; // Set game to inactive
        saveGameState(); // Save game state after a tie
        return;
    }

    // Switch players for the next move
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alternate between X and O
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`; // Update status message
    saveGameState(); // Save game state after each move
};

// Add click event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleMove(index); // Call handleMove function when a box is clicked
    });
});

// Initialize the game state from local storage when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const storedGameState = localStorage.getItem('ticTacToeGameState');
    if (storedGameState) {
        const { savedCurrentPlayer, savedGameBoard, savedGameActive, savedPlayerXWins, savedPlayerOWins } = JSON.parse(storedGameState);
        currentPlayer = savedCurrentPlayer;
        gameBoard = savedGameBoard;
        gameActive = savedGameActive;
        playerXWins = savedPlayerXWins;
        playerOWins = savedPlayerOWins;
        
        // Update the UI to reflect the stored game state
        document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
        document.getElementById('playerXWins').innerText = `Player X Wins: ${playerXWins}`;
        document.getElementById('playerOWins').innerText = `Player O Wins: ${playerOWins}`;
        savedGameBoard.forEach((value, index) => {
            document.getElementsByClassName('box')[index].innerText = value;
        });
    } else {
        // If no stored game state, randomly select the starting player
        currentPlayer = getRandomStartingPlayer();
        document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    }
});