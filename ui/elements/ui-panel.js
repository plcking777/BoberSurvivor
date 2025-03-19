import { UIElement } from "./ui-element.js";

class UIPanel extends UIElement {
    
    constructor(x, y, width, height, zIndex = 0) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.zIndex = zIndex;
    }

    update(mouseX, mouseY, click) {}

    render(ctx) {
        ctx.fillStyle = "#695637";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { UIPanel };