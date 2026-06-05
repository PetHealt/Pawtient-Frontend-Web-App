import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

export class AuthApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), '/auth');
    }

    signIn(credentials) {
        return this.http.post(`${this.endpointPath}/sign-in`, credentials);
    }

    signUp(userData) {
        return this.http.post(`${this.endpointPath}/sign-up`, userData);
    }

    getMe() {
        return this.http.get(`${this.endpointPath}/me`);
    }

    selectPlan(planName) {
        return this.http.put('/plans/current', { planName });
    }

    updateProfile(profileData) {
        return this.http.put('/profile', profileData);
    }

    deleteAccount() {
        return this.http.delete('/account');
    }
}
