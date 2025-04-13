import { Weapon } from './weapon.js';
import { EntityUtil } from '../entity.js'
import { StickEntity } from './entity/stick-entity.js';

class Stick extends Weapon {
    static imageSrc = 'stick';

    static defaultUpgradables = {
        timeout: 80,
        damage: 3,
        maxHitCount: 3,
        throwSpeed: 6,
    }

    static upgradables = {
        timeout: Stick.defaultUpgradables.timeout,
        damage: Stick.defaultUpgradables.damage,
        maxHitCount: Stick.defaultUpgradables.maxHitCount,
        throwSpeed: Stick.defaultUpgradables.throwSpeed,
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

    static initDefaultUpgradables() {
        Object.keys(Stick.defaultUpgradables).forEach(key => {
            Stick.upgradables[key] = Stick.defaultUpgradables[key];
        });
    }
}

export { Stick };