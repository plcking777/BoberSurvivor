import { Weapon } from './weapon.js';
import { EntityUtil } from './../entity.js'
import { KnifeEntity } from './entity/knife-entity.js';

class Knife extends Weapon {
    static imageSrc = 'throwing-knife';

    static defaultUpgradables = {
        timeout: 40,
        damage: 5,
        throwSpeed: 6,
    }

    static upgradables = {
        timeout: Knife.defaultUpgradables.timeout,
        damage: Knife.defaultUpgradables.damage,
        throwSpeed: Knife.defaultUpgradables.throwSpeed,
    }


    constructor(game) {
        super(Knife.upgradables.timeout, game.entityList);
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

    static initDefaultUpgradables() {
        Object.keys(Knife.defaultUpgradables).forEach(key => {
            Knife.upgradables[key] = Knife.defaultUpgradables[key];
        });
    }
}

export { Knife };