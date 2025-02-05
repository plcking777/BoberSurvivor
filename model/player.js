class Player {

    SPEED = 1;
    WIDTH = 32;
    HEIGHT = 32;

    constructor(x, y, maxHP) {
        this.x = x;
        this.y = y;
        this.maxHP = maxHP;
        this.hp = maxHP;
    }


    update(input) {


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

    render(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.WIDTH, this.HEIGHT);
    }
}

export { Player };