class StateHandler {

    states = {
        game: 'GAME',
        upgrade: 'UPGRADE',
        pause: 'PAUSE',
        dead: 'DEAD',
        menu: 'MENU',
    }

    currentState = this.states.game;


    switchState(newState) {
        this.currentState = newState;
        switch (newState) {
            case this.states.game:
                break;
            case this.states.upgrade:
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
}

export { StateHandler };