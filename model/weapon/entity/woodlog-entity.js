import { WeaponEntity } from "./weapon-entity.js";
import { EntityUtil } from './../../entity.js'

class WoodLogEntity extends WeaponEntity {

    constructor(x, y, game) {
        super(x, y, 32, 32, game.entityList);

        this.camera = game.camera;
        this.assetHandler = game.assetHandler;
        this.particleHandler = game.particleHandler;
        this.player = game.player;


        this.pivotX = x;
        this.pivotY = y;
        
        this.angle = Math.random() * 360.0;
        this.speed = 1;
        this.radius = 128;
    }

    update() {
        super.update();

        this.pivotX = this.player.centerX;
        this.pivotY = this.player.centerY;
        
        this.angle += this.speed;
        if (this.angle > 360.0) {
            this.angle -= 360.0;
        }

        this.x = this.pivotX + (Math.cos(this.angle / 180.0 * Math.PI) * this.radius);
        this.y = this.pivotY + (Math.sin(this.angle / 180.0 * Math.PI) * this.radius);
    }

    render(ctx, camera) {
        const relativePosition = camera.getRelativeXYPosition(this.x, this.y);
        ctx.drawImage(this.assetHandler.getImage('log'), relativePosition.x, relativePosition.y, 32, 32);
    }

    // Collision & damage taking is handled inside the enemy class
    // (to avoid having to loop over all the entities again)
    hit() {
        //EntityUtil.removeFromEntityList(this, this.entityList);
    }
    get damage () {
        return 5;
    }
}

export { WoodLogEntity };