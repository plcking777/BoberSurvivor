import { Bomb } from "../weapon/bomb.js";
import { Upgrade } from "./upgrade.js";
import { Knife } from "../weapon/knife.js";

class UpgradeHandler {

    constructor(game) {
        this.game = game;
        this.upgrades = [];
        this.initUpgrades();
    }


    initUpgrades() {
        this.upgrades = [
            new Upgrade('bomb-f1', '150% range', () => {
                const bomb = this.game.inventory.find(item => item instanceof Bomb);
                if (bomb) {
                    bomb.explosionRange *= 1.5;
                }
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('bomb-f1', '150% damage', () => {
                const bomb = this.game.inventory.find(item => item instanceof Bomb);
                if (bomb) {
                    bomb.explosionDamage *= 1.5;
                }
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('throwing-knife', '200% damage', () => {
                const knife = this.game.inventory.find(item => item instanceof Knife);
                if (knife) {
                    knife.damage *= 2.00;
                }
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),
        ];
    }

}

export { UpgradeHandler };