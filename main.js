import { Player } from "./model/player.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");



const input = {
    left: false,
    right: false,
    up: false,
    down: false,
}



const player = new Player(100, 100, 100)


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    player.update(input);



    player.render(ctx);

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