import {getRandomColor} from './utilites.js';
import { PLAYFIELD_ROWS, matrix, gameOver, increaseScore } from './script.js';

export class Cell{
    constructor(x, y, state){
        this.cell = document.createElement('div');
        this.state = state;
        this.box;
        this.drop;
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
        switch(direction){
            case 'right':
                this.box.classList.remove('left');
                this.box.classList.add('right');
                break;
            case 'left':
                this.box.classList.remove('right');
                this.box.classList.add('left');
                break;
            case 'down':
                this.box.classList.remove('right');
                this.box.classList.remove('left');
                this.box.classList.add('down');
            case 'default':
                this.box.classList.remove('right');
                this.box.classList.remove('left');
                this.box.classList.remove('down');        
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
        this.state = 1;
        this.animate(direction);
    }

    checkGround(playfield, crane, drop){
        if(this.y < PLAYFIELD_ROWS - 1 && playfield[this.y + 1][this.x].state !== 1 || drop){
            this.animate('default');
            setTimeout(() => {
                playfield[this.y + 1][this.x].takeBox('down', playfield[this.y][this.x].giveBox());
                playfield[this.y + 1][this.x].checkGround(playfield, crane);
            }, 100);
            if(playfield[this.y + 1][this.x].state === 2){
                gameOver();
            }
        }else{
            this.stopDrop(playfield, crane);
        }
    }

    stopDrop(playfield, crane){
        if(this.y >= PLAYFIELD_ROWS - 1 || playfield[this.y + 1][this.x].state === 1){
            this.animate('default');
            if(crane){
                matrix.generateCrane();
            }
        }
    }

    blowUp(){
        increaseScore();
        this.giveBox();
    }
}