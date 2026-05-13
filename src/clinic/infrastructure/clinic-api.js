import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

export class ClinicApi extends BaseEndpoint {
    constructor() {
        // Apunta a tu db.json
        super(new BaseApi(), '/pets');
    }

    getAllPets() {
        return this.http.get(this.endpointPath);
    }

    // PATCH para no borrar datos por accidente
    updatePet(id, petData) {
        return this.http.patch(`${this.endpointPath}/${id}`, petData);
    }
    deletePet(id) {
        return this.http.delete(`${this.endpointPath}/${id}`);
    }
}