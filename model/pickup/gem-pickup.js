import { EntityUtil } from "../entity.js";
import { Pickup } from "./pickup.js";

class GemPickup extends Pickup {

    constructor(x, y, game) {
        super(x, y, 32, 32, false);
        this.game = game;
        this.assetHandler = game.assetHandler;
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativePosition(this);
        ctx.drawImage(this.assetHandler.getImage('gem'), relativePosition.x, relativePosition.y, this.width, this.height);
    }

    pickup() {
        EntityUtil.removeFromEntityList(this, this.game.entityList);
        this.game.player.xp += this.value;
        if (this.game.player.xp >= this.game.player.xpNextLevel) {
            this.game.player.xp -= this.game.player.xpNextLevel;
            this.game.player.levelup();
        }
        EntityUtil.removeFromEntityList(this, this.game.entityList);
    }

    get value() {
        return 1;
    }
}

export { GemPickup };