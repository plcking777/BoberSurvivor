import { UIElement } from "../ui-element.js";

class UIXPBar extends UIElement {


    BORDER_SIZE = 5;

    constructor(x, y, width, height, game, zIndex = 0) {
        super(x, y);
        this.width = width;
        this.height = height;

        this.game = game;
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
        ctx.fillStyle = "purple";
        ctx.fillRect(this.x + this.BORDER_SIZE, this.y + this.BORDER_SIZE, this.game.player.xp / this.game.player.xpNextLevel * (this.width - 2*this.BORDER_SIZE), this.height - 2*this.BORDER_SIZE);
    }
}

export { UIXPBar };