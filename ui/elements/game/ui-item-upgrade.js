import { UIButton } from "../ui-button.js";

class UIItemUpgrade extends UIButton {

    constructor(x, y, width, height, upgrade, game, zIndex = 0) {
        super(x, y, width, height, upgrade.description);
        this.upgrade = upgrade;
        this.assetHandler = game.assetHandler;

        this.color = "black";
        this.hoverColor = "white";

        this.zIndex = zIndex;
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

        // image
        ctx.drawImage(this.assetHandler.getImage(this.upgrade.image), this.x + 25, this.y + 25, 64, 64);


        // description
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
        this.upgrade.action();
    }

    
}

export { UIItemUpgrade };