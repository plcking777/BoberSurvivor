class StateHandler {

    states = {
        game: 'GAME',
        upgrade: 'UPGRADE',
        chestUpgrade: 'CHEST_UPGRADE',
        pause: 'PAUSE',
        dead: 'DEAD',
        menu: 'MENU',
    }

    currentState = this.states.game;

    constructor(game) {
        this.game = game;
    }


    switchState(newState) {
        let canSwitchState = true;
        // Handle old state
        switch (this.currentState) {
            case this.states.game:
                break;
            case this.states.upgrade:
                canSwitchState = this.fromUpgrade(newState);
                break;
            case this.states.chestUpgrade:
                canSwitchState = this.fromChestUpgrade(newState);
                break;
            case this.states.pause:
                canSwitchState = this.fromPause(newState);
                break;
            case this.states.dead:
                canSwitchState = this.fromDead(newState);
                break;
            case this.states.menu:
                break;
            default:
                throw new Error('Invalid state: ', newState);
        }

        if (!canSwitchState) {
            return;
        }
        this.currentState = newState;

        // Handle new state
        switch (newState) {
            case this.states.game:
                break;
            case this.states.upgrade:
                this.toUpgrade();
                break;
            case this.states.chestUpgrade:
                this.toChestUpgrade();
                break;
            case this.states.pause:
                this.toPause();
                break;
            case this.states.dead:
                this.toDead();
                break;
            case this.states.menu:
                break;
            default:
                throw new Error('Invalid state: ', newState);
        }
    }

    fromUpgrade(newState) {
        this.game.uiHandler.destroyUpgradeUI();
        return true;
    }

    toUpgrade() {
        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min) + min);
        }
        const upgradeCount = this.game.upgradeHandler.upgrades.length;

        this.game.uiHandler.setupUpgradeUI([
                this.game.upgradeHandler.upgrades[random(0, upgradeCount - 1)],
                this.game.upgradeHandler.upgrades[random(0, upgradeCount - 1)],
                this.game.upgradeHandler.upgrades[random(0, upgradeCount - 1)]
            ]);
    }

    fromChestUpgrade(newState) {
        switch(newState) {
            case this.states.dead:
            case this.states.menu:
            case this.states.upgrade:
            case this.states.game:
                this.game.uiHandler.destroyChestUpgradeUI();
        }
        return true;
    }

    toChestUpgrade() {
        this.game.uiHandler.setupChestUpgradeUI();
    }


    fromPause(newState) {
        this.game.uiHandler.destroyPauseUI();
        return true;
    }

    toPause() {
        this.game.uiHandler.setupPauseUI();
    }


    fromDead(newState) {
        switch(newState) {
            case this.states.chestUpgrade:
            case this.states.pause:
            case this.states.upgrade:
                return false;
            default:
                this.game.uiHandler.destroyDeadUI();
                return true;
        }
    }

    toDead() {
        this.game.uiHandler.setupDeadUI();
    }
}

export { StateHandler };