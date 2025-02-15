import { UIPanel } from './elements/ui-panel.js';
import { UIXPBar } from './elements/game/ui-xpbar.js';

class UIHandler {

    uiElements = {};

    constructor(screenWidth, screenHeight, player) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.player = player;
    }


    setupInGameUI() {
        //this.uiElements['ingame.panel'] = new UIPanel(50, 50, 100, 100);
        this.uiElements['ingame.xpbar'] = new UIXPBar(50, 10, this.screenWidth - 100, 35, this.player);
    }

    destroyInGameUI() {
        delete this.uiElements['ingame.xpbar'];
    }

    update(mouseX, mouseY, click) {
        Object.values(this.uiElements).forEach(element => {
            element.update(mouseX, mouseY, click);
        });
    }

    render(ctx) {
        Object.values(this.uiElements).forEach(element => {
            element.render(ctx);
        });
    }
}

export { UIHandler };