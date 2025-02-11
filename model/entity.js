let entityId = 0;


class Entity {
    constructor() {
        this.id = entityId++;
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

export { Entity, EntityUtil };