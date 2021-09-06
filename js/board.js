import { TILES_PER_LINE, TURN_SYMBOLS } from "./consts.js";

/**
 * Abstraction of the optimal board structure
 */
export class Board {
    board; board_rows; board_cols;
    constructor() {
        this.board = Array(TILES_PER_LINE * TILES_PER_LINE);
        this.board_rows = Array(TILES_PER_LINE).fill(0);
        this.board_cols = Array(TILES_PER_LINE).fill(0);
        this.reset();
    }
    /**
     * 
     * @param {number} row row number of current play
     * @param {number} col column number of current play
     * @param {*} turn  current player number
     * @returns whether play has been successful or not
     */
    play(col, row, turn) {
        let index = TILES_PER_LINE * row + col
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
        return 1
    }
    /**
     * 
     * @returns The index of the symbol of the winner if game has one and -1 if not
    */
    checkWinner() {
        for (let i = 0; i < TILES_PER_LINE; i++) {
            let row = this.board_rows[i];
            let col = this.board_cols[i];
            // horizontal
            switch(TILES_PER_LINE){
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
            for (let i = 0; i < TILES_PER_LINE; i++) {
                win = win && (symbol == (this.board[i * TILES_PER_LINE + i]));
            }
            if (win) return TURN_SYMBOLS.indexOf(symbol);
        }
        // other diagonal
        symbol = this.board[TILES_PER_LINE - 1];
        win = TURN_SYMBOLS.indexOf(symbol) != -1;
        if (win) {
            for (let j = 1; j < TILES_PER_LINE; j++) {
                win = win && (symbol == (this.board[j * TILES_PER_LINE + (TILES_PER_LINE - j - 1)]));
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
    /**
     * copies the current board
     * @returns new board
     */
    copy(){
        let b = new Board();
        b.board = this.board.slice(0);
        b.board_cols.forEach((_, i)=>{
            b.board_cols[i] = {...this.board_cols[i]};
            b.board_rows[i] = {...this.board_rows[i]}
        });
        return b;
    }
}