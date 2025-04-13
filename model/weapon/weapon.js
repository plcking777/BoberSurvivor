class Weapon {
    static imageSrc = 'no-image';
    static upgradables = {};

    constructor(timeout, entityList) {
        this.timeout = timeout;
        this.entityList = entityList;
        this.frameCount = 0;
    }

    update(player) {
        this.frameCount++;
        if (this.frameCount >= this.timeout) {
            this.activate(player);
        }
    }

    render(ctx, camera) {
        throw new Error("Method 'render(ctx, camera)' must be implemented.");
    }

    activate(player) {
        this.frameCount = 0;
    }

    static initDefaultUpgradables() {
        throw new Error("Method 'initDefaultUpgradables()' must be implemented.");
    }
}

export { Weapon };