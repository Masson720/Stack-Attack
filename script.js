import {Player} from './player.js';
import { Field } from './field.js';
import { grid } from './utilites.js';

export const PLAYFIELD_COLUMNS = 20;
export const PLAYFIELD_ROWS = 9;

const scoreBoard = document.getElementById('score')

export const matrix = new Field();
export const player = new Player();

export let isGameOver = false;
let stopTaping = false;

let score = 0;

function init(){
    initKeydown();
    matrix.generateInitState();
    initField();
    initPlayer();
}


function initField(){
    matrix.playfield.forEach(array => {
        array.forEach(element => {
            grid.append(element.cell);
        })
    });
}

function initKeydown(){
    document.addEventListener('keydown', onKeydown);
}

function initPlayer(){
    const col = Math.floor(Math.random() * PLAYFIELD_COLUMNS);
    const playfield = matrix.playfield;

    for(let row = PLAYFIELD_ROWS - 1; row >= 0; row--){
        if(playfield[row][col].state === 1){
            continue;
        }else{
            player.initPlayer(col, row, playfield);
            break;
        }
    }
}

function onKeydown(event){
    if(!stopTaping){
        switch(event.code){
            case 'KeyW':
                player.jump();
                break;
            case 'KeyA':
                player.moveLeft();
                break;
            case 'KeyD':
                player.moveRight();
                break;
            default:
                break;
        }
        stopTaping = true;
        setTimeout(() => {
            stopTaping = false
        }, 100);
    }
}

export function gameOver(){
    isGameOver = true;
}

export function increaseScore(){
    score += 50;
    scoreBoard.innerHTML = `Score: ${score}`;
}

init();