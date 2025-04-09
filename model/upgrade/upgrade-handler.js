import { Bomb } from "../weapon/bomb.js";
import { Upgrade } from "./upgrade.js";
import { Knife } from "../weapon/knife.js";
import { Stick } from "../weapon/stick.js";

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

            new Upgrade('bomb-f1', '200% attack speed', () => {
                const bomb = this.game.inventory.find(item => item instanceof Bomb);
                if (bomb) {
                    bomb.timeout *= 0.5;
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

            new Upgrade('throwing-knife', '200% speed', () => {
                const knife = this.game.inventory.find(item => item instanceof Knife);
                if (knife) {
                    knife.damage *= 2.00; // TODO
                }
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('throwing-knife', '200% attack speed', () => {
                const knife = this.game.inventory.find(item => item instanceof Knife);
                if (knife) {
                    knife.timeout *= 0.5;
                }
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('stick', '2x bounces', () => {
                Stick.upgradables.maxHitCount *= 2.00;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('stick', '200% damage', () => { // TODO
                Stick.upgradables.damage *= 2.00;
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('stick', '200% speed', () => { // TODO
                const stick = this.game.inventory.find(item => item instanceof Stick);
                if (stick) {
                    stick.damage *= 2.00;
                }
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),

            new Upgrade('stick', '200% attack speed', () => { // TODO
                const stick = this.game.inventory.find(item => item instanceof Stick);
                if (stick) {
                    stick.timeout *= 0.5;
                }
                this.game.stateHandler.switchState(this.game.stateHandler.states.game);
            }),
        ];
    }

}

export { UpgradeHandler };