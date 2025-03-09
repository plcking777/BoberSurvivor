import { Weapon } from './weapon.js';
import { EntityUtil } from './../entity.js'
import { KnifeEntity } from './entity/knife-entity.js';

class Knife extends Weapon {
    static imageSrc = 'throwing-knife';

    constructor(game) {
        super(120, game.entityList);
        this.game = game;
    }

    update(player) {
        super.update(player);
    }

    render(ctx, camera) {

    }

    activate(player) {
        super.activate(player);
        const knife = new KnifeEntity(player.centerX, player.centerY, this.game);
        EntityUtil.addToEntityList(knife, this.entityList);
    }
}

export { Knife };