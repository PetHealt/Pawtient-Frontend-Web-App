import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";
import { BaseApi } from "../../shared/infrastructure/base-api.js";

const frontendToBackendStatus = {
    scheduled: 'Pendiente',
    completed: 'Completada',
    cancelled: 'Cancelada'
};

export class AppointmentsApi extends BaseEndpoint {
    constructor() {
        super(new BaseApi(), "/appointments");
    }

    getAll() {
        return this.http.get(this.endpointPath);
    }

    create(data) {
        return this.http.post(this.endpointPath, this.toBackendAppointment(data));
    }

    update(id, data) {
        return this.http.put(`${this.endpointPath}/${id}`, this.toBackendAppointment(data));
    }

    delete(id) {
        return this.http.delete(`${this.endpointPath}/${id}`);
    }

    toBackendAppointment(data) {
        return {
            patient: data.patient ?? data.petName,
            owner: data.owner ?? data.ownerName,
            date: data.date,
            time: data.time,
            status: frontendToBackendStatus[data.status] ?? data.status ?? 'Pendiente',
            reason: data.reason ?? '',
            amount: Number(data.amount) || 0
        };
    }
}
