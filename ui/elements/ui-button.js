import { UIElement } from "./ui-element.js";

class UIButton extends UIElement {
    constructor(x, y, width, height, text) {
        super(x, y);
        this.width = width;
        this.height = height;

        this.prevClick = false;
        this.hover = false;
        this.active = false;

        this.text = text;
        this.color = "red";
        this.hoverColor = "blue";
        this.activeColor = "purple";
    }

    update(mouseX, mouseY, click) {

        console.log('mouseX: ', mouseX);
        console.log('mouseY: ', mouseY);
        if (mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height
        ) {
            if (click) {
                this.active = true;
                this.hover = false;
            } else {
                this.active = false;
                this.hover = true;
            }
        } else {
            this.hover = false;
            this.active = false;
        }

        // on mouse button release
        if (this.prevClick && !click) {
            this.execute();
        }
        this.prevClick = click;
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
        console.log('button exec');
    }
}

export { UIButton };