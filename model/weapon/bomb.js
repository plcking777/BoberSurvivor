import { Weapon } from './weapon.js';
import { BombEntity } from './entity/bomb-entity.js';
import { EntityUtil } from './../entity.js'

class Bomb extends Weapon {
    constructor(timeout, entityList, assetHandler, particleHandler) {
        super(timeout, entityList);
        this.assetHandler = assetHandler;
        this.particleHandler = particleHandler;
    }

    update(player) {
        super.update(player);
    }

    render(ctx, camera) {

    }

    activate(player) {
        super.activate(player);
        const bomb = new BombEntity(player.centerX, player.centerY, this.entityList, this.assetHandler, this.particleHandler);
        EntityUtil.addToEntityList(bomb, this.entityList);
    }
}

export { Bomb };