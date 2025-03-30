import { WeaponEntity } from "./weapon-entity.js";
import { EntityUtil } from './../../entity.js'

class StickEntity extends WeaponEntity {

    constructor(x, y, game) {
        super(x, y, 32, 32, game.entityList);

        this.hitCount = 0;
        this.maxHitCount = 3;

        this.camera = game.camera;
        this.assetHandler = game.assetHandler;
        this.particleHandler = game.particleHandler;

        this.throwSpeed = 6.0;
        
        this.angle = Math.random() * 180.0 * Math.PI;
        this.vx = Math.cos(this.angle) * this.throwSpeed;
        this.vy = Math.sin(this.angle) * this.throwSpeed;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        // destroy if out of camera view
        const relativePosition = this.camera.getRelativeXYPosition(this.x, this.y);
        if (relativePosition.x + this.width < 0 || relativePosition.x > this.camera.width || relativePosition.y + this.height < 0 || relativePosition.y > this.camera.height) {
            EntityUtil.removeFromEntityList(this, this.entityList);
        }
        super.update();
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);

        ctx.save();
        ctx.translate(relativePosition.x, relativePosition.y);
        ctx.rotate(this.angle + 1.57);
        ctx.drawImage(this.assetHandler.getImage('stick'), -32 / 2, -32 / 2, 32, 32);
        ctx.restore();
    }

    // Collision & damage taking is handled inside the enemy class
    // (to avoid having to loop over all the entities again)
    hit(yCollision) {
        if (!yCollision) {
            this.vx *= -1;
        } else {
            this.vy *= -1;
        }
        this.hitCount++;
        if (this.hitCount >= this.maxHitCount) {
            EntityUtil.removeFromEntityList(this, this.entityList);
        }
    }
    get damage () {
        return 5;
    }
}

export { StickEntity };