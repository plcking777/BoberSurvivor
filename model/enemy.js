import { Entity } from "./entity.js";

class Enemy extends Entity {

    SPEED = 0.5;

    constructor(x, y, maxHP, assetHandler) {
        super();
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.maxHP = maxHP;
        this.hp = maxHP;

        this.assetHandler = assetHandler;
    }


    update(player) {
    
        const diffX = player.x - this.x;
        const diffY = player.y - this.y;
        const totDiff = Math.abs(diffX) + Math.abs(diffY);

        if (totDiff > 0.0) {
            this.x += this.SPEED * (diffX / totDiff);
            this.y += this.SPEED * (diffY / totDiff);
        }

    }

    render(ctx, camera) {
        ctx.fillStyle = "red";
        const relativePosition = camera.getRelativePosition(this);
        ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);
    }
}

export { Enemy };