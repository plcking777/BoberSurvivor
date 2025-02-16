import { Particle } from "./particle.js";

class ExplosionParticle extends Particle {
    
    constructor(x, y, vx, vy, lifetime) {
        super(x, y, lifetime);
        this.vx = vx;
        this.vy = vy;
    }

    update_and_render(ctx, camera) {
        super.update_and_render();
        this.x += this.vx;
        this.y += this.vy;

        ctx.fillStyle = "orange";
        const relativePosition = camera.getRelativePosition(this);
        ctx.fillRect(relativePosition.x, relativePosition.y, 5, 5);
    }

}

export { ExplosionParticle };