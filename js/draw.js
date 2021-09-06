
import { TILE_W, TILE_H, TILES_PER_LINE, canvas, CANVAS_W, CANVAS_H, PADDING } from "./consts.js";
const ctx = canvas.getContext("2d");
export function drawBoard() {
    for (let x = 1; x < TILES_PER_LINE; x++) {
        ctx.beginPath();
        ctx.moveTo(x * TILE_W, 0);
        ctx.lineTo(x * TILE_W, CANVAS_W);
        ctx.moveTo(0, x * TILE_H);
        ctx.lineTo(CANVAS_H, x * TILE_H);
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
    }
}
export function updateBoard(b) {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    drawBoard();
    b.board.forEach((symbol, i) => {
        let row = i / TILES_PER_LINE | 0;
        let col = i % TILES_PER_LINE;
        let x = col * TILE_W + TILE_H / 2;
        let y = row * TILE_H + TILE_W / 2;
        if (symbol == "O") {
            _drawCircle(x, y);
        } else if (symbol == "X") {
            _drawCross(x, y);
        }
    })
}

function _drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, (TILE_W + TILE_H) / 4 - PADDING - 4, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
}

function _drawCross(x, y) {
    ctx.beginPath();
    ctx.moveTo(x - TILE_W / 2 + 1.5 * PADDING, y - TILE_H / 2 + 1.5 * PADDING);
    ctx.lineTo(x + TILE_W / 2 - 1.5 * PADDING, y + TILE_W / 2 - 1.5 * PADDING);
    ctx.moveTo(x + TILE_W / 2 - 1.5 * PADDING, y - TILE_H / 2 + 1.5 * PADDING);
    ctx.lineTo(x - TILE_W / 2 + 1.5 * PADDING, y + TILE_W / 2 - 1.5 * PADDING);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
}