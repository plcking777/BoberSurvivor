import { Weapon } from './weapon.js';
import { BombEntity } from './entity/bomb-entity.js';

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
        this.entityList.push(new BombEntity(player.x, player.y));
    }
}

export { Bomb };