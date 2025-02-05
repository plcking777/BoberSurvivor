class Enemy {

    SPEED = 0.5;
    WIDTH = 32;
    HEIGHT = 32;

    constructor(x, y, maxHP) {
        this.x = x;
        this.y = y;
        this.maxHP = maxHP;
        this.hp = maxHP;
    }


    update(player) {
    
        const diffX = player.x - this.x;
        const diffY = player.y - this.y;
        const totDiff = Math.abs(diffX) + Math.abs(diffY);

        if (totDiff > 0.0) {
            this.x += this.SPEED * (diffX / totDiff);
            this.y += this.SPEED * (diffY / totDiff);
        }

    }

    render(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.WIDTH, this.HEIGHT);
    }
}

export { Enemy };