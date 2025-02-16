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


    setupUpgradeUI() {
        this.uiElements['ingame.upgrade-panel'] = new UIPanel(50, 50, this.screenWidth - 100, this.screenHeight - 100);
        this.uiElements['ingame.upgrade-item1'] = new UIButton(this.screenWidth - 160, 60, 50, 50, "item1");
        this.uiElements['ingame.upgrade-item2'] = new UIButton(this.screenWidth - 160, 160, 50, 50, "item2");
        this.uiElements['ingame.upgrade-item3'] = new UIButton(this.screenWidth - 160, 260, 50, 50, "item3");    
    }

    destroyUpgradeUI() {
        delete this.uiElements['ingame.upgrade-panel'];
        delete this.uiElements['ingame.upgrade-item1'];
        delete this.uiElements['ingame.upgrade-item2'];
        delete this.uiElements['ingame.upgrade-item3'];
    }


    setupInGameUI() {
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