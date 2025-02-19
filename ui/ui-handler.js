import { UIPanel } from './elements/ui-panel.js';
import { UIButton } from './elements/ui-button.js';
import { UIXPBar } from './elements/game/ui-xpbar.js';
import { UIItemUpgrade } from './elements/game/ui-item-upgrade.js';

class UIHandler {

    uiElements = {};

    constructor(screenWidth, screenHeight, game) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.game = game;
        this.player = game.player;
        this.assetHandler = game.assetHandler;
        this.stateHandler = game.stateHandler;
    }


    setupUpgradeUI(upgrades) {
        this.uiElements['ingame.upgrade-panel'] = new UIPanel(50, 50, this.screenWidth - 100, this.screenHeight - 100);

        upgrades.forEach((upgrade, index) => {
            this.uiElements[`ingame.upgrade-${index}`] = new UIItemUpgrade(50 + 50, 60 + 150 * index, this.screenWidth - 200, 120, upgrade, this.game);
        });
    }

    destroyUpgradeUI() {
        delete this.uiElements['ingame.upgrade-panel'];
        let index = 0;
        while (this.uiElements[`ingame.upgrade-${index}`] != null) {
            delete this.uiElements[`ingame.upgrade-${index++}`];
        }
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