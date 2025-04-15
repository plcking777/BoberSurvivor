class Camera {

    constructor(x, y, width, height, game) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.edgeLeft = 0;
        this.edgeTop = 0;
        this.edgeRight = game.world.TILE_HEIGHT * game.world.TILE_COUNT;
        this.edgeBottom = game.world.TILE_HEIGHT * game.world.TILE_COUNT;
    }

    follow(entity) {
        this.x = Math.fround(entity.x + entity.width / 2);
        this.y = Math.fround(entity.y + entity.height / 2);

        const left = this.x - (this.width / 2);
        const top = this.y - (this.height / 2);
        const right = this.x + (this.width / 2);
        const bottom = this.y + (this.height / 2);

        if (left < this.edgeLeft) {
            this.x = this.edgeLeft + (this.width / 2);
        }
        if (right > this.edgeRight) {
            this.x = this.edgeRight - (this.width / 2);
        }
        if (top < this.edgeTop) {
            this.y = this.edgeTop + (this.height / 2);
        }
        if (bottom > this.edgeBottom) {
            this.y = this.edgeBottom - (this.height / 2);
        }
    }


    getRelativePosition(entity) {
        const diffX = entity.x - this.x;
        const diffY = entity.y - this.y;
        return {x: diffX + this.width / 2, y: diffY + this.height / 2};
    }

    getRelativeXYPosition(x, y) {
        const diffX = x - this.x;
        const diffY = y - this.y;
        return {x: diffX + this.width / 2, y: diffY + this.height / 2};
    }

    get centerX() {
        return this.width / 2;
    }
    
    get centerY() {
        return this.height / 2;
    }
}

export { Camera };