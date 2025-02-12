import { Weapon } from './weapon.js';
import { BombEntity } from './entity/bomb-entity.js';
import { EntityUtil } from './../entity.js'

class Bomb extends Weapon {
    constructor(timeout, entityList, assetHandler) {
        super(timeout, entityList);
        this.assetHandler = assetHandler;
    }

    update(player) {
        super.update(player);
    }

    render(ctx, camera) {

    }

    activate(player) {
        super.activate(player);
        const bomb = new BombEntity(player.x, player.y, this.entityList, this.assetHandler);
        EntityUtil.addToEntityList(bomb, this.entityList);
    }
}

export { Bomb };