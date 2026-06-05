import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

const petsPath = import.meta.env.VITE_PETS_ENDPOINT_PATH || '/pets';

export class ClinicApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), petsPath);
    }

    getAllPets() {
        return this.http.get(this.endpointPath);
    }

    createPet(petData) {
        return this.http.post(this.endpointPath, this.toBackendPet(petData));
    }

    updatePet(id, petData) {
        return this.http.put(`${this.endpointPath}/${id}`, this.toBackendPet(petData));
    }

    deletePet(id) {
        return this.http.delete(`${this.endpointPath}/${id}`);
    }

    toBackendPet(petData) {
        return {
            name: petData.name,
            species: petData.species ?? petData.type,
            breed: petData.breed,
            age: Number(petData.age) || 0
        };
    }
}
