class Camera {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.following = null;
    }

    follow(entity) {
        this.x = entity.x;
        this.y = entity.y;
        this.following = entity;
    }


    getRelativePosition(entity) {
        const diffX = entity.x - this.x;
        const diffY = entity.y - this.y;
        if (this.following) {
            return {x: diffX + this.width / 2 - this.following.width / 2, y: diffY + this.height / 2 - this.following.height / 2};
        } else {
            return {x: diffX + this.width / 2, y: diffY + this.height / 2};
        }
    }

    getRelativeXPosition(x) {
        const diffX = x - this.x;
        if (this.following) {
            return diffX + this.width / 2 - this.following.width / 2;
        } else {
            return diffX + this.width / 2;
        }
    }

    getRelativeYPosition(y) {
        const diffY = y - this.y;
        if (this.following) {
            return diffY + this.height / 2 - this.following.height / 2;
        } else {
            return diffY + this.height / 2;
        }
    }
}

export { Camera };