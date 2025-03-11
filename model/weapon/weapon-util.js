import { Bomb } from "./bomb.js";
import { Knife } from "./knife.js";

class WeaponUtil {
    static WEAPONS = {
        [Bomb.imageSrc]: (game) => { return new Bomb(game) },
        [Knife.imageSrc]: (game) => { return new Knife(game) },
    };
    
    /**
     * @param {*} image 
     * @returns callback of the constructor of the weapon
     */
    static getWeaponFromImage(image) {
        return this.WEAPONS[image];
    }
}

export { WeaponUtil };