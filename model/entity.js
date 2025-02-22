let entityId = 0;


class Entity {
    constructor(x, y, width, height, collisionEnabled, offsetX = 0, offsetY = 0, collisionWidth = width, collisionHeight = height) {
        this.id = entityId++;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collisionEnabled = collisionEnabled;
        this.collisionBox = new CollisionBox(x + offsetX, y + offsetY, collisionWidth, collisionHeight);
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.collisionWidth = collisionWidth;
        this.collisionHeight = collisionHeight;
    }

    update() {
        this.collisionBox.update(this.x + this.offsetX, this.y + this.offsetY, this.collisionWidth, this.collisionHeight);
    }


    get centerX() {
        return this.x + this.width / 2;
    }

    get centerY() {
        return this.y + this.height / 2;
    }
}

class EntityUtil {
    static addToEntityList(entity, entityList) {
        entityList[entity.id] = entity;
    }
    static removeFromEntityList(entity, entityList) {
        delete entityList[entity.id];
    }
}

class CollisionBox {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collidesWith(collisionBox) {
        if (this.x < collisionBox.x + collisionBox.width && this.x + this.width > collisionBox.x &&
            this.y < collisionBox.y + collisionBox.height && this.y + this.height > collisionBox.y) {
                return true;
        }
        return false;
    }
}

export { Entity, EntityUtil, CollisionBox };