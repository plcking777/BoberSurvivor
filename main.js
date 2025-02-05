import { Player } from "./model/player.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


function gameLoop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

requestAnimationFrame(gameLoop);
}

gameLoop();


const player = new Player(0, 0, 0);