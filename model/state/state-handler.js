class StateHandler {

    states = {
        game: 'GAME',
        upgrade: 'UPGRADE',
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
            case this.states.pause:
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
            case this.states.pause:
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
}

export { StateHandler };