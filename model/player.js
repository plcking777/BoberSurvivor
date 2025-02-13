class Player {

    SPEED = 1;

    constructor(x, y, maxHP, assetHandler) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.maxHP = maxHP;
        this.hp = maxHP;

        this.assetHandler = assetHandler;
    }


    update(input, entityList) {

        Object.values(entityList).forEach(entity => {
            if (this.x < entity.x + entity.width && this.x + this.width > entity.x
                && this.y < entity.y + entity.height && this.y + this.height > entity.y) {
                
                    console.log('hit');
            }
        });



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
            this.x += addX * (this.SPEED / totalPositionDiff);
            this.y += addY * (this.SPEED / totalPositionDiff);
        }
    }

    render(ctx, camera) {
        ctx.fillStyle = "blue";
        const relativePosition = camera.getRelativePosition(this);
        ctx.fillRect(relativePosition.x, relativePosition.y, this.width, this.height);
    }
}

export { Player };