import { WeaponUtil } from "../../../model/weapon/weapon-util.js";
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

        this.velocity = 30;
        this.spinningDone = false;

        this.weaponImages = ['bomb-f1', 'throwing-knife', 'throwing-knife', 'throwing-knife', 'throwing-knife'];
     }


    update(mouseX, mouseY, click) {
        this.velocity = Math.max(this.velocity * 0.995, 0.00);
        this.spinOffset += this.velocity;


        if (this.velocity <= 0.05 && !this.spinningDone) {
            this.selectItem();
            this.velocity = 0;
            this.spinningDone = true;
        }
    }

    render(ctx) {

        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);


        for (let i = 0; i < this.VISIBLE_SLOTS + 1; i++) {
            const xPos = this.x + this.spinOffset + 96*i - 96;
            const index = (this.spinIndex + i) % this.weaponImages.length;
            
            const cropX = Math.max(Math.min(this.x - xPos, 64), 0);
            const cropWidth = Math.max(Math.min(this.x + this.width - xPos, 64), 0);
            ctx.drawImage(
                this.assetHandler.getImage(this.weaponImages[index]), 
                cropX, 0, cropWidth, 64,
                xPos + cropX, this.y, cropWidth, 64
              );



            if (i >= this.VISIBLE_SLOTS-1 && xPos >= this.x + this.width) {
                this.spinIndex += this.weaponImages.length - 1;
                this.spinOffset = 0;
            }
        }

        ctx.drawImage(this.assetHandler.getImage('select-square'), this.x + (this.width / 2 - 32), this.y, 64, 64);
    }

    selectItem() {
        let minX = Number.MAX_SAFE_INTEGER;
        let index = undefined;

        const spinnerCenter = this.x + this.width / 2; 
        // Get closest item
        for (let i = 0; i < this.VISIBLE_SLOTS + 1; i++) {
            const centerX = this.x + this.spinOffset + 96*i - 48;
            const diffX = Math.abs(spinnerCenter - centerX);

            if (diffX < minX) {
                minX = diffX;
                index = i;
            }
        }

        if (index == null) {
            console.error('Failed to get item from spin');
        }

        this.game.inventory.push(this.getItemFromImage(this.weaponImages[(this.spinIndex + index) % this.weaponImages.length]));
        
        this.game.stateHandler.switchState(this.game.stateHandler.states.game);
        //this.game.uiHandler.destroyChestUpgradeUI();
    }


    getItemFromImage(item) {
        return WeaponUtil.getWeaponFromImage(item)(this.game);
    }
}

export { UIChestSpinner };