import { WeaponEntity } from "./weapon-entity.js";
import { EntityUtil } from './../../entity.js'
import { Enemy } from "../../enemy/enemy.js";
import { Bomb } from "../bomb.js";

class BombEntity extends WeaponEntity {

    ANIMATION_FRAMES = 4;
    ANIMATION_TIME = 25;

    EXPLODE_TIMER = 100;

    constructor(x, y, game) {
        super(x, y, 20, 20, game.entityList);

        this.assetHandler = game.assetHandler;
        this.particleHandler = game.particleHandler;
        this.frameCount = 0;
    }

    update() {
        this.frameCount++;
        if (this.frameCount >= this.EXPLODE_TIMER) {
            this.explode();
            EntityUtil.removeFromEntityList(this, this.entityList);
        }
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);
        const animationFrame = Math.max(parseInt(((this.frameCount - (this.EXPLODE_TIMER - this.ANIMATION_TIME)) / this.ANIMATION_TIME * this.ANIMATION_FRAMES) + 1), 1);
        ctx.drawImage(this.assetHandler.getImage(`bomb-f${animationFrame}`), relativePosition.x - 16, relativePosition.y - 16, 32, 32);
    }


    explode() {
        Object.values(this.entityList).forEach(entity => {
            if (entity instanceof Enemy) {
                const distance = Math.sqrt((entity.x - this.x)**2 + (entity.y - this.y)**2);
                if (distance < Bomb.upgradables.explosionRange) {
                    entity.damage(Bomb.upgradables.explosionDamage);
                }
            }
        });
        this.particleHandler.applyExplosionParticles(this.centerX, this.centerY);
    }
}

export { BombEntity };