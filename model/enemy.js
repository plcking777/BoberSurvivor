import { Entity, CollisionBox } from "./entity.js";

class Enemy extends Entity {

    SPEED = 0.5;

    constructor(x, y, maxHP, assetHandler) {
        super(x, y, 32, 32, true);
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
                if (futureCollisionX.collides(entity.collisionBox)) {
                    vx = 0;
                }
                if (futureCollisionY.collides(entity.collisionBox)) {
                    vy = 0;
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
        ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);
    }
}

export { Enemy };