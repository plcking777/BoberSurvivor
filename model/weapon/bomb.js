import { Weapon } from './weapon.js';
import { BombEntity } from './entity/bomb-entity.js';
import { EntityUtil } from './../entity.js'

class Bomb extends Weapon {
    static imageSrc = 'bomb-f1';

    explosionRange = 100;
    explosionDamage = 5;


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

        const upgradables = {
            explosionRange: this.explosionRange,
            explosionDamage: this.explosionDamage,
        }

        const bomb = new BombEntity(player.centerX, player.centerY, upgradables, this.game);
        EntityUtil.addToEntityList(bomb, this.entityList);
    }
}

export { Bomb };