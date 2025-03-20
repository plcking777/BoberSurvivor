import { UIPanel } from './elements/ui-panel.js';
import { UIButton } from './elements/ui-button.js';
import { UIXPBar } from './elements/game/ui-xpbar.js';
import { UIItemUpgrade } from './elements/game/ui-item-upgrade.js';
import { UIChestSpinner } from './elements/game/ui-chest-spinner.js';
import { UILabel } from './elements/ui-label.js';
import { UIInventory } from './elements/game/ui-inventory.js';
import { UIHPBar } from './elements/game/ui-hpbar.js';
import { UIRestartButton } from './elements/game/dead-screen/ui-restart-button.js';

class UIHandler {

    uiElements = new Map();

    constructor(screenWidth, screenHeight, game) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.game = game;
        this.assetHandler = game.assetHandler;
        this.stateHandler = game.stateHandler;
    }


    setupUpgradeUI(upgrades) {
        if (this.uiElements.get('ingame.upgrade-panel') == null) {
            this.uiElements.set('ingame.upgrade-panel', new UIPanel(50, 50, this.screenWidth - 100, this.screenHeight - 100));
        }

        upgrades.forEach((upgrade, index) => {
            this.uiElements.set(`ingame.upgrade-${index}`, new UIItemUpgrade(50 + 50, 60 + 150 * index, this.screenWidth - 200, 120, upgrade, this.game));
        });
        this.sortMap();
    }

    destroyUpgradeUI() {
        this.uiElements.delete('ingame.upgrade-panel');
        let index = 0;
        while (this.uiElements.get(`ingame.upgrade-${index}`) != null) {
            this.uiElements.delete(`ingame.upgrade-${index++}`);
        }
        this.sortMap();
    }

    setupChestUpgradeUI() {
        if (this.uiElements.get('ingame.chest-upgrade-panel') == null) {
            this.uiElements.set('ingame.chest-upgrade-panel', new UIPanel(50, 50, this.screenWidth - 100, this.screenHeight - 100));
        }
        if (this.uiElements.get('ingame.chest-upgrade-spinner') == null) {
            this.uiElements.set('ingame.chest-upgrade-spinner', new UIChestSpinner(100, 100, this.game));
        }
        this.sortMap();
    }

    destroyChestUpgradeUI() {
        this.uiElements.delete('ingame.chest-upgrade-panel');
        this.uiElements.delete('ingame.chest-upgrade-spinner');
        this.sortMap();
    }


    setupInGameUI() {
        this.uiElements.set('ingame.xpbar', new UIXPBar(50, 10, this.screenWidth - 100, 35, this.game));
        this.uiElements.set('ingame.hpbar', new UIHPBar(50, 50, 200, 35, this.game));
        this.sortMap();
    }

    destroyInGameUI() {
        this.uiElements.delete('ingame.xpbar');
        this.uiElements.delete('ingame.hpbar');
        this.sortMap();
    }

    setupPauseUI() {
        this.uiElements.set('pause-menu.panel', new UIPanel(10, 10, this.screenWidth - 20, this.screenHeight - 20));
        this.uiElements.set('pause-menu.title', new UILabel(this.screenWidth / 2, 100, 'Pause'));
        this.uiElements.set('pause-menu.inventory', new UIInventory(this.screenWidth / 2, 250, this.game));
        this.sortMap();
    }

    destroyPauseUI() {
        this.uiElements.delete('pause-menu.panel', 99);
        this.uiElements.delete('pause-menu.title', 99);
        this.uiElements.delete('pause-menu.inventory', 99);
        this.sortMap();
    }


    setupDeadUI() {
        this.uiElements.set('dead-menu.panel', new UIPanel(0, 0, this.screenWidth, this.screenHeight, 100));
        this.uiElements.set('dead-menu.title', new UILabel(this.screenWidth / 2, 100, 'Game Over', 100));
        this.uiElements.set('dead-menu.restart-btn', new UIRestartButton(this.screenWidth / 2 - 75, 350, 150, 48, 'Restart', this.game, 101));
        this.sortMap();
    }

    destroyDeadUI() {
        this.uiElements.delete('dead-menu.panel');
        this.uiElements.delete('dead-menu.title');
        this.uiElements.delete('dead-menu.restart-btn');
        this.sortMap();
    }


    destroyAllIngameUI() {
        Object.keys(this.uiElements).forEach(key => {
            if (key.startsWith('ingame.')) {
                console.log('deleting ', key);
                this.uiElements.delete(key);
            }
        });
        this.sortMap();
    }



    sortMap() {
        this.uiElements = new Map([...this.uiElements].sort((a, b) => a[1].zIndex - b[1].zIndex));
    }


    update(mouseX, mouseY, click) {
        for (const [key, value] of this.uiElements) {
            value.update(mouseX, mouseY, click);
        }
    }

    render(ctx) {
        for (const [key, value] of this.uiElements) {
            value.render(ctx);
        }
    }
}

export { UIHandler };