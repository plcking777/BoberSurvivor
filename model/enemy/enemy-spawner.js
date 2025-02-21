import { Enemy } from "./enemy.js";
import { EntityUtil } from "../entity.js";

class EnemySpawner {
    

    constructor(game) {
        this.game = game;
        this.enemySpawnCount = 5;
        this.spawnFrameCounter = 0;
        this.TriggerSpawnFrameCount = 60 * 5;

    }

    update() {
        this.spawnFrameCounter++;
        if (this.spawnFrameCounter >= this.TriggerSpawnFrameCount) {
            this.spawnEnemies();
            this.spawnFrameCounter = 0;
            this.TriggerSpawnFrameCount = Math.floor(1.2 * this.TriggerSpawnFrameCount);
        }
    }

    /**
     * Method makes sure to spawn enemies outside the camera view
     */
    spawnEnemies() {
        
        const random = (min, max) => {
            return Math.random() * (max - min) + min;
        }

        // furthest
        const size = Math.sqrt((this.game.camera.width)**2 + (this.game.camera.height)**2) / 2;

        const minDistance = size + 64;
        const maxDistance = minDistance + 100;
        
        for (let i = 0; i < this.enemySpawnCount; i++) {

            const angle = random(0, 360);

            const x = this.game.player.x + (((maxDistance - minDistance) * Math.random() + minDistance) * Math.cos(angle));
            const y = this.game.player.y + (((maxDistance - minDistance) * Math.random() + minDistance) * Math.sin(angle));
            
            EntityUtil.addToEntityList(new Enemy(x, y, 1, this.game), this.game.entityList);
        }

        this.spawnIcrease();
    }

    spawnIcrease() {
        this.enemySpawnCount *= 2;
    }


}

export { EnemySpawner };