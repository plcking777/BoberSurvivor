import { Entity } from "../entity.js";

class Pickup extends Entity {
    constructor(x, y, width, height, collisionEnabled) {
        super(x, y, width, height, collisionEnabled);
    }

    pickup() {
        throw new Error('pickup method not implemented');
    }
}

export { Pickup };