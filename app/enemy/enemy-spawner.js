import { Enemy } from "./enemy.js";
import { EntityUtil } from "../entity.js";
import { Boss } from "./boss.js";

class EnemySpawner {

    MAX_SPAWN_COUNT = 100;
    

    constructor(game) {
        this.game = game;
        this.enemySpawnCount = 4; 
        this.spawnFrameCounter = Number.POSITIVE_INFINITY;// to instantly spawn enemies
        this.triggerSpawnFrameCount = 60 * 12;
        this.bossSpawnChance = 0.05;
        this.enemeyHealthBase = 5;
    }

    update() {
        this.spawnFrameCounter++;
        if (this.spawnFrameCounter >= this.triggerSpawnFrameCount) {
            this.spawnEnemies();
            this.spawnFrameCounter = 0;
            //this.triggerSpawnFrameCount = Math.floor(1.4 * this.triggerSpawnFrameCount);
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

            const x = this.game.camera.x + (((maxDistance - minDistance) * Math.random() + minDistance) * Math.cos(angle));
            const y = this.game.camera.y + (((maxDistance - minDistance) * Math.random() + minDistance) * Math.sin(angle));
        
            if (Math.random() <= this.bossSpawnChance) {
                EntityUtil.addToEntityList(new Boss(x, y, this.enemeyHealthBase * 1.5, this.game), this.game.entityList);
            } else {
                EntityUtil.addToEntityList(new Enemy(x, y, this.enemeyHealthBase, this.game), this.game.entityList);
            }
        }

        this.spawnIcrease();
    }

    spawnIcrease() {
        this.enemySpawnCount *= 1.6;
        if (this.enemySpawnCount > this.MAX_SPAWN_COUNT) {
            this.enemySpawnCount = this.MAX_SPAWN_COUNT;
            this.enemeyHealthBase *= 1.5;
        }
    }

}

export { EnemySpawner };