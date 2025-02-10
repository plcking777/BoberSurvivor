import { WeaponEntity } from "./weapon-entity.js";

class BombEntity extends WeaponEntity {
    
    EXPLODE_TIMER = 120; 

    constructor(x, y, entityList) {
        super(x, y, 20, 20, entityList);
        this.frameCount = 0;
    }

    update() {
        this.frameCount++;
        if (this.frameCount >= this.EXPLODE_TIMER) {
            this.entityList.remove(this);
        }
    }

    render(ctx, camera) {
        ctx.fillStyle = "blue";
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);
        ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);
    }
}

export { BombEntity };