import { _height, _width, cols, dir, rows, s, setDir, snake } from "./main.js";

export let food = null;

export function setFood(value) {
    food = value;
}

export function chooseNext() {
    let cx = snake[0].x;
    let cy = snake[0].y;
    let nx, ny;

    switch (dir) {
        case 0:
            ny = cy - 1 < 0 ? rows - 1:cy - 1;
            nx = cx;
            break;
        case 1:
            ny = cy;
            nx = cx + 1 > cols - 1 ? 0:cx + 1;
            break;
        case 2:
            ny = cy + 1 > rows - 1 ? 0:cy + 1;
            nx = cx;
            break;
        case 3:
            ny = cy;
            nx = cx - 1 < 0 ? cols - 1:cx - 1;
            break;
    }

    for (let i = 0; i < snake.length; i++) {
        if(snake[i].x === nx && snake[i].y === ny) setDir("dead");
    }
    snake.unshift({x: nx, y: ny});
}

export function displaySnake(p) {
    for (let i = 0; i < snake.length; i++) {
        if(!i) p.fill(100, 255, 100);
        else p.fill(50, 50, 255);
        p.noStroke();
        p.rect(snake[i].x * s, snake[i].y * s, s);
    }
}

export function displayFood(p) {
    p.fill(150, 0, 0);
    p.rect(food.x * s, food.y * s, s);
}

export function eat() {
    if(snake[0].x === food.x && snake[0].y === food.y) food = spawnFood();
    else snake.pop();
}

export function spawnFood() {
    let indices = (() => {
        let a = (() => {
            let b = [];
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    b.push({x: i, y: j});
                }
            }
            return b;
        })();
        for (let i = a.length - 1; i >= 0; i--) {
            for (let j = 0; j < snake.length; j++) {
                if(snake[j].x === a[i].x && snake[j].y === a[i].y) a.splice(i, 1);
            }
        }
        return a;
    })();
    let r = Math.floor(Math.random() * indices.length);
    return indices[r];
}

export function gameover(p) {
    p.push();
    p.background(0);
    p.fill(255);
    p.textSize(_width / 10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("U r DEAD!!! 💀", _width / 2, _height / 2);
    p.text(`Ur score: ${snake.length - 1}`, _width / 2, _height / 1.5);
    p.pop();
}