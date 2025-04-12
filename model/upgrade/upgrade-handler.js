import { Bomb } from "../weapon/bomb.js";
import { Upgrade } from "./upgrade.js";
import { Knife } from "../weapon/knife.js";
import { Stick } from "../weapon/stick.js";
import { WoodLog } from "../weapon/woodlog.js";

class UpgradeHandler {

    constructor(game) {
        this.game = game;
        this.upgrades = [];
        this.initUpgrades();
    }


    initUpgrades() {
        this.upgrades = [
            new Upgrade('bomb-f1', '150% range', () => {
                Bomb.upgradables.explosionRange *= 1.50;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('bomb-f1', '150% damage', () => {
                Bomb.upgradables.explosionDamage *= 1.50;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('bomb-f1', '200% attack speed', () => {
                Bomb.upgradables.timeout *= 0.5;
                this.game.inventory.forEach(weapon => {
                    if (weapon instanceof Bomb) {
                        weapon.timeout = Bomb.upgradables.timeout;
                    }
                });
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('throwing-knife', '200% damage', () => {
                Knife.upgradables.damage *= 2.00;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('throwing-knife', '200% speed', () => {
                Knife.upgradables.throwSpeed *= 2.00;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('throwing-knife', '200% attack speed', () => {
                Knife.upgradables.timeout *= 0.5;
                this.game.inventory.forEach(weapon => {
                    if (weapon instanceof Knife) {
                        weapon.timeout = Knife.upgradables.timeout;
                    }
                });
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('stick', '2x bounces', () => {
                Stick.upgradables.maxHitCount *= 2.00;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('stick', '200% damage', () => {
                Stick.upgradables.damage *= 2.00;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('stick', '200% speed', () => {
                Stick.upgradables.throwSpeed *= 2.00;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('stick', '200% attack speed', () => {
                Stick.upgradables.timeout *= 0.5;
                this.game.inventory.forEach(weapon => {
                    if (weapon instanceof Stick) {
                        weapon.timeout = Stick.upgradables.timeout;
                    }
                });
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('log', '200% damage', () => {
                WoodLog.upgradables.damage *= 2.00;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('log', '200% speed', () => {
                WoodLog.upgradables.speed *= 2.00;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),
        ];
    }

}

export { UpgradeHandler };