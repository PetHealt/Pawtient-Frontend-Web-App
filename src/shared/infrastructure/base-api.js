import axios from "axios";

// Aquí usamos la variable limpia que creamos en tu .env.development
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
    }

    get http() {
        return this.#http;
    }
}