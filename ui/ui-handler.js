import { UIPanel } from './elements/ui-panel.js';
import { UIButton } from './elements/ui-button.js';
import { UIXPBar } from './elements/game/ui-xpbar.js';
import { UIItemUpgrade } from './elements/game/ui-item-upgrade.js';
import { UIChestSpinner } from './elements/game/ui-chest-spinner.js';
import { UILabel } from './elements/ui-label.js';
import { UIInventory } from './elements/game/ui-inventory.js';
import { UIHPBar } from './elements/game/ui-hpbar.js';

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
        if (this.uiElements['ingame.upgrade-panel'] == null) {
            this.uiElements['ingame.upgrade-panel'] = new UIPanel(50, 50, this.screenWidth - 100, this.screenHeight - 100);
        }

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

    setupChestUpgradeUI() {
        if (this.uiElements['ingame.chest-upgrade-panel'] == null) {
            this.uiElements['ingame.chest-upgrade-panel'] = new UIPanel(50, 50, this.screenWidth - 100, this.screenHeight - 100);
        }
        if (this.uiElements['ingame.chest-upgrade-spinner'] == null) {
            this.uiElements['ingame.chest-upgrade-spinner'] = new UIChestSpinner(100, 100, this.game);
        }
    }

    destroyChestUpgradeUI() {
        delete this.uiElements['ingame.chest-upgrade-panel'];
        delete this.uiElements['ingame.chest-upgrade-spinner'];
    }


    setupInGameUI() {
        this.uiElements['ingame.xpbar'] = new UIXPBar(50, 10, this.screenWidth - 100, 35, this.player);
        this.uiElements['ingame.hpbar'] = new UIHPBar(50, 50, 200, 35, this.player);
    }

    destroyInGameUI() {
        delete this.uiElements['ingame.xpbar'];
        delete this.uiElements['ingame.hpbar'];
    }

    setupPauseUI() {
        this.uiElements['pause-menu.panel'] = new UIPanel(10, 10, this.screenWidth - 20, this.screenHeight - 20);
        this.uiElements['pause-menu.title'] = new UILabel(this.screenWidth / 2, 100, 'Pause');
        this.uiElements['pause-menu.inventory'] = new UIInventory(this.screenWidth / 2, 250, this.game);
    }

    destroyPauseUI() {
        delete this.uiElements['pause-menu.panel'];
        delete this.uiElements['pause-menu.title'];
        delete this.uiElements['pause-menu.inventory']
    }


    destroyAllIngameUI() {
        Object.keys(this.uiElements).forEach(key => {
            if (key.startsWith('ingame.')) {
                console.log('deleting ', key);
                delete this.uiElements[key];
            }
        })
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