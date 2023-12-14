import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, isGameOver} from './script.js';

export class Player{
    constructor(){
        this.x;
        this.y;
        this.matrix;

        this.animate = ['stay', 'hit', 'jump', 'strike', 'walk'];
        this.state = "./img/stay.png";
        this.player = document.createElement('img');
        this.player.src = this.state;
        this.player.classList.add('player');
    }

    initPlayer(x, y, matrix){
        this.matrix = matrix;
        this.x = x;
        this.y = y;
        matrix[this.y][this.x].cell.append(this.player);
        matrix[this.y][this.x].state = 2;
    }

    setStatePlayer(state){
        this.player.className = 'player';
        switch(state){
            case 'jump':
                this.setAminationPlayer('jump');
                this.player.classList.add('up');
                break;
            case 'left':
                this.player.classList.add('left');
                this.setAminationPlayer('walk3');
                setTimeout(() => this.setAminationPlayer('walk2'), 100);
                setTimeout(() => this.setAminationPlayer('walk1'), 70);
                break;
            case 'right':
                this.player.classList.add('right');
                this.setAminationPlayer('walkRight3');
                setTimeout(() => this.setAminationPlayer('walkRight2'), 100);
                setTimeout(() => this.setAminationPlayer('walkRight1'), 70);
                break;
            case 'down':
                this.player.classList.add('down');
                break;
            default:
                break;
        }
        setTimeout(() => this.player.className = 'player', 300);
        setTimeout(()=> {this.player.src = './img/stay.png'}, 500);
    }

    setStateOnCell(y, x){
        this.matrix[this.y][this.x].state = 0;
        this.x = x;
        this.y = y;
        this.matrix[this.y][this.x].state = 2;
    }

    strikeBox(){
        for(let i = 1; i <= 2; i++){
            if(this.matrix[this.y - i][this.x].state){
                this.matrix[this.y - i + 1][this.x].smashBox();
            }
        }
    }

    hitPlayer(){
        this.player.classList.add('hitPlayer');
        this.player.src = './img/hit.png';
    }

    setAminationPlayer(state){
        this.player.src = `./img/${state}.png`;
    }

    movePlayer(){
        this.matrix[this.y][this.x].cell.append(this.player);
    }

    jump(){
        if(!isGameOver){
            this.setStateOnCell(this.y - 1, this.x);
            this.strikeBox();
            this.setStatePlayer('jump');
            this.movePlayer();
            setTimeout(()=> this.checkGround(), 300);
        }
    }

    checkGround(){
        if(this.y < PLAYFIELD_ROWS-1 && this.matrix[this.y+ 1][this.x].state !== 1){
            this.setStateOnCell(this.y + 1, this.x);
            this.movePlayer();
            this.setStatePlayer('down');
            this.checkGround();
        }
    }

    moveLeft(){
        if(this.x > 0 && this.matrix[this.y][this.x-1].state !== 1 && this.matrix[this.y-1][this.x-1].state !== 1 && !isGameOver){
            this.setStateOnCell(this.y, this.x - 1);
            this.setStatePlayer('left');
            this.movePlayer();
            this.checkGround();
        }else if(this.x > 1 && this.matrix[this.y][this.x-1].state === 1 && 
            this.matrix[this.y][this.x-2].state !== 1 && 
            this.matrix[this.y-1][this.x-1].state !== 1 &&
            !isGameOver
            ){
            this.setStateOnCell(this.y, this.x - 1);
            this.setStatePlayer('left');
            this.matrix[this.y][this.x-1].takeBox('left', this.matrix[this.y][this.x].giveBox());
            this.matrix[this.y][this.x-1].checkGround(this.matrix, false);
            this.movePlayer();
            this.checkGround();
        }
    }

    moveRight(){
        if(this.x < PLAYFIELD_COLUMNS - 1 && this.matrix[this.y][this.x+1].state !== 1 && this.matrix[this.y-1][this.x+1].state !== 1 && !isGameOver){
            this.setStateOnCell(this.y, this.x + 1);
            this.setStatePlayer('right');
            this.movePlayer();
            this.checkGround();
        }else if(this.x < PLAYFIELD_COLUMNS - 2 && 
            this.matrix[this.y][this.x+1].state === 1 && 
            this.matrix[this.y][this.x+2].state !== 1 && 
            this.matrix[this.y-1][this.x+1].state !== 1 &&
            !isGameOver
            ){
            this.setStateOnCell(this.y, this.x + 1);
            this.setStatePlayer('right');
            this.matrix[this.y][this.x+1].takeBox('right', this.matrix[this.y][this.x].giveBox());
            this.matrix[this.y][this.x+1].checkGround(this.matrix, false);
            this.movePlayer();
            this.checkGround();
        }
    }
}