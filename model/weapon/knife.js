import { Weapon } from './weapon.js';
import { EntityUtil } from './../entity.js'
import { KnifeEntity } from './entity/knife-entity.js';

class Knife extends Weapon {
    static imageSrc = 'throwing-knife';

    constructor(game) {
        super(1, game.entityList);
        this.game = game;

        this.damage = 5;
        this.throwSpeed = 6.0;
    }

    update(player) {
        super.update(player);
    }

    render(ctx, camera) {

    }

    activate(player) {
        super.activate(player);

        const upgradables = {
            damage: this.damage,
            throwSpeed: this.throwSpeed,
        }


        const knife = new KnifeEntity(player.centerX, player.centerY, this.game, upgradables);
        EntityUtil.addToEntityList(knife, this.entityList);
    }
}

export { Knife };