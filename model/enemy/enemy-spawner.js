import { Enemy } from "./enemy.js";
import { EntityUtil } from "../entity.js";

class EnemySpawner {
    
    constructor(game) {
        this.game = game;
    }

    /**
     * Method makes sure to spawn enemies outside the camera view
     * @param {number} n - amount of enemies
     */
    spawnEnemies(n) {
        
        const random = (min, max) => {
            return Math.random() * (max - min) + min;
        }

        const centerX = this.game.camera.x + this.game.camera.width / 2;
        const centerY = this.game.camera.y + this.game.camera.height / 2;

        // furthest
        const size = Math.sqrt((this.game.camera.width)**2 + (this.game.camera.height)**2) / 2;

        const minDistance = size + 64;
        const maxDistance = minDistance + 100;
        
        for (let i = 0; i < n; i++) {

            const angle = random(0, 360);

            const x = centerX + (((maxDistance - minDistance) * Math.random() + minDistance) * Math.cos(angle));
            const y = centerY + (((maxDistance - minDistance) * Math.random() + minDistance) * Math.sin(angle));

            EntityUtil.addToEntityList(new Enemy(x, y, 1, this.game), this.game.entityList);
        }
    }


}

export { EnemySpawner };