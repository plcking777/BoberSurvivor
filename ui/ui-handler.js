import { UIPanel } from './elements/ui-panel.js';
import { UIButton } from './elements/ui-button.js';
import { UIXPBar } from './elements/game/ui-xpbar.js';
import { UIItemUpgrade } from './elements/game/ui-item-upgrade.js';

class UIHandler {

    uiElements = {};

    constructor(screenWidth, screenHeight, game) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.player = game.player;
        this.assetHandler = game.assetHandler;
        this.stateHandler = game.stateHandler;
    }


    setupUpgradeUI(upgrades) {
        this.uiElements['ingame.upgrade-panel'] = new UIPanel(50, 50, this.screenWidth - 100, this.screenHeight - 100);

        upgrades.forEach((upgrade, index) => {
            this.uiElements[`ingame.upgrade-${index}`] = new UIItemUpgrade(this.screenWidth - 160, 60 + 100 * index, 50, 50, upgrade);
        });
    }

    destroyUpgradeUI() {
        delete this.uiElements['ingame.upgrade-panel'];
        // TODO
    }


    setupInGameUI() {
        console.log(this.player);
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