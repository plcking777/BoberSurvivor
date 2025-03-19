import { UIElement } from "./ui-element.js";

class UILabel extends UIElement {
    constructor(x, y, text, zIndex = 0) {
        super(x, y);
        this.text = text;
        this.zIndex = zIndex;
    }

    update(mouseX, mouseY, click) {}

    render(ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
    }
}

export { UILabel };