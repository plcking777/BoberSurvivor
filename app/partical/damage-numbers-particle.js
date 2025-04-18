import { Particle } from './particle.js';

class DamageNumbersParticle extends Particle {

    constructor(x, y, vx, vy, lifetime, value) {
        super(x, y, lifetime);
        this.vx = vx;
        this.vy = vy;
        this.value = Math.floor(value);
    }

    update_and_render(ctx, camera) {
        super.update_and_render();
        this.x += this.vx;
        this.y += this.vy;

        this.vy += 0.2;

        ctx.font = "20px Arial";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";

        const relativePosition = camera.getRelativePosition(this);

        ctx.fillText(this.value, relativePosition.x, relativePosition.y);
    }

}

export { DamageNumbersParticle };