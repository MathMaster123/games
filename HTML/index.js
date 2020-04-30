var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');
var ROW_COUNT = 6;
var COLUMN_COUNT = 7;
var shapesize = 100;
var winner = document.getElementById('winner')
var board = []
var colors = ['Red', 'Yellow']
var turn = 0
for (i = 0; i < COLUMN_COUNT; i++) {
    board.push(['white', 'white', 'white', 'white', 'white', 'white', 'white'])
}
function showturn() {
    winner.innerHTML = 'It is ' + colors[(turn + 1) % 2] + "'s turn.";
    winner.style.color = colors[Math.abs((turn + 1) % 2)]
}
function draw_board() {
    for (col = 0; col < COLUMN_COUNT; col++) {
        for (row = 0; row < ROW_COUNT; row++) {
            ctx.fillStyle = "blue";
            ctx.fillRect((col) * shapesize, (row + 1) * shapesize, shapesize, shapesize);
            ctx.fill();
        }
    }
    for (col = 0; col < COLUMN_COUNT; col++) {
        for (row = 0; row < ROW_COUNT; row++) {
            ctx.beginPath();
            ctx.fillStyle = 'white'
            if (board[row][col] == 'Red') {
                ctx.fillStyle = 'Red';
            }
            if (board[row][col] == 'Yellow') {
                ctx.fillStyle = 'Yellow'
            }
            ctx.arc((col) * shapesize + shapesize / 2, Math.abs((row + 1) - COLUMN_COUNT) * shapesize + 1 / 2 * shapesize, shapesize / 2 - 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
    }
}
function check_open(event) {
    x = Math.floor(event.clientX / shapesize);
    for (y = 0; y < COLUMN_COUNT; y++) {
        if (board[y][x] == 'white') {
            board[y][x] = colors[turn]
            turn += 1
            turn = turn % 2
            y = 12345
            break
        }
        if (board[y][x] != 'white') {
            continue
        }
    }
}
draw_board()
function chkLine(a, b, c, d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a == b) && (a == c) && (a == d));
}

function chkWinner(board) {
    // Check down
    for (r = 0; r < 3; r++) {
        for (c = 0; c < 7; c++) {
            if (chkLine(board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c])) {
                if (board[r][c] != 'white') {
                    winner.innerHTML = board[r][c] + " wins!";
                }
            }
        }
    }
    for (r = 0; r < 6; r++) {
        for (c = 0; c < 4; c++) {
            if (chkLine(board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3])) {
                if (board[r][c] != 'white') {
                    winner.innerHTML = board[r][c];
                }
            }
        }
    }
    for (r = 0; r < 3; r++) {
        for (c = 0; c < 4; c++) {
            if (chkLine(board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3])) {
                if (board[r][c] != 'white') {
                    winner.innerHTML = board[r][c];
                }
            }
        }
    }
    for (r = 3; r < 6; r++) {
        for (c = 0; c < 4; c++) {
            if (chkLine(board[r][c], board[r - 1][c + 1], board[r - 2][c + 2], board[r - 3][c + 3])) {
                if (board[r][c] != 'white') {
                    winner.innerHTML = board[r][c];
                }
            }
        }
    }
}
function main(event) {
    showturn()
    check_open(event);
    draw_board();
    chkWinner(board);
}

canvas.onclick = function (event) { main(event) }
