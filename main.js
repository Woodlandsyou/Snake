import { chooseNext, displayFood, displaySnake, eat, gameover, setFood, spawnFood } from "./functions.js";

export const _width = 500, _height = 500;
export const cols = 20, s = _width / cols, rows = _height / s;
export let snake = [{x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)}]
export let dir = Math.floor(Math.random() * 4), inputBuffer = [];
setFood(spawnFood());

window.setDir = setDir;

const game = p => {
    p.setup = () => {
        p.frameRate(7);
        p.createCanvas(_width, _height);
    }
    
    p.draw = () => {
        if(dir !== "dead") {
            p.background(200);
            displayFood(p);
            displaySnake(p);
            chooseNext();
            eat();
            if(inputBuffer.length) setDir();
        } else {
            gameover(p);
        }
    }

    p.keyReleased = () => {
        if(inputBuffer.length < 3) {
            switch (p.keyCode) {
                case 38:
                    inputBuffer.push(0);
                    break;
                case 39:
                    inputBuffer.push(1);
                    break;
                case 40:
                    inputBuffer.push(2);
                    break;
                case 37:
                    inputBuffer.push(3);
                    break;
            }
        }
    }
}

export function setDir(value) {
    if(!value) {
        if(inputBuffer[0] === (dir + 2) % 4) inputBuffer.shift();
        else dir = inputBuffer.shift();
    } else if(value === "dead") dir = value;
}

const instance = new p5(game);