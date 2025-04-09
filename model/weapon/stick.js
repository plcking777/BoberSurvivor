import { Weapon } from './weapon.js';
import { EntityUtil } from './../entity.js'
import { StickEntity } from './entity/stick-entity.js';

class Stick extends Weapon {
    static imageSrc = 'stick';

    static upgradables = {
        timeout: 120,
        damage: 1,
        maxHitCount: 3,
        throwSpeed: 6,
    }

    constructor(game) {
        super(Stick.upgradables.timeout, game.entityList);
        this.game = game;
    }

    update(player) {
        super.update(player);
    }

    render(ctx, camera) {

    }

    activate(player) {
        super.activate(player);
        const stick = new StickEntity(player.centerX, player.centerY, this.game);
        EntityUtil.addToEntityList(stick, this.entityList);
    }
}

export { Stick };