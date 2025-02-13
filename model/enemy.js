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


    update(player, entityList) {
    
        let vx = 0;
        let vy = 0;

        const diffX = player.x - this.x;
        const diffY = player.y - this.y;
        const totDiff = Math.abs(diffX) + Math.abs(diffY);

        if (totDiff > 0.0) {
            vx = this.SPEED * (diffX / totDiff);
            vy = this.SPEED * (diffY / totDiff);
        }

        Object.values(entityList).forEach(entity => {
            if (this !== entity) {
                if (this.x + vx < entity.x + entity.width && this.x + this.width + vx > entity.x
                    && this.y + vy < entity.y + entity.height && this.y + this.height + vy > entity.y) {
                        vx = 0;
                        vy = 0;
                }
            }
        });
        
        this.x += vx;
        this.y += vy;
    }

    render(ctx, camera) {
        ctx.fillStyle = "red";
        const relativePosition = camera.getRelativePosition(this);
        ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);
    }
}

export { Enemy };