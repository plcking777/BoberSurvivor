import { UIElement } from "../ui-element.js";

class UIInventory extends UIElement {

    constructor(x, y, game, zIndex = 0) {
        super(x, y);
        this.game = game;
        this.size = 64;
        this.inventoryRows = 2;
        this.inventoryCols = 5;
        this.zIndex = zIndex;
    }

    render(ctx) {
        ctx.strokeStyle = "black";
        for (let row = 0; row < this.inventoryRows; row++) {
            for (let col = 0; col < this.inventoryCols; col++) {

                const index = col + row * this.inventoryCols;
                let weapon = undefined;
                if (index < this.game.inventory.length) {
                    weapon = this.game.inventory[index];
                }

                let image = undefined;

                if (weapon != undefined && weapon.constructor.imageSrc != null) {
                    image = this.game.assetHandler.getImage(weapon.constructor.imageSrc);
                }
                if (image != null) {
                    ctx.drawImage(image, Math.round(this.x + col * this.size - (this.size * this.inventoryCols / 2)), Math.round(this.y + row * this.size - (this.size * this.inventoryRows / 2)), 64, 64);
                }
                ctx.beginPath();
                ctx.lineWidth="5";
                ctx.rect(Math.round(this.x + col * this.size - (this.size * this.inventoryCols / 2)), Math.round(this.y + row * this.size - (this.size * this.inventoryRows / 2)), this.size, this.size);  
                ctx.stroke();        
            }
        }
        
    }
}

export { UIInventory };