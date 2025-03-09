import { WeaponEntity } from "./weapon-entity.js";
import { EntityUtil } from './../../entity.js'

class KnifeEntity extends WeaponEntity {

    constructor(x, y, game) {
        super(x, y, 32, 32, game.entityList);

        this.camera = game.camera;
        this.assetHandler = game.assetHandler;
        this.particleHandler = game.particleHandler;

        this.vx = 1;
        this.vy = 0;
    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        // destroy if out of camera view
        const relativePosition = this.camera.getRelativeXYPosition(this.x, this.y);
        if (relativePosition.x < this.width || relativePosition.x > this.camera.width || relativePosition.y < this.height || relativePosition.y > this.camera.height) {
            EntityUtil.removeFromEntityList(this, this.entityList);
        }
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);
        ctx.drawImage(this.assetHandler.getImage('throwing-knife'), relativePosition.x, relativePosition.y, 32, 32);
    }

    // Collision & damage taking is handled inside the enemy class
    // (to avoid having to loop over all the entities again)
    hit() {
        EntityUtil.removeFromEntityList(this, this.entityList);
    }
    get damage () {
        return 5;
    }
}

export { KnifeEntity };