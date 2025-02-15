import { Player } from "./model/player.js";
import { Enemy } from "./model/enemy.js";
import { Camera } from "./model/camera.js";
import { World } from "./model/world.js";
import { Bomb } from "./model/weapon/bomb.js";
import { AssetHandler } from './assets.js';
import { EntityUtil } from "./model/entity.js";
import { UIHandler } from "./ui/ui-handler.js";
import { ParticleHandler } from "./model/partical/particle-handler.js"

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const assetHandler = new AssetHandler();

const uiHandler = new UIHandler(canvas.width, canvas.height);
uiHandler.setupInGameUI();

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
    //new Bomb(360, entityList, assetHandler),
];


const world = new World();

const particleHandler = new ParticleHandler();

const player = new Player(500, 500, 100, assetHandler, particleHandler);
const camera = new Camera(player.x, player.y, canvas.width, canvas.height);

EntityUtil.addToEntityList(player, entityList);
EntityUtil.addToEntityList(new Enemy(100, 100, 100, assetHandler), entityList);
/*
EntityUtil.addToEntityList(new Enemy(200, 100, 100, assetHandler), entityList);
EntityUtil.addToEntityList(new Enemy(200, 300, 100, assetHandler), entityList);
EntityUtil.addToEntityList(new Enemy(250, 300, 100, assetHandler), entityList);
EntityUtil.addToEntityList(new Enemy(350, 300, 100, assetHandler), entityList);
EntityUtil.addToEntityList(new Enemy(450, 300, 100, assetHandler), entityList);
EntityUtil.addToEntityList(new Enemy(550, 300, 100, assetHandler), entityList);
EntityUtil.addToEntityList(new Enemy(650, 300, 100, assetHandler), entityList);
EntityUtil.addToEntityList(new Enemy(750, 300, 100, assetHandler), entityList);
EntityUtil.addToEntityList(new Enemy(850, 300, 100, assetHandler), entityList);
EntityUtil.addToEntityList(new Enemy(950, 300, 100, assetHandler), entityList);
*/


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    uiHandler.update(0, 0, false); // TODO

    player.update(input, entityList);

    inventory.forEach((weapon) => {
        weapon.update(player);
    });

    Object.values(entityList).forEach(entity => {
        entity.update(player, entityList);
    });

    camera.follow(player);




    world.render(ctx, camera);
    player.render(ctx, camera);

    Object.values(entityList).forEach(entity => {
        entity.render(ctx, camera);
    });

    particleHandler.update_and_render(ctx, camera)

    uiHandler.render(ctx);

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