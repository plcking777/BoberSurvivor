import { Entity, CollisionBox } from "./entity.js";
import { Player } from "./player.js";

class Enemy extends Entity {

    SPEED = 0.5;
    ATTACK_DAMAGE = 1;

    constructor(x, y, maxHP, assetHandler, particleHandler) {
        super(x, y, 48, 48, true);
        this.maxHP = maxHP;
        this.hp = maxHP;

        this.assetHandler = assetHandler;
        this.particleHandler = particleHandler;

        this.vx = 0;
        this.vy = 0;
        
        this.goingLeft = true;
    }


    update(player, entityList) {
    
        this.vx = 0;
        this.vy = 0;

        const diffX = player.x - this.x;
        const diffY = player.y - this.y;
        const totDiff = Math.abs(diffX) + Math.abs(diffY);

        if (totDiff > 0.0) {
            this.vx = this.SPEED * (diffX / totDiff);
            this.vy = this.SPEED * (diffY / totDiff);
        }

        let futureCollisionX = new CollisionBox(this.x + this.vx, this.y, this.width, this.height);
        let futureCollisionY = new CollisionBox(this.x, this.y + this.vy, this.width, this.height);

        Object.values(entityList).forEach(entity => {
            if (this !== entity) {
                if (futureCollisionX.collidesWith(entity.collisionBox)) {
                    this.vx = 0;

                    if (entity instanceof Player) {
                        entity.damage(this.ATTACK_DAMAGE);
                    }
                }
                if (futureCollisionY.collidesWith(entity.collisionBox)) {
                    this.vy = 0;

                    if (entity instanceof Player) {
                        entity.damage(this.ATTACK_DAMAGE);
                    }
                }
            }
        });
        
        if (this.vx > 0) {
            this.goingLeft = false;
        } else if (this.vx < 0) {
            this.goingLeft = true;
        }


        this.x += this.vx;
        this.y += this.vy;
        super.update();
    }

    render(ctx, camera) {
        ctx.fillStyle = "red";
        const relativePosition = camera.getRelativePosition(this);
        if (this.goingLeft) {
            ctx.drawImage(this.assetHandler.getImage('ghost-f1'), relativePosition.x, relativePosition.y, this.width, this.height);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.assetHandler.getImage('ghost-f1'), -relativePosition.x -this.width, relativePosition.y, this.width, this.height);
            ctx.restore();
        }
    }

    damage(value) {
        this.particleHandler.applyDamageNumbers(this.centerX, this.centerY, ''+value);
    }
}

export { Enemy };