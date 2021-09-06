export const canvas = document.getElementById("canvas");
export var TILES_PER_LINE = 3;
export const TILE_W = 70;
export const TILE_H = 70;
export var CANVAS_W = canvas.width = TILES_PER_LINE*TILE_W;
export var CANVAS_H = canvas.height = TILES_PER_LINE*TILE_H;
export const TURN_SYMBOLS = ["X", "O"];
export const PADDING = 10;

export function resizeBoard(n){
    TILES_PER_LINE = n;
    CANVAS_W = canvas.width = TILES_PER_LINE*TILE_W;
    CANVAS_H = canvas.height = TILES_PER_LINE*TILE_H;
}