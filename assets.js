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
            'bomb-f1': 'assets/bomb-f1.png',
            'bomb-f2': 'assets/bomb-f2.png',
            'bomb-f3': 'assets/bomb-f3.png',
            'bomb-f4': 'assets/bomb-f4.png',

            'ghost-f1': 'assets/ghost-f1.png',

            'gem': 'assets/gem.png',

            'bober-f1': 'assets/bober-f1.png',
            'bober-f2': 'assets/bober-f2.png',

        }
        // replace the imageMap src with the actual image
        await Promise.all(Object.entries(this.imageMap).map(([key, src]) => this.loadImage(key, src)));
    }

    getImage(name) {
        return this.imageMap[name];
    }
}

export { AssetHandler };