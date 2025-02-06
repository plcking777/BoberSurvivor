class Camera {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    follow(entity) {
        this.x = entity.x;
        this.y = entity.y;
    }


    getRelativePosition(entity) {
        const diffX = entity.x - this.x;
        const diffY = entity.y - this.y;
        return {x: diffX + this.width / 2 - entity.width / 2, y: diffY + this.height / 2 - entity.height / 2};
    }
    
}

export { Camera };