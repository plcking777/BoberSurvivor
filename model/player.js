import { Enemy } from "./enemy.js";
import { Entity } from "./entity.js";

class Player extends Entity{

    SPEED = 1;

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


    update(input, entityList) {
        let vx = 0;
        let vy = 0;

        let addX = 0.0;
        let addY = 0.0;

        if (input.left) {
            addX -= this.SPEED;
        }
        if (input.right) {
            addX += this.SPEED;
        }
        if (input.up) {
            addY -= this.SPEED;
        }
        if (input.down) {
            addY += this.SPEED;
        }
        // Normalize the new position
        const totalPositionDiff = Math.sqrt(addX ** 2 + addY ** 2);
        if (totalPositionDiff > 0.0) {
            vx = addX * (this.SPEED / totalPositionDiff);
            vy = addY * (this.SPEED / totalPositionDiff);
        }


        Object.values(entityList).forEach(entity => {
            if (this !== entity) {
                if (entity instanceof Enemy) {
                    if (this.x + vx < entity.x + entity.width && this.x + this.width + vx > entity.x
                        && this.y + vy < entity.y + entity.height && this.y + this.height + vy > entity.y) {
                            vx = 0;
                            vy = 0;
                    }
                }
            }
        });

        this.x += vx;
        this.y += vy;
    }

    render(ctx, camera) {
        ctx.fillStyle = "blue";
        const relativePosition = camera.getRelativePosition(this);
        ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);
    }
}

export { Player };