class World {

    TILE_HEIGHT = 128;


    tiles = [];


    constructor() {
        this.loadTiles();
    }

    loadTiles() {
        // TODO: custom world generation ?
        this.tiles = Array.from({ length: 1000 }, () => Array(1000).fill(0));
    }

    render(ctx, camera) {
        ctx.fillStyle = "green";


        const cameraLeft = camera.x - camera.width / 2;
        const cameraRight = camera.x + camera.width / 2;
        const cameraTop = camera.y - camera.height / 2;
        const cameraBottom = camera.y + camera.height / 2;


        for (let i = parseInt(cameraTop / this.TILE_HEIGHT); i < parseInt(cameraBottom / this.TILE_HEIGHT) + 1; i++) {
            for (let j = parseInt(cameraLeft / this.TILE_HEIGHT); j < parseInt(cameraRight / this.TILE_HEIGHT) + 1; j++) {
                if (i > 0 && i < this.tiles.length && j > 0 && j < this.tiles[0].length) {
                    const relativePosition = camera.getRelativeXYPosition(j*this.TILE_HEIGHT, i*this.TILE_HEIGHT);
                    ctx.fillRect(relativePosition.x, relativePosition.y, this.TILE_HEIGHT, this.TILE_HEIGHT);
                }
            }
        }   
    }

}

export { World };