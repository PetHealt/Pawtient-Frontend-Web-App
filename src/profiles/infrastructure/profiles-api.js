import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

export class ProfilesApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), '/profile');
    }

    getProfile() {
        return this.http.get(this.endpointPath);
    }

    updateProfile(profileData) {
        return this.http.put(this.endpointPath, {
            fullName: profileData.name ?? profileData.fullName,
            email: profileData.email,
            clinicName: profileData.clinicName
        });
    }

    getDashboard() {
        return this.http.get('/dashboard');
    }
}
