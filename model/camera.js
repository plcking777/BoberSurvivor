class Camera {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    follow(entity) {
        this.x = entity.x + entity.width / 2;
        this.y = entity.y + entity.height / 2;
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
}

export { Camera };