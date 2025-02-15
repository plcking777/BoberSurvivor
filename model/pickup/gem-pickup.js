import { Pickup } from "./pickup.js";

class GemPickup extends Pickup {

    constructor(x, y, assetHandler) {
        super(x, y, 32, 32, false);
        this.assetHandler = assetHandler;
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativePosition(this);
        ctx.drawImage(this.assetHandler.getImage('gem'), relativePosition.x, relativePosition.y, this.width, this.height);
    }
}

export { GemPickup };