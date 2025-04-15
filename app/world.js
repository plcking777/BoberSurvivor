class World {

    TILE_HEIGHT = 128;
    TILE_COUNT = 10;

    TILE_FRAMES = 2;

    tiles = [];


    constructor(game) {
        this.assetHandler = game.assetHandler;
        this.loadTiles();
    }

    loadTiles() {
        // TODO: custom world generation ?

        const random = (min, max) => {
            return Math.random() * (max - min) + min;
        }

        this.tiles = [];

        for (let i = 0; i < this.TILE_COUNT; i++) {
            let tileRow = [];
            for (let j = 0; j < this.TILE_COUNT; j++) {
                tileRow.push(Math.floor(random(1, 3)));
            }
            this.tiles.push(tileRow);
        }
        
    }

    render(ctx, camera) {
        const cameraLeft = camera.x - camera.width / 2;
        const cameraRight = camera.x + camera.width / 2;
        const cameraTop = camera.y - camera.height / 2;
        const cameraBottom = camera.y + camera.height / 2;


        for (let i = parseInt(cameraTop / this.TILE_HEIGHT); i < parseInt(cameraBottom / this.TILE_HEIGHT) + 1; i++) {
            for (let j = parseInt(cameraLeft / this.TILE_HEIGHT); j < parseInt(cameraRight / this.TILE_HEIGHT) + 1; j++) {
                if (i >= 0 && i < this.tiles.length && j >= 0 && j < this.tiles[0].length) {
                    const relativePosition = camera.getRelativeXYPosition(j*this.TILE_HEIGHT, i*this.TILE_HEIGHT);
                    ctx.drawImage(this.assetHandler.getImage(`grass-f${this.tiles[i][j]}`), Math.round(relativePosition.x), Math.round(relativePosition.y), this.TILE_HEIGHT + 1, this.TILE_HEIGHT + 1);
                }
            }
        }   
    }

}

export { World };