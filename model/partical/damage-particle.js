import { Particle } from "./particle.js";

class DamageParticle extends Particle {
    
    constructor(x, y, vx, vy, lifetime) {
        super(x, y, lifetime);
        this.vx = vx;
        this.vy = vy;
    }

    update_and_render(ctx, camera) {
        super.update_and_render();
        this.x += this.vx;
        this.y += this.vy;

        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        const relativePosition = camera.getRelativePosition(this);
        ctx.beginPath();
        ctx.arc(relativePosition.x, relativePosition.y, 3, 0, 2 * Math.PI)
        ctx.fill();
        ctx.stroke();
    }
}

export { DamageParticle };