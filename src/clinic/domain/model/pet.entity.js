export class Pet {
    constructor({ id = 0, name = '', type = '', breed = '', age = 0, ownerId = 0 } = {}) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.ownerId = ownerId;
    }
}