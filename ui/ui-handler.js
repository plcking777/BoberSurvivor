import { UIPanel } from './elements/ui-panel.js';
import { UIButton } from './elements/ui-button.js';
import { UIXPBar } from './elements/game/ui-xpbar.js';

class UIHandler {

    uiElements = {};

    constructor(screenWidth, screenHeight, player) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.player = player;
    }


    setupInGameUI() {
        // upgrade menu
        this.uiElements['ingame.upgrade-panel'] = new UIPanel(50, 50, 100, 100);
        this.uiElements['ingame.upgrade-button'] = new UIButton(50, 50, 70, 30, "button");
        

        this.uiElements['ingame.xpbar'] = new UIXPBar(50, 10, this.screenWidth - 100, 35, this.player);
    }

    destroyInGameUI() {
        delete this.uiElements['ingame.upgrade-panel'];
        delete this.uiElements['ingame.upgrade-button'];
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