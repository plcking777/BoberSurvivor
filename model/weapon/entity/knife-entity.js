import { WeaponEntity } from "./weapon-entity.js";
import { EntityUtil } from './../../entity.js'

class KnifeEntity extends WeaponEntity {

    constructor(x, y, game, upgradables) {
        super(x, y, 32, 32, game.entityList);

        this.camera = game.camera;
        this.assetHandler = game.assetHandler;
        this.particleHandler = game.particleHandler;

        this.damage = upgradables.damage;
        this.throwSpeed = upgradables.throwSpeed;
        
        this.angle = Math.random() * 180.0 * Math.PI;
        this.vx = Math.cos(this.angle) * this.throwSpeed;
        this.vy = Math.sin(this.angle) * this.throwSpeed;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        // destroy if out of camera view
        const relativePosition = this.camera.getRelativeXYPosition(this.x, this.y);
        if (relativePosition.x < this.width || relativePosition.x > this.camera.width || relativePosition.y < this.height || relativePosition.y > this.camera.height) {
            EntityUtil.removeFromEntityList(this, this.entityList);
        }
        super.update();
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);
        //ctx.drawImage(this.assetHandler.getImage('throwing-knife'), relativePosition.x, relativePosition.y, 32, 32);

        ctx.save();
        ctx.translate(relativePosition.x, relativePosition.y);
        ctx.rotate(this.angle + 1.57);
        ctx.drawImage(this.assetHandler.getImage('throwing-knife'), -32 / 2, -32 / 2, 32, 32);
        ctx.restore();
    }

    // Collision & damage taking is handled inside the enemy class
    // (to avoid having to loop over all the entities again)
    hit() {
        EntityUtil.removeFromEntityList(this, this.entityList);
    }
}

export { KnifeEntity };