import { PLAYFIELD_COLUMNS } from "./script.js";

export const grid = document.getElementById('field');

export const cellsColor = ['red-cell', 'blue-cell', 'green-cell', 'yellow-cell'];

export function convertPositionToIndex(row, col){
    return row * PLAYFIELD_COLUMNS + col;
}

export function getRandomColor(){
    return cellsColor[Math.floor(Math.random() * cellsColor.length)]
}
