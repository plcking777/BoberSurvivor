import { Player } from "./app/player.js";
import { Enemy } from "./app/enemy/enemy.js";
import { EnemySpawner } from "./app/enemy/enemy-spawner.js";
import { Camera } from "./app/camera.js";
import { World } from "./app/world.js";
import { Bomb } from "./app/weapon/bomb.js";
import { AssetHandler } from './assets.js';
import { EntityUtil } from "./app/entity.js";
import { UIHandler } from "./ui/ui-handler.js";
import { ParticleHandler } from "./app/partical/particle-handler.js";
import { StateHandler } from "./app/state/state-handler.js";
import { UpgradeHandler } from "./app/upgrade/upgrade-handler.js";
import { Knife } from "./app/weapon/knife.js";
import { WoodLog } from "./app/weapon/woodlog.js";
import { Stick } from "./app/weapon/stick.js";

class Game {

    MAX_INVENTORY_ITEMS = 10;
    constructor(width, height) {

        this.width = width;
        this.height = height;
        
        this.assetHandler = new AssetHandler();
        this.stateHandler = new StateHandler(this);
        this.upgradeHandler = new UpgradeHandler(this);
        this.particleHandler = new ParticleHandler();
        this.uiHandler = new UIHandler(this.width, this.height, this);

        this.setup();
    }


    
    setup() {
        
        this.entityList = {};
        
        
        this.player = new Player(500, 500, 100, this);

        this.stateHandler.switchState(this.stateHandler.states.game);
        this.uiHandler.setupInGameUI();

        this.world = new World(this);
        this.camera = new Camera(this.player.x, this.player.y, this.width, this.height, this);
        EntityUtil.addToEntityList(this.player, this.entityList);


        this.enemySpawner = new EnemySpawner(this);

        
        // reset default upgrades
        Bomb.initDefaultUpgradables();
        Knife.initDefaultUpgradables();
        Stick.initDefaultUpgradables();
        WoodLog.initDefaultUpgradables();


        this.inventory = [
            new Bomb(this),
        ];
        this.stateBeforePause = undefined;

        // inputs
        this.escapePrevious = false;
    }


    update(input) {

        // check for pause menu
        if (!this.escapePrevious && input.escape) {
            if (this.stateHandler.currentState === this.stateHandler.states.pause) {
                this.stateHandler.switchState(this.stateBeforePause);
            } else {
                this.stateBeforePause = this.stateHandler.currentState;
                this.stateHandler.switchState(this.stateHandler.states.pause);
            }
        }
        this.escapePrevious = input.escape;
        
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
            case this.stateHandler.states.chestUpgrade:
            case this.stateHandler.states.dead:
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