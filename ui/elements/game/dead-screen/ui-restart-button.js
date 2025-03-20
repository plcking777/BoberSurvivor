import { UIButton } from "../../ui-button.js";

class UIRestartButton extends UIButton {

    constructor(x, y, width, height, text, zIndex = 0) {
        super(x, y, width, height, text, zIndex);

        this.color = "black";
        this.hoverColor = "white";
    }

    update(mouseX, mouseY, click) {
        super.update(mouseX, mouseY, click);
    }

    render(ctx) {
        if (this.active) {
            ctx.fillStyle = this.activeColor;
            ctx.strokeStyle = this.activeColor;
        } else if (this.hover) {
            ctx.fillStyle = this.hoverColor;
            ctx.strokeStyle = this.hoverColor;
        } else {
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
        }

        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);


        // border
        ctx.beginPath();
        ctx.lineWidth="5";
        ctx.rect(this.x, this.y, this.width, this.height);  
        ctx.stroke();
        
    }

    execute() {
        // TODO restart the game
    }

    
}

export { UIRestartButton };