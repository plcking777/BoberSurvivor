import { Weapon } from './weapon.js';
import { EntityUtil } from './../entity.js'
import { WoodLogEntity } from './entity/woodlog-entity.js';

class WoodLog extends Weapon {
    static imageSrc = 'log';

    static defaultUpgradables = {
        speed: 1,
        damage: 1,
    }

    static upgradables = {
        speed: WoodLog.defaultUpgradables.speed,
        damage: WoodLog.defaultUpgradables.damage,
    };
    constructor(game) {
        super(0, game.entityList);
        this.game = game;
        this.activate(game.player);
    }

    update(player) {
        // Not calling super to prevent this item to be actived multiple times
        //super.update(player);
    }

    render(ctx, camera) {

    }

    activate(player) {
        super.activate(player);
        const woodlog = new WoodLogEntity(player.centerX, player.centerY, this.game);
        EntityUtil.addToEntityList(woodlog, this.entityList);
    }

    static initDefaultUpgradables() {
        Object.keys(WoodLog.defaultUpgradables).forEach(key => {
            WoodLog.upgradables[key] = WoodLog.defaultUpgradables[key];
        });
    }
}

export { WoodLog };