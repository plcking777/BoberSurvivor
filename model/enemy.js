import { Entity, CollisionBox } from "./entity.js";
import { Player } from "./player.js";

class Enemy extends Entity {

    SPEED = 0.5;
    ATTACK_DAMAGE = 1;

    constructor(x, y, maxHP, assetHandler) {
        super(x, y, 48, 48, true);
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

        let futureCollisionX = new CollisionBox(this.x + vx, this.y, this.width, this.height);
        let futureCollisionY = new CollisionBox(this.x, this.y + vy, this.width, this.height);

        Object.values(entityList).forEach(entity => {
            if (this !== entity) {
                if (futureCollisionX.collidesWith(entity.collisionBox)) {
                    if (vx > 0) {
                        this.x = entity.x - this.width;
                    } else if (vx < 0) {
                        this.x = entity.x + entity.width;
                    }
                    vx = 0;

                    if (entity instanceof Player) {
                        entity.damage(this.ATTACK_DAMAGE);
                    }
                }
                if (futureCollisionY.collidesWith(entity.collisionBox)) {
                    if (vy > 0) {
                        this.y = entity.y - this.height;
                    } else if (vy < 0) {
                        this.y = entity.y + entity.height;
                    }
                    vy = 0;

                    if (entity instanceof Player) {
                        entity.damage(this.ATTACK_DAMAGE);
                    }
                }
            }
        });
        
        this.x += vx;
        this.y += vy;
        super.update();
    }

    render(ctx, camera) {
        ctx.fillStyle = "red";
        const relativePosition = camera.getRelativePosition(this);
        //ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);
        ctx.drawImage(this.assetHandler.getImage('ghost-f1'), relativePosition.x, relativePosition.y, this.width, this.height);
    }
}

export { Enemy };