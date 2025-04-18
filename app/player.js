import { Enemy } from "./enemy/enemy.js";
import { CollisionBox, Entity, EntityUtil } from "./entity.js";
import { Pickup } from "./pickup/pickup.js";

class Player extends Entity {

    RUNNING_ANIMATION_FRAMES = 2;
    RUNNING_ANIMATION_FRAME_DURATION = 30;

    SPEED = 2;

    xp = 0;
    xpNextLevel = 2;
    level = 1;

    constructor(x, y, maxHP, game) {
        super(x, y, 64, 64, true, 16, 0, 32, 64);

        this.maxHP = maxHP;
        this.hp = maxHP;

        this.goingLeft = false;
        this.running = false;
        this.frameCount = 0;
        this.regenRate = 0.01;

        this.game = game;
        this.assetHandler = game.assetHandler;
        this.particleHandler = game.particleHandler;
        this.entityList = game.entityList;
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


        let futureCollisionX = new CollisionBox(this.x + vx + this.offsetX, this.y + this.offsetY, this.collisionWidth, this.collisionHeight);
        let futureCollisionY = new CollisionBox(this.x + this.offsetX, this.y + vy + this.offsetY, this.collisionWidth, this.collisionHeight);

        Object.values(this.entityList).forEach(entity => {
            if (this !== entity) {
                if (entity instanceof Enemy) {
                    
                    if (futureCollisionX.collidesWith(entity.collisionBox)) {
                        this.damage(entity.ATTACK_DAMAGE);
                        /*
                        if (vx > 0) {
                            this.x = entity.collisionBox.x - this.collisionBox.width - this.offsetX;
                        } else if (vx < 0) {
                            this.x = entity.collisionBox.x + entity.collisionBox.width - this.offsetX;
                        }
                        */
                        if (this.collisionBox.x + this.collisionBox.width <= entity.collisionBox.x && this.collisionBox.x + this.collisionBox.width + vx >= entity.collisionBox.x) {
                            this.x = entity.collisionBox.x - this.collisionBox.width - this.offsetX;
                        } else if (this.collisionBox.x >= entity.collisionBox.x + entity.collisionBox.width && this.collisionBox.x + vx <= entity.collisionBox.x + entity.collisionBox.width) {
                            this.x = entity.collisionBox.x + entity.collisionBox.width - this.offsetX;
                        }
                        vx = 0;
                    }
                    
                    if (futureCollisionY.collidesWith(entity.collisionBox)) {
                        this.damage(entity.ATTACK_DAMAGE);
                        /*
                        if (vy > 0) {
                            this.y = entity.collisionBox.y - this.collisionBox.height - this.offsetY;
                        } else if (vy < 0) {
                            this.y = entity.collisionBox.y + entity.collisionBox.height - this.offsetY;
                        }
                        */
                        if (this.collisionBox.y + this.collisionBox.height <= entity.collisionBox.y && this.collisionBox.y + this.collisionBox.height + vy >= entity.collisionBox.y) {
                            this.y = entity.collisionBox.y - this.collisionBox.height - this.offsetY;
                        } else if (this.collisionBox.y >= entity.collisionBox.y + entity.collisionBox.height && this.collisionBox.y + vy <= entity.collisionBox.y + entity.collisionBox.height) {
                            this.y = entity.collisionBox.y + entity.collisionBox.height - this.offsetY;
                        }
                        vy = 0;
                    }
                } else if (entity instanceof Pickup) {
                    if (this.collisionBox.collidesWith(entity.collisionBox)) {
                        entity.pickup();
                    }
                }
            }
        });


        if (vx > 0) {
            this.goingLeft = false;
        } else if (vx < 0) {
            this.goingLeft = true;
        }

        if (vx !== 0 || vy !== 0) {
            this.running = true;
        } else {
            this.running = false;
        }

        this.x += vx;
        this.y += vy;
        super.update();

        // regen HP
        if (this.hp < this.maxHP) {
            this.hp = Math.min(this.hp + this.regenRate, this.maxHP);
        }
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativePosition(this);

        if (this.running) {
            this.frameCount++;
            if (this.frameCount >= this.RUNNING_ANIMATION_FRAMES * this.RUNNING_ANIMATION_FRAME_DURATION) {
                this.frameCount = 0;
            }
        } else {
            this.frameCount = 0;
        }
        const runningFrame = Math.min(Math.floor(this.frameCount / this.RUNNING_ANIMATION_FRAME_DURATION) + 1, this.RUNNING_ANIMATION_FRAMES);
        if (!this.goingLeft) {
            ctx.drawImage(this.assetHandler.getImage(`bober-f${runningFrame}`), Math.round(relativePosition.x), Math.round(relativePosition.y), this.width, this.height);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.assetHandler.getImage(`bober-f${runningFrame}`), Math.round(-relativePosition.x -this.width), Math.round(relativePosition.y), this.width, this.height);
            ctx.restore();
        }
        /*
        ctx.fillStyle = "red";
        const relcol = camera.getRelativeXYPosition(this.collisionBox.x, this.collisionBox.y);
        ctx.fillRect(relcol.x, relcol.y, this.collisionBox.width, this.collisionBox.height);
        */
    }

    damage(value) {
        if (value == null) return;
        this.hp -= value;
        if (this.hp <= 0) {
            // dead
            this.game.stateHandler.switchState(this.game.stateHandler.states.dead);
        }
        this.particleHandler.applyDamageParticles(this.centerX, this.centerY);
    }

    levelup() {
        this.xpNextLevel = this.xpNextLevel * 1.35;
        this.level++;
        this.game.stateHandler.switchState(this.game.stateHandler.states.upgrade);
    }


    get centerX() {
        return this.x + this.width / 2;
    }

    get centerY() {
        return this.y + this.height / 2;
    }
}

export { Player };