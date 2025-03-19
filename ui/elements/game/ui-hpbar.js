import { UIElement } from "../ui-element.js";

class UIHPBar extends UIElement {


    BORDER_SIZE = 5;

    constructor(x, y, width, height, player, zIndex) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.player = player;
        this.zIndex = zIndex;
    }

    update(mouseX, mouseY, click) { }

    render(ctx) {
        // border
        ctx.fillStyle = "#c9a92f";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // empty
        ctx.fillStyle = "black";
        ctx.fillRect(this.x + this.BORDER_SIZE, this.y + this.BORDER_SIZE, this.width - 2*this.BORDER_SIZE, this.height - 2*this.BORDER_SIZE);

        // fill
        ctx.fillStyle = "red";
        ctx.fillRect(this.x + this.BORDER_SIZE, this.y + this.BORDER_SIZE, Math.max(this.player.hp / this.player.maxHP, 0) * (this.width - 2*this.BORDER_SIZE), this.height - 2*this.BORDER_SIZE);
    }
}

export { UIHPBar };