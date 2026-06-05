import axios from "axios";

const platformApi = import.meta.env.VITE_API_BASE_URL;

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
