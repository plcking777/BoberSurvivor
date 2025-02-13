import { Player } from "./model/player.js";
import { Enemy } from "./model/enemy.js";
import { Camera } from "./model/camera.js";
import { World } from "./model/world.js";
import { Bomb } from "./model/weapon/bomb.js";
import { AssetHandler } from './assets.js';
import { EntityUtil } from "./model/entity.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const assetHandler = new AssetHandler();

// loading...
await assetHandler.loadAllImages();

const input = {
    left: false,
    right: false,
    up: false,
    down: false,
}



let entityList = {};



let inventory = [
    //new Bomb(120, entityList, assetHandler),
];


const world = new World();

const player = new Player(100, 100, 100, assetHandler);
const camera = new Camera(player.x, player.y, canvas.width, canvas.height);

EntityUtil.addToEntityList(new Enemy(100, 100, 100, assetHandler), entityList);


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    player.update(input, entityList);

    inventory.forEach((weapon) => {
        weapon.update(player);
    });

    Object.values(entityList).forEach(entity => {
        entity.update(player);
    });


    camera.follow(player);




    world.render(ctx, camera);
    player.render(ctx, camera);

    Object.values(entityList).forEach(entity => {
        entity.render(ctx, camera);
    });


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