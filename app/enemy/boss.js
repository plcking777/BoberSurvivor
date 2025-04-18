import { EntityUtil } from "../entity.js";
import { ChestPickup } from "../pickup/chest-pickup.js";
import { GemPickup } from "../pickup/gem-pickup.js";
import { Enemy } from "./enemy.js";

class Boss extends Enemy {

    constructor(x, y, maxHP, game) {
        super(x, y, 1, game);
        this.game = game;
    }


    render(ctx, camera) {
        const relativePosition = camera.getRelativePosition(this);
        if (this.goingLeft) {
            ctx.drawImage(this.assetHandler.getImage('boss-f1'), Math.round(relativePosition.x), Math.round(relativePosition.y), this.width, this.height);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.assetHandler.getImage('boss-f1'), Math.round(-relativePosition.x -this.width), Math.round(relativePosition.y), this.width, this.height);
            ctx.restore();
        }
    }

    damage(value) {
        this.particleHandler.applyDamageNumbers(this.centerX, this.centerY, ''+value);

        this.hp -= value;
        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        if (this.game.inventory.length >= this.game.MAX_INVENTORY_ITEMS) {
            EntityUtil.addToEntityList(new GemPickup(this.centerX, this.centerY, this.game), this.entityList);
        } else {
            EntityUtil.addToEntityList(new ChestPickup(this.centerX, this.centerY, this.game), this.entityList);
        }
        EntityUtil.removeFromEntityList(this, this.entityList);
    }
}

export { Boss };