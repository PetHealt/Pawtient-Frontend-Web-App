import { Appointment } from "../domain/model/appointment.entity.js";

const backendToFrontendStatus = {
    Pendiente: 'scheduled',
    Completada: 'completed',
    Cancelada: 'cancelled'
};

export class AppointmentAssembler {
    static toEntityFromResource(resource) {
        return new Appointment({
            id: resource.id,
            petName: resource.petName ?? resource.patient ?? '',
            ownerName: resource.ownerName ?? resource.owner ?? '',
            date: resource.date,
            time: resource.time,
            status: backendToFrontendStatus[resource.status] ?? resource.status ?? 'scheduled',
            reason: resource.reason ?? '',
            amount: resource.amount ?? 0
        });
    }

    static toEntitiesFromResponse(resources) {
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
