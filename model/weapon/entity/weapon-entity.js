import { Entity } from '../../entity.js';

class WeaponEntity extends Entity {

    constructor(x, y, width, height, entityList) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.entityList = entityList;
    }

    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    render(ctx, camera) {
        throw new Error("Method 'render(ctx, camera)' must be implemented.");
    }

}

export { WeaponEntity };