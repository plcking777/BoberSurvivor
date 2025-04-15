import { EntityUtil } from "../entity.js";
import { Pickup } from "./pickup.js";

class ChestPickup extends Pickup {

    constructor(x, y, game) {
        super(x, y, 32, 32, false);
        this.game = game;
        this.assetHandler = game.assetHandler;
        this.stateHandler = game.stateHandler;
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativePosition(this);
        ctx.drawImage(this.assetHandler.getImage('chest'), Math.round(relativePosition.x), Math.round(relativePosition.y), this.width, this.height);
    }

    pickup() {
        EntityUtil.removeFromEntityList(this, this.game.entityList);
        this.stateHandler.switchState(this.stateHandler.states.chestUpgrade);
    }

}

export { ChestPickup };