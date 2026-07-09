import axios from "axios";

const productionApi = "https://pawtient-api-emi25-2026-asgxedgbh8aegrdt.eastus2-01.azurewebsites.net/api/v1";
const configuredApi = import.meta.env.VITE_API_BASE_URL;
const platformApi = configuredApi && !configuredApi.includes("pawtient-fake-api")
    ? configuredApi
    : productionApi;

export class BaseApi {
    #http;

    constructor() {
        this.#http = axios.create({
            baseURL: platformApi,
            headers: {
                "Content-type": "application/json",
            }
        });

        this.#http.interceptors.request.use((config) => {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            }
            return config;
        });
    }

    get http() {
        return this.#http;
    }
}
