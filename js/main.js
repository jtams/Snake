app = () => {
    canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = document.querySelector("canvas").getContext("2d");
    window.requestAnimationFrame(frame);
    (now = 0), (dt = 0);
    last = timestamp();
    step = 1 / 9; //Speed
};

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function frame() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while (dt > step) {
        dt = dt - step;
        update(step);
    }
    render(dt);
    last = now;
    requestAnimationFrame(frame);
}

class Snake {
    constructor(size) {
        this.size = size;
        this.speed = size;
        this.segments = [];
        this.segments.push({ x: 0, y: 0, i: 0 }); //Head
        this.direction = 1; //0: up, 1: right, 2: down, 3: left
        this.ate = false;
        this.playing = true;
    }

    addSegment() {
        let s = Object.assign({}, this.segments[this.segments.length - 1]);
        s.i += 1;
        this.segments.push(s);
        this.ate = true;
        return this.ate;
    }

    move(x, y) {
        let a;
        this.ate ? (a = 1) : (a = 0);
        for (let j = this.segments.length - 1 - a; j >= 1; j--) {
            this.segments[j].x = this.segments[j - 1].x;
            this.segments[j].y = this.segments[j - 1].y;
        }
        this.segments[0].x += x;
        this.segments[0].y += y;
        this.ate = false;
    }
}

function createFood() {
    let w = Math.floor(window.innerWidth / snake.size);
    let h = Math.floor(window.innerHeight / snake.size);
    food.x = Math.floor(Math.random() * Math.floor(w));
    food.x *= snake.size;
    food.y = Math.floor(Math.random() * Math.floor(h));
    food.y *= snake.size;
    console.log(food.x, food.y);
}

function endGame() {
    snake = new Snake(Math.floor((window.innerWidth * window.innerHeight) / 30000));
    snake.addSegment();
    snake.addSegment();
    snake.addSegment();
    snake.addSegment();
    createFood();
}

snake = new Snake(Math.floor((window.innerWidth * window.innerHeight) / 30000));
snake.addSegment();
snake.addSegment();
snake.addSegment();
snake.addSegment();
let food = {};
createFood();

function render() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "white";
    for (x = 0; x < snake.segments.length; x++) {
        ctx.fillRect(snake.segments[x].x, snake.segments[x].y, snake.size, snake.size);
    }
    ctx.fillStyle = "lime";
    ctx.fillRect(food.x, food.y, snake.size, snake.size);
}

function update() {
    if (snake.playing) {
        switch (snake.direction) {
            case 0:
                snake.move(0, -snake.speed);
                break;
            case 1:
                snake.move(snake.speed, 0);
                break;
            case 2:
                snake.move(0, snake.speed);
                break;
            case 3:
                snake.move(-snake.speed, 0);
                break;
        }
        for (let j = snake.segments.length - 1; j > 3; j--) {
            if (snake.segments[j].x == snake.segments[0].x && snake.segments[j].y == snake.segments[0].y) {
                endGame();
            }
        }
        if (snake.segments[0].x > window.innerWidth - snake.size) {
            //X
            endGame();
        } else if (snake.segments[0].x < 0) {
            endGame();
        }

        if (snake.segments[0].y > window.innerHeight - snake.size) {
            //Y
            endGame();
        } else if (snake.segments[0].y < 0) {
            endGame();
        }

        if (snake.segments[0].x == food.x && snake.segments[0].y == food.y) {
            createFood();
            snake.addSegment();
            console.log("Ate food");
        }
    }
}

document.addEventListener("keydown", (e) => {
    key = e.key;
    if (key == "w" || key == "ArrowUp") {
        snake.direction = 0;
    } else if (key == "a" || key == "ArrowLeft") {
        snake.direction = 3;
    } else if (key == "s" || key == "ArrowDown") {
        snake.direction = 2;
    } else if (key == "d" || key == "ArrowRight") {
        snake.direction = 1;
    }
});

window.addEventListener(
    "resize",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },
    false
);

//scale screen size ✔
//create movement ✔
//create food ✔
//create snake segment extension: Tail appends in previous tails location ✔
//lose ✔ kind of
