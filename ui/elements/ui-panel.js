import { UIElement } from "./ui-element.js";

class UIPanel extends UIElement {
    
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }

    update(mouseX, mouseY, click) {}

    render(ctx) {
        console.log('foiidsfkjdsn')
        ctx.fillStyle = "#695637";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { UIPanel };