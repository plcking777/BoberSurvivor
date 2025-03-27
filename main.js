import { Game } from "./game.js";



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


let input = {
    left: false,
    right: false,
    up: false,
    down: false,

    mouseX: 0,
    mouseY: 0,
    click: false,
}

const game = new Game(canvas.width, canvas.height);
await game.load();


const TPS = 1000 / 60;
let prevTime = performance.now();
let accTime = 0;

function gameLoop() {

    let now = performance.now();

    let dt = now - prevTime;
    accTime += dt;
    prevTime = now;
    while (accTime >= TPS) {
        game.update(input);
        accTime -= TPS;
    }

    game.render(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();




// Input

document.addEventListener('keydown', (event) => {

    switch (event.key) {
        case "ArrowLeft":
            input.left = true;
            break;
        case "ArrowRight":
            input.right = true;
            break;
        case "ArrowUp":
            input.up = true;
            break;
        case "ArrowDown":
            input.down = true;
            break;
        case "Escape":
            input.escape = true;
            break;
    }
});


document.addEventListener('keyup', (event) => {

    switch (event.key) {
        case "ArrowLeft":
            input.left = false;
            break;
        case "ArrowRight":
            input.right = false;
            break;
        case "ArrowUp":
            input.up = false;
            break;
        case "ArrowDown":
            input.down = false;
            break;
        case "Escape":
            input.escape = false;
            break;
    }
});


canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    input.mouseX = Math.floor((event.clientX - rect.left) * scaleX);
    input.mouseY = Math.floor((event.clientY - rect.top) * scaleY);
});

canvas.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
        input.click = true;
    }
});

canvas.addEventListener("mouseup", (event) => {
    if (event.button === 0) {
        input.click = false;
    }
});