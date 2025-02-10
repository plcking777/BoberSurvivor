import { WeaponEntity } from "./weapon-entity.js";

class BombEntity extends WeaponEntity {

    constructor(x, y) {
        super(x, y, 20, 20);
    }

    update() {

    }

    render(ctx, camera) {
        ctx.fillStyle = "blue";
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);
        ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);
    }
}

export { BombEntity };