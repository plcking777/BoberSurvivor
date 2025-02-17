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
        this.currentState = newState;
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

    toUpgrade() {
        this.game.uiHandler.setupUpgradeUI();
    }
}

export { StateHandler };