import { WeaponEntity } from "./weapon-entity.js";
import { EntityUtil } from './../../entity.js'

class BombEntity extends WeaponEntity {
    
    EXPLODE_TIMER = 360;

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
        ctx.fillStyle = "blue";
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);
        ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);

        ctx.drawImage(this.assetHandler.getImage('bomb'), relativePosition.x, relativePosition.y);
    }
}

export { BombEntity };