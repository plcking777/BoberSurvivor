import { UIPanel } from './elements/ui-panel.js';

class UIHandler {

    uiElements = {};

    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }


    setupInGameUI() {
        this.uiElements['ingame.panel'] = new UIPanel(50, 50, 100, 100);
    }

    destroyInGameUI() {
        delete this.uiElements['ingame.panel'];
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