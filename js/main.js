// DOMs
const playNowButton = document.getElementById("play-now");
const restartButton = document.getElementById("restart");
const boxes = document.querySelectorAll(".box");

let playNowCount = 0;
let restartCount = 0;

// Went back and added random to randomize who goes first
// Function to randomly select the starting player
// Randomly select 'X' or 'O' with equal probability
const getRandomStartingPlayer = () => {
    return Math.random() < 0.5 ? 'X' : 'O'; 
};

// Event Listener for restart
// These event listeners track clicks on the "Play Now" 
// and "Restart Game" buttons respectively.

////playNowButton.addEventListener("click", function() {
  //  playNowCount++;
    //console.log("Play Now button clicked " + playNowCount + " times.");
////});
//Tracks clicks of Restart button
restartButton.addEventListener("click", function() {
    restartCount++;
    console.log("Restart Game button clicked " + restartCount + " times.");
});

// Initialize variables to keep track of the game state

let currentPlayer; // Player who starts the game will be determined randomly
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the game board, initially empty
let gameActive = true; // Flag to indicate if the game is still active
let playerXWins = 0; // Counter for player X wins
let playerOWins = 0; // Counter for player O wins

// Function to check if a player has won
const checkWin = () => {

    // Define Winning Combinations
    // Predefined winning combinations on the game board

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]              // Diagonal
    ];

    // Check Win Function

    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        // Checks if any of the winning combinations
        // have the same symbol ('X' or 'O') in all three positions
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true; // If a winning combination is found, return true
        }
    }
    return false; // Return false if no winning combination is found
};

// Handle Move Function
// Handles the player's move when clicking on a box
// in the game board
const handleMove = (boxIndex) => {
    // If the box is already filled or the game is not active, do nothing
    if (gameBoard[boxIndex] !== '' || !gameActive) {
        return;
    }

    // Update the game board with the current player's symbol
    gameBoard[boxIndex] = currentPlayer;

    // Update the UI to show the player's symbol in the clicked box
    document.getElementsByClassName('box')[boxIndex].innerText = currentPlayer;

    // Check if the game is won after the move
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
        return;
    }

    // Check if the game is a tie (if there are no empty boxes left)
    if (!gameBoard.includes('')) {
        document.getElementById('status').innerText = "It's a tie!";
        gameActive = false; // Set game to inactive
        return;
    }

    // Switch players for the next move
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alternate between X and O
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`; // Update status message
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
    //console.log(localStorage);
};

// Add click event listener to the restart button
document.getElementById('restart').addEventListener('click', restartGame);

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
        const { savedCurrentPlayer, savedGameBoard, savedGameActive } = JSON.parse(storedGameState);
        currentPlayer = savedCurrentPlayer;
        gameBoard = savedGameBoard;
        gameActive = savedGameActive;
        
        // Update the UI to reflect the stored game state
        document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
        savedGameBoard.forEach((value, index) => {
            document.getElementsByClassName('box')[index].innerText = value;
        });
    } else {
        // If no stored game state, randomly select the starting player
        currentPlayer = getRandomStartingPlayer();
        document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    }
});