import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

// Leemos la ruta exacta de los usuarios desde tu .env (/users)
const usersPath = import.meta.env.VITE_USERS_ENDPOINT_PATH || '/users';

export class AuthApi extends BaseEndpoint {
    constructor() {
        // Ahora se conectará a http://localhost:3001 + /users
        super(new BaseApi(), usersPath);
    }

    getUserByEmail(email) {
        return this.http.get(`${this.endpointPath}?email=${email}`);
    }

    registerUser(userData) {
        return this.http.post(this.endpointPath, userData);
    }
}