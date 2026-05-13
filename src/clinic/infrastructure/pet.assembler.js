import { Pet } from "../domain/model/pet.entity.js";

export class PetAssembler {
    static toEntityFromResource(resource) {
        return new Pet(resource);
    }

    static toEntitiesFromResources(resources) {
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}