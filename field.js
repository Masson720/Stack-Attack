import { PLAYFIELD_ROWS, PLAYFIELD_COLUMNS, isGameOver } from "./script.js";
import { Cell } from './cell.js';
import { Crane } from './crane.js';
import {player} from './script.js'

export class Field{
    constructor(){
        this.playfield = [];
        this.crane;

        setInterval(() => {
            this.checkFullRow();
        }, 50)
    }
    
    generateInitState(){
        for(let i = 0; i < PLAYFIELD_ROWS; i++){
            this.playfield.push(new Array());
            for(let j = 0; j < PLAYFIELD_COLUMNS; j++){
                this.playfield[i].push(new Cell(j, i, 0));
            }
        }
        this.playfield[8] = this.playfield[8].map(el => {
            return new Cell(el.x, 8, Math.floor(Math.random() * 2));
        });
        this.generateCrane();
        setInterval(()=> {
            this.generateCrane();
        }, 4000);
    }

    generateCrane(){
        if(!isGameOver){
            setTimeout(()=> {
                this.crane = new Crane(0, 0, this, null);
            }, 100);
        }
    }


    checkFullRow(){
        let res = true;
        this.playfield[PLAYFIELD_ROWS - 1].forEach(element => {
            if(element.state === 0 || element.state === 2){
                res = false;
            }
        });
        if(res){
            let playfield = this.playfield;
            playfield[PLAYFIELD_ROWS - 1].forEach(element => {
                element.blowUp();
                player.checkGround();
            });
            for(let y = PLAYFIELD_ROWS - 2; y > 0; y--){
                    playfield[y].forEach(element => {
                        if(element.state === 1){
                                element.checkGround(playfield, true);
                        }
                    })
            }
        }
    }
}