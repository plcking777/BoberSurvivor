import { Weapon } from './weapon.js';
import { BombEntity } from './entity/bomb-entity.js';
import { EntityUtil } from './../entity.js'

class Bomb extends Weapon {
    static imageSrc = 'bomb-f1';

    static defaultUpgradables = {
        timeout: 120,
        explosionRange: 100,
        explosionDamage: 5,
    }

    static upgradables = {
        timeout: Bomb.defaultUpgradables.timeout,
        explosionRange: Bomb.defaultUpgradables.explosionRange,
        explosionDamage: Bomb.defaultUpgradables.explosionDamage,
    }

    constructor(game) {
        super(Bomb.upgradables.timeout, game.entityList);
        this.game = game;
    }

    update(player) {
        super.update(player);
    }

    render(ctx, camera) {

    }

    activate(player) {
        super.activate(player);
        const bomb = new BombEntity(player.centerX, player.centerY, this.game);
        EntityUtil.addToEntityList(bomb, this.entityList);
    }

    static initDefaultUpgradables() {
        Object.keys(Bomb.defaultUpgradables).forEach(key => {
            Bomb.upgradables[key] = Bomb.defaultUpgradables[key];
        });
    }
}

export { Bomb };