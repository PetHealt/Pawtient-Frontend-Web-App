import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

// Usamos la ruta de mascotas desde .env
const petsPath = import.meta.env.VITE_PETS_ENDPOINT_PATH || '/pets';

export class ClinicApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), petsPath);
    }

    getAllPets() {
        return this.http.get(this.endpointPath);
    }

    // PATCH para actualizar sin borrar datos
    updatePet(id, petData) {
        return this.http.patch(`${this.endpointPath}/${id}`, petData);
    }

    deletePet(id) {
        return this.http.delete(`${this.endpointPath}/${id}`);
    }
}
