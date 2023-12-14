import {getRandomColor} from './utilites.js';
import { PLAYFIELD_ROWS, matrix, gameOver, increaseScore, GAME_SPEED } from './script.js';

export class Cell{
    constructor(x, y, state){
        this.cell = document.createElement('div');
        this.state = state;
        this.box;
        this.strike = false;
        this.x = x;
        this.y = y;
        this.initState();
    }

    initState(){
        if(this.state === 1){
            this.box = document.createElement('div');
            this.box.classList.add(getRandomColor(), 'cell');
            this.cell.append(this.box);
        }
    }

    addBox(){
        let box = document.createElement('div');
        const className = getRandomColor();
        box.classList.add(className, 'cell');
        this.box = box;
        this.state = 1;
        this.cell.append(this.box);
    }

    animate(direction){
        this.box.classList.remove('right');
        this.box.classList.remove('left');
        this.box.classList.remove('down');
        switch(direction){
            case 'right':
                this.box.classList.add('right');
                break;
            case 'left':
                this.box.classList.add('left');
                break;
            case 'down':
                this.box.classList.add('down');
                break;  
            default:
                break;
        }
    }

    giveBox(){
        this.state = 0;
        this.cell.innerHTML = '';
        return this.box;
    }

    takeBox(direction, box){
        this.box = box;
        this.cell.append(this.box);
        this.animate(direction);
        this.state = 1;
    }

    checkGround(playfield, drop){
        if(this.y < PLAYFIELD_ROWS - 1 && playfield[this.y + 1][this.x].state !== 1 && !this.strike || drop){
            setTimeout(() => {
                playfield[this.y + 1][this.x].takeBox('down', playfield[this.y][this.x].giveBox());
                playfield[this.y + 1][this.x].checkGround(playfield);
            }, GAME_SPEED);
            if(playfield[this.y + 1][this.x].state === 2){
                gameOver();
            }
        }if(this.strike){
            this.blowUp();
            this.strike = false;
        }
    }

    smashBox(){
        this.strike = true;
    }

    blowUp(){
        increaseScore();
        this.giveBox();
    }
}