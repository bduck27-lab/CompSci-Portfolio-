// Wait for the entire HTML document to load before starting the game logic
document.addEventListener('DOMContentLoaded', () => {
    // --- GAME STATE VARIABLES ---
    // Represents the board state, initialized to empty strings for all 9 cells
    let board = ["", "", "", "", "", "", "", "", ""];
    // 'X' always goes first
    let currentPlayer = 'X';
    // Boolean to control if a player can still make moves
    let gameActive = true; 

    // --- DOM ELEMENTS ---
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');

    // --- WINNING COMBINATIONS ---
    // Defines all 8 ways to win (indices of the 'board' array)
    const winningConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal (top-left to bottom-right)
        [2, 4, 6]  // Diagonal (top-right to bottom-left)
    ];

    // --- MESSAGE FUNCTIONS ---
    // Function to update the status text in the UI
    const updateStatus = (message) => {
        statusElement.innerHTML = message;
    };

    // --- GAME LOGIC FUNCTIONS ---

    // 1. Check for Win/Draw
    const checkResult = () => {
        let roundWon = false;
        
        // Loop through all possible winning conditions
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            // Check if all three cells are filled and are the same player
            if (a === '' || b === '' || c === '') {
                continue; // Skip if the condition isn't fully met yet
            }
            if (a === b && b === c) {
                roundWon = true;
                
                // Highlight the winning cells
                winCondition.forEach(index => {
                    const cell = boardElement.children[index];
                    if (cell) {
                        cell.classList.add('win');
                    }
                });
                break;
            }
        }

        if (roundWon) {
            updateStatus(`Player ${currentPlayer} Wins! 🥳`);
            gameActive = false; // Stop the game
            return;
        }

        // Check for Draw (if no win and the board is full)
        const roundDraw = !board.includes("");
        if (roundDraw) {
            updateStatus(`It's a Draw! 🤝`);
            gameActive = false; // Stop the game
            return;
        }

        // If no win or draw, switch player and update status
        handlePlayerChange();
    };

    // 2. Switch Player
    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus(`Player ${currentPlayer}'s Turn`);
    };

    // 3. Handle Cell Click
    const handleCellClick = (clickedCell, clickedCellIndex) => {
        // If the cell is already filled or the game is over, do nothing
        if (board[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        // Update the board state and the cell's appearance
        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase()); // Add 'x' or 'o' class for styling

        checkResult();
    };

    // 4. Reset Game
    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = 'X';
        
        // Reset all cells in the UI
        boardElement.querySelectorAll('.cell').forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove('x', 'o', 'win');
        });

        updateStatus(`Player ${currentPlayer}'s Turn`);
    };

    // --- INITIALIZATION ---
    
    // Function to create the 9 cells and set up event listeners
    const initializeBoard = () => {
        // Create 9 cells dynamically
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i; // Store the index of the cell

            // Add the click handler
            cell.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.index);
                handleCellClick(event.target, index);
            });

            boardElement.appendChild(cell);
        }
        
        // Initial status message
        updateStatus(`Player ${currentPlayer}'s Turn`);
    };
    
    // Add the listener for the reset button
    resetButton.addEventListener('click', resetGame);
    
    // Start the game setup
    initializeBoard();
});