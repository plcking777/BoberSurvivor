class UIElement {
    constructor(x, y) {
        this.x = x;
        this.y = y;
     }

    update(mouseX, mouseY, click) {
        throw new Error("Method 'update(mouseX, mouseY, click)' must be implemented.");
    }

    render(ctx) {
        throw new Error("Method 'render(ctx)' must be implemented.");
    }

}

export { UIElement };