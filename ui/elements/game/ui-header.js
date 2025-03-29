import { UILabel } from "../ui-label.js";

class UIHeader extends UILabel {
    constructor(x, y, text, zIndex = 0) {
        super(x, y, text, zIndex);
    }

    render(ctx) {
        ctx.font = "48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
    }
}

export { UIHeader };