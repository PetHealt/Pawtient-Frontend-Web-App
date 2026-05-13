import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

/**
 * Servicio de API para gestionar las operaciones CRUD de las citas veterinarias.
 */
export class AppointmentsApi extends BaseEndpoint {
    /**
     * Inicializa la clase y establece la ruta base para las peticiones de citas.
     */
    constructor() {
        super(new BaseApi(), "/appointments");
    }
    /**
     * Obtiene una lista completa de todas las citas programadas, ademas de crear nuevas citas, actualizar y por ultimo eliminar
     */
    getAll() { return this.http.get(this.endpointPath); }
    create(data) { return this.http.post(this.endpointPath, data); }
    update(id, data) { return this.http.put(`${this.endpointPath}/${id}`, data); }
    delete(id) { return this.http.delete(`${this.endpointPath}/${id}`); }
}
