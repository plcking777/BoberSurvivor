import { Bomb } from "../weapon/bomb.js";
import { Upgrade } from "./upgrade.js";

class UpgradeHandler {

    constructor(game) {
        this.game = game;
        this.upgrades = [];
        this.initUpgrades();
    }


    initUpgrades() {
        this.upgrades = [
            new Upgrade('bomb-f1', 'increase range with 500%', () => {
                const bomb = this.game.inventory.find(item => item instanceof Bomb);
                if (bomb) {
                    bomb.explosionRange *= 5.00;
                }
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('bomb-f1', 'increase damage with 500%', () => {
                const bomb = this.game.inventory.find(item => item instanceof Bomb);
                if (bomb) {
                    bomb.explosionDamage *= 5.00;
                }
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),
        ];
    }

}

export { UpgradeHandler };