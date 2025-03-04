import { Bomb } from "./bomb.js";

class WeaponUtil {
    static WEAPONS = {
        [Bomb.imageSrc]: (game) => { return new Bomb(game) },
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