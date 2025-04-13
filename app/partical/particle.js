class Particle {
    
    constructor(x, y, lifetime) {
        this.x = x;
        this.y = y;
        this.lifetime = lifetime;
    }

    update_and_render() {
        this.lifetime--;
    }
}

export { Particle };