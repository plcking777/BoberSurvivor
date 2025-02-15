let entityId = 0;


class Entity {
    constructor(x, y, width, height, collisionEnabled) {
        this.id = entityId++;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collisionEnabled = collisionEnabled;
        this.collisionBox = new CollisionBox(x, y, this.width, this.height);
    }

    update() {
        this.collisionBox.update(this.x, this.y, this.width, this.height);
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