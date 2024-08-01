document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('sudoku-board');
    const solveButton = document.getElementById('solve-button');
    const refreshButton = document.getElementById('refresh-button');
    const lightModeButton = document.getElementById('light-mode');
    const darkModeButton = document.getElementById('dark-mode');
    const body = document.body;

    // Create 9x9 Sudoku board
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.dataset.index = i;
        board.appendChild(input);
    }

    // Function to get the board values as a 2D array
    function getBoard() {
        const inputs = board.querySelectorAll('input');
        const boardArray = [];
        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const value = inputs[i * 9 + j].value;
                row.push(value ? parseInt(value) : 0);
            }
            boardArray.push(row);
        }
        return boardArray;
    }

    // Function to set the board values from a 2D array
    function setBoard(boardArray) {
        const inputs = board.querySelectorAll('input');
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                inputs[i * 9 + j].value = boardArray[i][j] ? boardArray[i][j] : '';
            }
        }
    }

    // Function to check if a number can be placed in a cell
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num || 
                board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {
                return false;
            }
        }
        return true;
    }

    // Function to solve the Sudoku puzzle
    function solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    // Solve button event listener
    solveButton.addEventListener('click', () => {
        const boardArray = getBoard();
        if (solveSudoku(boardArray)) {
            setBoard(boardArray);
        } else {
            alert('No solution found!');
        }
    });

    // Refresh button event listener
    refreshButton.addEventListener('click', () => {
        const inputs = board.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    });

    // Light mode and Dark mode toggle
    lightModeButton.addEventListener('click', () => {
        body.classList.remove('dark-mode');
    });

    darkModeButton.addEventListener('click', () => {
        body.classList.add('dark-mode');
    });
});
