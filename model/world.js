class World {

    TILE_HEIGHT = 128;


    tiles = [];


    constructor() {
        this.loadTiles();
    }

    loadTiles() {
        // TODO: custom world generation ?
        
        this.tiles = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ]
    }

    render(ctx, camera) {
        ctx.fillStyle = "green";

        for (let i = 0; i < this.tiles.length; i++) {
            const relativeYPosition = camera.getRelativeYPosition(i * this.TILE_HEIGHT);
            for (let j = 0; j < this.tiles[0].length; j++) {
                const relativeXPosition = camera.getRelativeXPosition(j * this.TILE_HEIGHT);
                ctx.fillRect(relativeXPosition, relativeYPosition, this.TILE_HEIGHT, this.TILE_HEIGHT);
            }
        }   
    }

}

export { World };