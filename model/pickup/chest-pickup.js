import { Pickup } from "./pickup.js";

class ChestPickup extends Pickup {

    constructor(x, y, assetHandler, stateHandler) {
        super(x, y, 32, 32, false);
        this.assetHandler = assetHandler;
        this.stateHandler = stateHandler;
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativePosition(this);
        ctx.drawImage(this.assetHandler.getImage('chest'), relativePosition.x, relativePosition.y, this.width, this.height);
    }

    pickup() {
        this.stateHandler.switchState(this.stateHandler.states.chestUpgrade);
    }

}

export { ChestPickup };