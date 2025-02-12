class AssetHandler {
    static instance = undefined;
    imageMap = {};

    constructor() {
        if (AssetHandler.instance) {
            throw Error('Only one instance of AssetHandler is allowed');
        }
        AssetHandler.instance = this;
    }


    loadImage(key, src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                this.imageMap[key] = img;
                resolve(img);
            };
        });
    }

    async loadAllImages() {
        this.imageMap = {
            'bomb': 'assets/bomb.png',
        }
        // replace the imageMap src with the actual image
        await Promise.all(Object.entries(this.imageMap).map(([key, src]) => this.loadImage(key, src)));
    }

    getImage(name) {
        return this.imageMap[name];
    }
}

export { AssetHandler };