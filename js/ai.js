import { TURN_SYMBOLS} from "./consts.js"

var player, ai;
export function aiMove(b, turn) {
    let best = -Infinity;
    let move = {};
    ai = turn;
    player = (turn + 1) % TURN_SYMBOLS.length;
    for (let i = 0; i < b.board.length; i++) {
        if (TURN_SYMBOLS.indexOf(b.board[i]) == -1) {
            let _b = b.copy();
            let col = i % b.tiles_per_line;
            let row = i / b.tiles_per_line | 0;
            _b.play(col, row, turn);
            let score = _minimax(_b, -Infinity, Infinity, false);
            if (score > best) {
                move = { col, row };
                best = score;
            }
        }
    }
    return move;
}

function _minimax(b, alpha, beta, isMaximzing) {
    let win = b.checkWinner();
    let bestScore;
    if (win === ai) {
        return 1;
    } else if (win === player) {
        return -1;
    } else if (b.checkTie()) {
        return 0;
    }
    if (isMaximzing) {
        bestScore = -Infinity;
        for (let i = 0; i < b.board.length; i++) {
            if (TURN_SYMBOLS.indexOf(b.board[i]) == -1) {
                let _b = b.copy();
                let col = i % b.tiles_per_line;
                let row = i / b.tiles_per_line | 0;
                _b.play(col, row, ai);
                let score = _minimax(_b, alpha, beta, false);
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break;
            }
        }
    } else {
        bestScore = Infinity;
        for (let i = 0; i < b.board.length; i++) {
            if (TURN_SYMBOLS.indexOf(b.board[i]) == -1) {
                let _b = b.copy();
                let col = i % b.tiles_per_line;
                let row = i / b.tiles_per_line | 0;
                _b.play(col, row, player);
                let score = _minimax(_b, alpha, beta, true);
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);
                if (beta <= alpha) break;
            }
        }
    }
    return bestScore;
}
