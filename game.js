import { Player } from "./model/player.js";
import { Enemy } from "./model/enemy/enemy.js";
import { EnemySpawner } from "./model/enemy/enemy-spawner.js";
import { Camera } from "./model/camera.js";
import { World } from "./model/world.js";
import { Bomb } from "./model/weapon/bomb.js";
import { AssetHandler } from './assets.js';
import { EntityUtil } from "./model/entity.js";
import { UIHandler } from "./ui/ui-handler.js";
import { ParticleHandler } from "./model/partical/particle-handler.js";
import { StateHandler } from "./model/state/state-handler.js";
import { UpgradeHandler } from "./model/upgrade/upgrade-handler.js";

class Game {

    constructor(width, height) {

        this.width = width;
        this.height = height;

        this.assetHandler = new AssetHandler();
        this.stateHandler = new StateHandler(this);
        this.upgradeHandler = new UpgradeHandler(this);
        
        this.entityList = {};
        
        this.particleHandler = new ParticleHandler();
        
        this.player = new Player(500, 500, 100, this);
        
        this.uiHandler = new UIHandler(width, height, this);
        this.uiHandler.setupInGameUI();

        
        this.inventory = [
            new Bomb(360, this.entityList, this.assetHandler, this.particleHandler),
        ];


        this.world = new World(this);
        this.camera = new Camera(this.player.x, this.player.y, width, height, this);
        EntityUtil.addToEntityList(this.player, this.entityList);
        /*
        EntityUtil.addToEntityList(new Enemy(100, 100, 1, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(200, 100, 1, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(200, 300, 1, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(250, 300, 1, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(350, 300, 1, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(450, 300, 1, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(550, 300, 1, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(650, 300, 100, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(750, 300, 100, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(850, 300, 100, this), this.entityList);
        EntityUtil.addToEntityList(new Enemy(950, 300, 100, this), this.entityList);
        */

        this.enemySpawner = new EnemySpawner(this);
    }


    update(input) {

        switch(this.stateHandler.currentState) {
            case this.stateHandler.states.game:
                this.uiHandler.update(input.mouseX, input.mouseY, input.click);

                this.player.update(input);
                this.enemySpawner.update();

                this.inventory.forEach((weapon) => {
                    weapon.update(this.player);
                });
            
                Object.values(this.entityList).forEach(entity => {
                    if(entity !== this.player) {
                        entity.update(this.player, this.entityList);
                    }
                });
                this.camera.follow(this.player);
                break;
            
            case this.stateHandler.states.upgrade:
                this.uiHandler.update(input.mouseX, input.mouseY, input.click);
                break;
            case this.stateHandler.states.chestUpgrade:
                this.uiHandler.update(input.mouseX, input.mouseY, input.click);
                break;
            default:
        }



    }

    render(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);

        this.world.render(ctx, this.camera);
    
        Object.values(this.entityList).forEach(entity => {
            entity.render(ctx, this.camera);
        });
    
        this.particleHandler.update_and_render(ctx, this.camera)
    
        this.uiHandler.render(ctx);
    }

    async load() {
        // loading...
        await this.assetHandler.loadAllImages();
    }
}

export { Game };