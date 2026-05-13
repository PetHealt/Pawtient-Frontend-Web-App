import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

export class AppointmentsApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), "/appointments");
    }

    getAll() { return this.http.get(this.endpointPath); }
    create(data) { return this.http.post(this.endpointPath, data); }
    update(id, data) { return this.http.put(`${this.endpointPath}/${id}`, data); }
    delete(id) { return this.http.delete(`${this.endpointPath}/${id}`); }
}