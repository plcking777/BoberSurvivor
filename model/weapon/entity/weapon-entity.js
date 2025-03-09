import { Entity } from '../../entity.js';

class WeaponEntity extends Entity {

    constructor(x, y, width, height, entityList) {
        super(x, y, width, height, true);
        this.entityList = entityList;
    }

    update() {
        super.update();
    }

    render(ctx, camera) {
        throw new Error("Method 'render(ctx, camera)' must be implemented.");
    }

}

export { WeaponEntity };