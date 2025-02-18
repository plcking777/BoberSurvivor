import { UIButton } from "../ui-button.js";
import { UIElement } from "../ui-element.js";

class UIItemUpgrade extends UIButton {

    constructor(x, y, width, height, upgrade) {
        super(x, y, width, height, '');
        this.upgrade = upgrade;
    }

    update(mouseX, mouseY, click) {
        super.update(mouseX, mouseY, click);
    }

    render(ctx) {
        if (this.active) {
            ctx.fillStyle = this.activeColor;
        } else if (this.hover) {
            ctx.fillStyle = this.hoverColor;
        } else {
            ctx.fillStyle = this.color;
        }

        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

    execute() {
        this.upgrade.action();
    }

    
}

export { UIItemUpgrade };