import { Player } from "./model/player.js";
import { Enemy } from "./model/enemy.js";
import { Camera } from "./model/camera.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");



const input = {
    left: false,
    right: false,
    up: false,
    down: false,
}


const player = new Player(100, 100, 100)
const camera = new Camera(player.x, player.y, canvas.width, canvas.height);
const enemy = new Enemy(100, 100, 100)


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    player.update(input);
    enemy.update(player);
    camera.follow(player);


    player.render(ctx, camera);
    enemy.render(ctx, camera);


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
    }
});