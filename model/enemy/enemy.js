import { Entity, CollisionBox, EntityUtil } from "../entity.js";
import { GemPickup } from "../pickup/gem-pickup.js";
import { Player } from "../player.js";

class Enemy extends Entity {

    SPEED = 0.5;
    ATTACK_DAMAGE = 1;

    constructor(x, y, maxHP, game) {
        super(x, y, 48, 48, true, 5, 5, 32, 32);
        this.maxHP = maxHP;
        this.hp = maxHP;

        this.game = game;
        this.assetHandler = game.assetHandler;
        this.particleHandler = game.particleHandler;
        this.entityList = game.entityList;

        this.vx = 0;
        this.vy = 0;
        
        this.goingLeft = true;
    }


    update(player) {

        const diffX = player.x - this.x;
        const diffY = player.y - this.y;
        const totDiff = Math.abs(diffX) + Math.abs(diffY);

        if (totDiff > 0.0) {
            this.vx = this.SPEED * (diffX / totDiff);
            this.vy = this.SPEED * (diffY / totDiff);
        }

        let futureCollisionX = new CollisionBox(this.x + this.vx + this.offsetX, this.y + this.offsetY, this.collisionWidth, this.collisionHeight);
        let futureCollisionY = new CollisionBox(this.x + this.offsetX, this.y + this.vy + this.offsetY, this.collisionWidth, this.collisionHeight);

        Object.values(this.entityList).forEach(entity => {
            if (this !== entity && entity.collisionEnabled) {
                if (futureCollisionX.collidesWith(entity.collisionBox)) {

                    if (this.collisionBox.x + this.collisionBox.width <= entity.collisionBox.x && this.collisionBox.x + this.collisionBox.width + this.vx >= entity.collisionBox.x) {
                        this.x = entity.collisionBox.x - this.collisionBox.width - this.offsetX;
                        //console.log(1);
                    } else if (this.collisionBox.x >= entity.collisionBox.x + entity.collisionBox.width && this.collisionBox.x + this.vx <= entity.collisionBox.x + entity.collisionBox.width) {
                        this.x = entity.collisionBox.x + entity.collisionBox.width - this.offsetX;
                        //console.log(2);
                    }
                    this.vx = 0;

                    if (entity instanceof Player) {
                        entity.damage(this.ATTACK_DAMAGE);
                    }
                }
                if (futureCollisionY.collidesWith(entity.collisionBox)) {

                    if (this.collisionBox.y + this.collisionBox.height <= entity.collisionBox.y && this.collisionBox.y + this.collisionBox.height + this.vy >= entity.collisionBox.y) {
                        this.y = entity.collisionBox.y - this.collisionBox.height - this.offsetY;
                        //console.log(3);
                    } else if (this.collisionBox.y >= entity.collisionBox.y + entity.collisionBox.height && this.collisionBox.y + this.vy <= entity.collisionBox.y + entity.collisionBox.height) {
                        this.y = entity.collisionBox.y + entity.collisionBox.height - this.offsetY;
                        //console.log(4);
                    }
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
        const relativePosition = camera.getRelativePosition(this);
        if (this.goingLeft) {
            ctx.drawImage(this.assetHandler.getImage('ghost-f1'), relativePosition.x, relativePosition.y, this.width, this.height);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.assetHandler.getImage('ghost-f1'), -relativePosition.x -this.width, relativePosition.y, this.width, this.height);
            ctx.restore();
        }

        ctx.fillStyle = "orange";

        const relcol = camera.getRelativeXYPosition(this.collisionBox.x, this.collisionBox.y);
        ctx.fillRect(relcol.x, relcol.y, this.collisionBox.width, this.collisionBox.height);

    }

    damage(value) {
        this.particleHandler.applyDamageNumbers(this.centerX, this.centerY, ''+value);

        this.hp -= value;
        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        EntityUtil.addToEntityList(new GemPickup(this.centerX, this.centerY, this.game), this.entityList);
        EntityUtil.removeFromEntityList(this, this.entityList);
    }
}

export { Enemy };