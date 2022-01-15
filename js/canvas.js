import {canvas, TILE_H, TILE_W} from './consts.js';
const ctx = canvas.getContext("2d");
const PADDING = 15;
/** clears the whole canvas screen */
export function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
/** Draws board on canvas
 * @param {number} rows  the number of rows the board has
 */
export function drawBoard(rows) {
    ctx.beginPath();
    for (let x = 1; x < rows; x++) {
        ctx.moveTo(x * TILE_W, 0);
        ctx.lineTo(x * TILE_W, canvas.width);
        ctx.moveTo(0, x * TILE_H);
        ctx.lineTo(canvas.height, x * TILE_H);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#4E5C78";
        ctx.stroke();
    }
    ctx.closePath();
}
/** Draws a cross at specified position
 * @param {number} x x-position where cross is to drawn
 * @param {number} y y-position where cross is to drawn
 */
export function drawCross(x, y){
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.strokeStyle = "#F65058";
    ctx.moveTo(x - TILE_W / 2 + 1.5 * PADDING, y - TILE_H / 2 + 1.5 * PADDING);
    ctx.lineTo(x + TILE_W / 2 - 1.5 * PADDING, y + TILE_W / 2 - 1.5 * PADDING);
    ctx.moveTo(x + TILE_W / 2 - 1.5 * PADDING, y - TILE_H / 2 + 1.5 * PADDING);
    ctx.lineTo(x - TILE_W / 2 + 1.5 * PADDING, y + TILE_W / 2 - 1.5 * PADDING);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
}
/** Draws a circle at specified position
 * @param {number} x x-position where circle is to drawn
 * @param {number} y y-position where circle is to drawn
 */
export function drawCircle(x, y){
    ctx.beginPath();
    ctx.arc(x, y, (TILE_W + TILE_H) / 4 - PADDING - 4, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#FBDE44";
    ctx.stroke();
    ctx.closePath();
}