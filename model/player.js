import { Enemy } from "./enemy.js";
import { CollisionBox, Entity, EntityUtil } from "./entity.js";
import { Pickup } from "./pickup/pickup.js";

class Player extends Entity {

    SPEED = 1;

    xp = 0;
    xpNextLevel = 2;
    level = 1;

    constructor(x, y, maxHP, assetHandler, particleHandler, entityList, uiHandler) {
        super(x, y, 32, 32, true);

        this.maxHP = maxHP;
        this.hp = maxHP;

        this.assetHandler = assetHandler;
        this.particleHandler = particleHandler;
        this.entityList = entityList;
        this.uiHandler = uiHandler;
    }


    update(input) {
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


        let futureCollisionX = new CollisionBox(this.x + vx, this.y, this.width, this.height);
        let futureCollisionY = new CollisionBox(this.x, this.y + vy, this.width, this.height);

        Object.values(this.entityList).forEach(entity => {
            if (this !== entity) {
                if (entity instanceof Enemy) {
                    
                    if (futureCollisionX.collidesWith(entity.collisionBox)) {
                        this.damage(entity.ATTACK_DAMAGE);
                        if (vx > 0) {
                            this.x = entity.x - this.width;
                        } else if (vx < 0) {
                            this.x = entity.x + entity.width;
                        }
                        vx = 0;
                    }
                    
                    if (futureCollisionY.collidesWith(entity.collisionBox)) {
                        this.damage(entity.ATTACK_DAMAGE);
                        if (vy > 0) {
                            this.y = entity.y - this.height;
                        } else if (vy < 0) {
                            this.y = entity.y + entity.height;
                        }
                        vy = 0;
                    }
                } else if (entity instanceof Pickup) {
                    if (this.collisionBox.collidesWith(entity.collisionBox)) {
                        this.pickup(entity);
                    }
                }
            }
        });

        this.x += vx;
        this.y += vy;
        super.update();
    }

    render(ctx, camera) {
        ctx.fillStyle = "blue";
        const relativePosition = camera.getRelativePosition(this);
        ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);
    }

    damage(value) {
        if (value == null) return;
        this.hp -= value;
        if (this.hp <= 0) {
            // dead
        }
        this.particleHandler.applyDamageParticles(this.centerX, this.centerY);
    }

    pickup(entity) {
        this.xp += entity.value;
        if (this.xp >= this.xpNextLevel) {
           this.xp -= this.xpNextLevel;
           this.levelup();
        }
        EntityUtil.removeFromEntityList(entity, this.entityList);
    }

    levelup() {
        this.xpNextLevel = Math.floor(this.xpNextLevel * 1.5);
        this.level++;
    }
}

export { Player };