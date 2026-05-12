import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

// Usamos la ruta de usuarios ya que ahí guardamos el perfil por ahora
const usersPath = import.meta.env.VITE_USERS_ENDPOINT_PATH || '/users';

export class ProfilesApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), usersPath);
    }

    /**
     * Actualiza los datos del perfil en el db.json
     * @param {string} userId
     * @param {Object} profileData
     */
    updateProfile(userId, profileData) {
        return this.http.patch(`${this.endpointPath}/${userId}`, profileData);
    }
}