import Board  from "./board.js";
import { aiMove } from './ai.js';
import {clear, drawBoard} from './canvas.js';
import { TILE_W, TILE_H, TURN_SYMBOLS, canvas } from './consts.js';
export default class Game {
    /** @type {number} The game mode of the game object **/
    #gameMode;
    /** @type {number} value representing which player is currently playing **/
    #turn;
    /** @type {Board} board object */
    board;
    constructor(){
        this.#gameMode = 1;
        this.#turn = 0;
        this.board = new Board();
        drawBoard(this.board.tiles_per_line);
    }
    /**
     * Plays next turn according to user's mouse input
     * @param {MouseEvent} ev 
     */
    nextPlay(ev){
        let boundingRect = canvas.getBoundingClientRect();
        let col = Math.min(Math.floor((ev.x - boundingRect.left)/ TILE_W), this.board.tiles_per_line - 1);
        let row = Math.min(Math.floor((ev.y - boundingRect.top)/ TILE_H), this.board.tiles_per_line - 1);
        if (!this.board.play(col, row, this.#turn, true)) return;
        if (this.#checkWin() || this.#checkTie()) return;
        this.#nextTurn();
        if (this.#gameMode === 1) {
            let {col, row} = aiMove(this.board, this.#turn);
            if (!this.board.play(col, row, this.#turn, true)) return;
            if (this.#checkWin() || this.#checkTie()) return;
            this.#nextTurn();
        } else if(this.#gameMode === 3){
            // network mode to be implemented
        }
    }
    /**
     * Sets the game mode.
     * @param {number} mode 
     */
    setGameMode(mode){
        this.#gameMode = mode;
    }
    /**
     * Change the player turn to the next turn.
     */
    #nextTurn(){
        this.#turn = (this.#turn + 1) % TURN_SYMBOLS.length;
    }
    /** Checks if game is in tie state */
    #checkTie() {
        if (this.board.checkTie()) {
            this.#endGame("XO - Tie!");
            return 1;
        }
        return 0;
    }
    /** Checks if one player has won */
    #checkWin() {
        let won = this.board.checkWinner();
        if (won != -1) {
            this.#endGame(TURN_SYMBOLS[won]+ " won!");
            return 1;
        }
        return 0;
    }
    /** Ends the game and starts a new one */
    #endGame(msg){
        setTimeout(()=>{
            alert(msg);
            this.reset();
        }, 40)
    }
    /**
     * Resets the current game state.
     */
    reset() {
        this.#turn = 0;
        clear();
        this.board.reset();
        drawBoard(this.board.tiles_per_line);
    }

}