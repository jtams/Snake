app = () => {
    canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = document.querySelector("canvas").getContext("2d");
    window.requestAnimationFrame(frame);
    (now = 0), (dt = 0);
    last = timestamp();
    step = 1 / 7; //Speed
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

snake = new Snake(20);

function render() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "white";
    for (x = 0; x < snake.segments.length; x++) {
        ctx.fillRect(snake.segments[x].x, snake.segments[x].y, snake.size, snake.size);
    }
}

function update() {
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

//scale screen size
//create movement ✔
//create food
//create snake segment extension: Tail appends in previous tails location ✔
//lose
//win
