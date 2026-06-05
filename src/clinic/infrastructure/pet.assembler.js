import { Pet } from "../domain/model/pet.entity.js";

export class PetAssembler {
    static toEntityFromResource(resource) {
        return new Pet({
            ...resource,
            type: resource.type ?? resource.species ?? ''
        });
    }

    static toEntitiesFromResources(resources) {
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
