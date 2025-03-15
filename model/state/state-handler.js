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
        
        // Handle old state
        switch (this.currentState) {
            case this.states.game:
                break;
            case this.states.upgrade:
                this.fromUpgrade();
                break;
            case this.states.chestUpgrade:
                this.fromChestUpgrade();
                break;
            case this.states.pause:
                this.fromPause();
                break;
            case this.states.dead:
                break;
            case this.states.menu:
                break;
            default:
                throw new Error('Invalid state: ', newState);
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
                break;
            case this.states.menu:
                break;
            default:
                throw new Error('Invalid state: ', newState);
        }
    }

    fromUpgrade() {
        this.game.uiHandler.destroyUpgradeUI();
    }

    toUpgrade() {
        this.game.uiHandler.setupUpgradeUI([this.game.upgradeHandler.upgrades[0], this.game.upgradeHandler.upgrades[1]]);
    }

    fromChestUpgrade() {
        this.game.uiHandler.destroyChestUpgradeUI();
    }

    toChestUpgrade() {
        this.game.uiHandler.setupChestUpgradeUI();
    }


    fromPause() {
        this.game.uiHandler.destroyPauseUI();
    }

    toPause() {
        this.game.uiHandler.setupPauseUI();
    }
}

export { StateHandler };