class WeaponEntity {

    constructor() {
    }

    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    render(ctx, camera) {
        throw new Error("Method 'render(ctx, camera)' must be implemented.");
    }

}