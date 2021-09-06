import { TILE_W, TILE_H, TURN_SYMBOLS, resizeBoard } from './consts.js';
import { Board } from './board.js';
import { aiMove } from './ai.js';
import { drawBoard, updateBoard } from './draw.js';
/**
 * Game mode game 
 * 1 = 1 player
 * 2 = 2 players
 * 3 = multiplayer
 */
var board = new Board();
var gameMode = 1;
var turn = 0;
let bs = document.getElementById("boardSize");
let gm = document.getElementsByName("mode");
bs.addEventListener('change', function (ev) {
	let v = +ev.target.value;
	resizeBoard(v);
	board = new Board();
	resetGame();
})
Array.from(gm).forEach((elem) => {
	elem.addEventListener("change", function (event) {
		var v = +event.target.value;
		gameMode = v;
		resetGame();
	});
});


canvas.addEventListener('click', (ev) => {
	let col = Math.floor(ev.x / TILE_W);
	let row = Math.floor(ev.y / TILE_H);
	if (!board.play(col, row, turn)) return;
	if (checkWin() || checkTie()) return;
	turn = (turn + 1) % TURN_SYMBOLS.length;
	if (gameMode === 1) {
		let move = aiMove(board, turn);
		if (move) {
			if (!board.play(move.col, move.row, turn)) return;
			if (checkWin() || checkTie()) return;
			turn = (turn + 1) % TURN_SYMBOLS.length;
		}
	}
	updateBoard(board);
})

function checkTie() {
	if (board.checkTie()) {
		alert("Tie!");
		resetGame();
		return 1;
	}
	return 0;
}

function checkWin() {
	let s = board.checkWinner();
	if (s != -1) {
		console.log(s);
		alert("Player " + (s + 1) + " won!");
		resetGame();
		return 1;
	}
	return 0;
}

function resetGame() {
	turn = 0;
	board.reset();
	updateBoard(board);
}


drawBoard();
