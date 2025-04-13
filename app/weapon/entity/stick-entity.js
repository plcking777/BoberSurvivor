import { WeaponEntity } from "./weapon-entity.js";
import { CollisionBox, EntityUtil } from '../../entity.js'
import { Stick } from "../stick.js";
import { Enemy } from "../../enemy/enemy.js";

class StickEntity extends WeaponEntity {

    constructor(x, y, game) {
        super(x, y, 32, 32, game.entityList, false);

        this.hitCount = 0;

        this.camera = game.camera;
        this.assetHandler = game.assetHandler;
        this.particleHandler = game.particleHandler;
        
        this.angle = Math.random() * 180.0 * Math.PI;
        this.vx = Math.cos(this.angle) * Stick.upgradables.throwSpeed;
        this.vy = Math.sin(this.angle) * Stick.upgradables.throwSpeed;

    }

    update() {
        
        let futureCollisionX = new CollisionBox(this.x + this.vx + this.offsetX, this.y + this.offsetY, this.collisionBox.width, this.collisionBox.height);
        Object.values(this.entityList).forEach(entity => {
            if (entity instanceof Enemy && futureCollisionX.collidesWith(entity.collisionBox)) {
                this.hit(false);
                entity.damage(Stick.upgradables.damage);
            }
        });
        this.x += this.vx;
        super.update();
        let futureCollisionY = new CollisionBox(this.x + this.offsetX, this.y + this.offsetY + this.vy, this.collisionBox.width, this.collisionBox.height);

        Object.values(this.entityList).forEach(entity => {
            if (entity instanceof Enemy && futureCollisionY.collidesWith(entity.collisionBox)) {
                this.hit(true);
                entity.damage(Stick.upgradables.damage);
            }
        });

        this.y += this.vy;
        super.update();

        // destroy if out of camera view
        const relativePosition = this.camera.getRelativeXYPosition(this.x, this.y);
        if (relativePosition.x + this.width < 0 || relativePosition.x > this.camera.width || relativePosition.y + this.height < 0 || relativePosition.y > this.camera.height) {
            EntityUtil.removeFromEntityList(this, this.entityList);
        }
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);

        ctx.save();
        ctx.translate(relativePosition.x, relativePosition.y);
        ctx.rotate(this.angle + 1.57);
        ctx.drawImage(this.assetHandler.getImage('stick'), -32 / 2, -32 / 2, 32, 32);
        ctx.restore();
    }

    hit(yCollision) {
        if (!yCollision) {
            this.vx *= -1;
        } else {
            this.vy *= -1;
        }
        this.hitCount++;
        if (this.hitCount >= Stick.upgradables.maxHitCount) {
            EntityUtil.removeFromEntityList(this, this.entityList);
        }
    }
    get damage () {
        return Stick.upgradables.damage;
    }
}

export { StickEntity };