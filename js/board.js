import {TURN_SYMBOLS, TILE_H, TILE_W, canvas} from './consts.js';
import { drawCircle, drawCross } from './canvas.js';

/**
 * Abstraction of the optimal board structure
 */
export default class Board {
    board; board_rows; board_cols;
    tiles_per_line;
    constructor(tiles_per_line=3) {
        this.setBoardSize(tiles_per_line);
        this.board = Array(this.tiles_per_line * this.tiles_per_line);
        this.board_rows = Array(this.tiles_per_line).fill(0);
        this.board_cols = Array(this.tiles_per_line).fill(0);
        this.reset();
    }
    /**
     * 
     * @param {number} row row number of current play
     * @param {number} col column number of current play
     * @param {*} turn  current player number
     * @returns whether play has been successful or not
     */
    play(col, row, turn, draw=false) {
        let index = this.tiles_per_line * row + col
        if (TURN_SYMBOLS.indexOf(this.board[index]) != -1) return 0;
        this.board[index] = TURN_SYMBOLS[turn];
        if (this.board_cols[col] === null) {
            this.board_cols[col][TURN_SYMBOLS[turn]] = 1;
        } else {
            this.board_cols[col][TURN_SYMBOLS[turn]]++;
        }
        if (this.board_rows[row] === null) {
            this.board_rows[row][TURN_SYMBOLS[turn]] = 1;
        } else {
            this.board_rows[row][TURN_SYMBOLS[turn]]++;
        }
        if (draw){
            let x = col * TILE_W + TILE_H / 2;
            let y = row * TILE_H + TILE_W / 2;
            if(turn == 0){
                drawCross(x, y);
            } else {
                drawCircle(x, y);
            }
        }
        return 1
    }
    /**
     * Checks if board has a winner and returns winner index.
     * @returns The index of the symbol of the winner if game has one and -1 if not
    */
    checkWinner() {
        for (let i = 0; i < this.tiles_per_line; i++) {
            let row = this.board_rows[i];
            let col = this.board_cols[i];
            // horizontal
            switch (this.tiles_per_line) {
                case row.X:
                case col.X:
                    return TURN_SYMBOLS.indexOf("X");
                case row.O:
                case col.O:
                    return TURN_SYMBOLS.indexOf("O");
            }
        }

        let win = true, symbol;
        // leading diagonal
        symbol = this.board[0];
        win = TURN_SYMBOLS.indexOf(symbol) != -1;
        if (win) {
            for (let i = 0; i < this.tiles_per_line; i++) {
                win = win && (symbol == (this.board[i * this.tiles_per_line + i]));
            }
            if (win) return TURN_SYMBOLS.indexOf(symbol);
        }
        // other diagonal
        symbol = this.board[this.tiles_per_line - 1];
        win = TURN_SYMBOLS.indexOf(symbol) != -1;
        if (win) {
            for (let j = 1; j < this.tiles_per_line; j++) {
                win = win && (symbol == (this.board[j * this.tiles_per_line + (this.tiles_per_line - j - 1)]));
            }
            if (win) return TURN_SYMBOLS.indexOf(symbol);
        }
        return -1;
    }
    /**
     * @returns if board is in a tie state or not
     */
    checkTie() {
        return this.board.reduce((b, a) => (b && TURN_SYMBOLS.indexOf(a) !== -1), true);
    }
    /**
     * Reset board to empty
     */
    reset() {
        this.board.fill("");
        this.board_cols = this.board_cols.map(() => ({ X: 0, O: 0 }));
        this.board_rows = this.board_rows.map(() => ({ X: 0, O: 0 }));
    }
    /** sets the board size and updates canvas size */
    setBoardSize(n) {
        this.tiles_per_line = n;
        canvas.width = n * TILE_W;
        canvas.height = n * TILE_H;
    }
    /**
     * copies the current board
     * @returns new board
     */
    copy() {
        let b = JSON.parse(JSON.stringify(this));
        b.play = this.play;
        b.checkWinner = this.checkWinner;
        b.checkTie = this.checkTie;
        b.copy = this.copy;
        return b;
    }

}