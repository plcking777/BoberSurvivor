import { WeaponEntity } from "./weapon-entity.js";
import { EntityUtil } from './../../entity.js'

class WoodLogEntity extends WeaponEntity {

    constructor(x, y, game) {
        super(x, y, 32, 32, game.entityList);

        this.camera = game.camera;
        this.assetHandler = game.assetHandler;
        this.particleHandler = game.particleHandler;

        this.pivotX = x;
        this.pivotY = y;
        
        this.angle = Math.random() * 180.0 * Math.PI;
        this.speed = 1;
    }

    update() {
        super.update();
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);
        ctx.drawImage(this.assetHandler.getImage('log'), relativePosition.x, relativePosition.y, 32, 32);
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

export { WoodLogEntity };