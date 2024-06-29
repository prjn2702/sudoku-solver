document.addEventListener('DOMContentLoaded', createGrid);

function createGrid() {
    const gridContainer = document.getElementById('sudoku-grid');
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', '1');
        gridContainer.appendChild(input);
    }
}

function generatePuzzle() {
    // For simplicity, using a static puzzle. You can replace this with dynamic generation logic.
    const puzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    const inputs = document.querySelectorAll('.sudoku-grid input');
    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        if (puzzle[row][col] !== 0) {
            input.value = puzzle[row][col];
            input.setAttribute('readonly', 'true');
        } else {
            input.value = '';
            input.removeAttribute('readonly');
        }
    });
}

function solvePuzzle() {
    const grid = [];
    const inputs = document.querySelectorAll('.sudoku-grid input');
    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        if (!grid[row]) grid[row] = [];
        grid[row][col] = input.value ? parseInt(input.value) : 0;
    });

    if (solveSudoku(grid)) {
        inputs.forEach((input, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            input.value = grid[row][col];
        });
    } else {
        alert('No solution found!');
    }
}

function clearGrid() {
    const inputs = document.querySelectorAll('.sudoku-grid input');
    inputs.forEach(input => {
        input.value = '';
        input.removeAttribute('readonly');
    });
}

function solveSudoku(grid) {
    const emptySpot = findEmptySpot(grid);
    if (!emptySpot) return true;
    const [row, col] = emptySpot;

    for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col] = 0;
        }
    }
    return false;
}

function findEmptySpot(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) return [row, col];
        }
    }
    return null;
}

function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (grid[i][j] === num) return false;
        }
    }
    return true;
}
