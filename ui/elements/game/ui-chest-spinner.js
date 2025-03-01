import { UIElement } from "../ui-element.js";

class UIChestSpinner extends UIElement {
    
    VISIBLE_SLOTS = 3;

    constructor(x, y, game) {
        super(x, y);
        this.width = this.VISIBLE_SLOTS * 96;
        this.height = 64;
        this.game = game;
        this.assetHandler = game.assetHandler;

        this.spinIndex = 0;
        this.spinOffset = 0;

        this.weaponImages = ['bomb-f1', 'bomb-f1', 'bomb-f1', 'bomb-f1'];
        this.frameCount = 0;
     }


    update(mouseX, mouseY, click) {
        this.frameCount++;
        this.spinOffset++;
    }

    render(ctx) {

        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);


        for (let i = 0; i < this.VISIBLE_SLOTS + 1; i++) {
            const xPos = this.x + this.spinOffset + 96*i - 96;
            const index = (this.spinIndex + i) % this.weaponImages.length;
            //ctx.drawImage(this.assetHandler.getImage(this.weaponImages[index]), xPos, this.y, 64, 64);
            
            const cropX = Math.max(Math.min(this.x + this.width - xPos, 64), 0);
            ctx.drawImage(
                this.assetHandler.getImage(this.weaponImages[index]), 
                0, 0, cropX, 64,
                xPos, this.y, cropX, 64
              );



            if (i >= this.VISIBLE_SLOTS-1 && xPos >= this.x + this.width) {
                this.spinIndex += this.VISIBLE_SLOTS + 1;
                this.spinOffset = 0;
            }
        }
        
    }
}

export { UIChestSpinner };