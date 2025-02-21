import { Enemy } from "./enemy.js";

class Boss extends Enemy {

    constructor(x, y, maxHP, game) {
        super(x, y, maxHP, game);
    }


    render(ctx, camera) {
        const relativePosition = camera.getRelativePosition(this);
        if (this.goingLeft) {
            ctx.drawImage(this.assetHandler.getImage('boss-f1'), relativePosition.x, relativePosition.y, this.width, this.height);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.assetHandler.getImage('boss-f1'), -relativePosition.x -this.width, relativePosition.y, this.width, this.height);
            ctx.restore();
        }
    }
}

export { Boss };