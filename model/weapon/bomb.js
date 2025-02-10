import { Weapon } from './weapon.js';

class Bomb extends Weapon {
    constructor(timeout, entityList) {
        super(timeout, entityList);
    }

    update(player) {
        super.update(player);
    }

    render(ctx, camera) {

    }

    activate(player) {
        super.activate(player);
        this.entityList.push(new BombEntity());
    }
}

export { Bomb };