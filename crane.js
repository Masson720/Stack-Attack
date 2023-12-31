import { PLAYFIELD_COLUMNS, matrix, GAME_SPEED } from "./script.js";


export class Crane{
    constructor(x, y, matrix, direction){
        this.x = x;
        this.y = y;
        this.playfield = matrix.playfield;
        this.direction = direction;
        this.crane = null;
        this.cell = this.playfield[y][x];
        this.initCrane();
    }

    initCrane(){
        this.cell.addBox();
        this.crane = setInterval(()=> {
            this.moveRight();
        }, 600);
    }

    moveRight(){
        if(Math.floor(Math.random() * PLAYFIELD_COLUMNS / 2) === 8 || this.x >= PLAYFIELD_COLUMNS - 1 && this.playfield[this.y + 1][this.x] !== 1){
            console.log(this.playfield[this.y + 1][this.x] !== 1);
            clearInterval(this.crane);
            this.dropBox();
        }else{
            this.playfield[this.y][this.x+1].takeBox('right', this.playfield[this.y][this.x].giveBox());
            this.x += 1;
        }
    }

    dropBox(){
        this.playfield[this.y][this.x].checkGround(this.playfield);
    }
}