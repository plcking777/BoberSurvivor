import { WeaponEntity } from "./weapon-entity.js";
import { EntityUtil } from './../../entity.js'

class BombEntity extends WeaponEntity {

    ANIMATION_FRAMES = 4;
    ANIMATION_TIME = 30;

    EXPLODE_TIMER = 200;

    constructor(x, y, entityList, assetHandler) {
        super(x, y, 20, 20, entityList);
        this.assetHandler = assetHandler;
        this.frameCount = 0;
    }

    update() {
        this.frameCount++;
        if (this.frameCount >= this.EXPLODE_TIMER) {
            EntityUtil.removeFromEntityList(this, this.entityList);
        }
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);
        const animationFrame = Math.max(parseInt(((this.frameCount - (this.EXPLODE_TIMER - this.ANIMATION_TIME)) / this.ANIMATION_TIME * this.ANIMATION_FRAMES) + 1), 1);
        ctx.drawImage(this.assetHandler.getImage(`bomb-f${animationFrame}`), relativePosition.x - 16, relativePosition.y - 16, 32, 32);
    }
}

export { BombEntity };