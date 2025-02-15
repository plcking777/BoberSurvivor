import { DamageParticle } from "./damage-particle.js";
import { ExplosionParticle } from "./explosion-particle.js";
import { DamageNumbersParticle } from "./damage-numbers-particle.js";

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}




class ParticleHandler {

    DAMAGE_PARTICLE_COUNT = 1;
    EXPLOSION_PARTICLE_COUNT = 100;



    constructor() {
        this.particles = [];
    }

    
    update_and_render(ctx, camera) {
        // Lifetime

        let i = 0;
        let aliveParticles = this.particles.length;

        while (i < aliveParticles) {
            // Check if lifetime is up
            let current_particle = this.particles[i];

            if (current_particle.lifetime <= 0) {
                aliveParticles--;
                this.swapAndPopParticle(i);
            } else {
                // we only increase i when it we didn't swap and pop
                // because otherwise the recently swapped element isn't checked
                i++;
            }
        }


        this.particles.forEach((particle) => {
            particle.update_and_render(ctx, camera);
        });
    }


    applyDamageParticles(x, y) {
        for (var i = 0; i < this.DAMAGE_PARTICLE_COUNT; i++) {

            this.particles.push(
                new DamageParticle(x, y, random(-0.7, 0.7), random(-0.7, 0.7), random(1, 100))
            );
        }
    }

    applyExplosionParticles(x, y) {
        for (var i = 0; i < this.EXPLOSION_PARTICLE_COUNT; i++) {

            this.particles.push(
                new ExplosionParticle(x, y, random(-5, 5), random(-5, 5), random(10, 45))
            );
        }
    }

    applyDamageNumbers(x, y, value) {
        this.particles.push(
            new DamageNumbersParticle(x, y, random(-0.5, 0.5), random(-1, -3), 60, value)
        );
    }


    swapAndPopParticle(index) {
        /*
        removes an particle from the list.
        swaps the particle with the last one and pops the last
        done like this because .splice is more costly
        */
        if (index < this.particles.length - 1) {
            this.particles[index] = this.particles[this.particles.length - 1];
        }
        this.particles.pop();
    }
}

export { ParticleHandler };