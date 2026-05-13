import { Appointment } from "../domain/model/appointment.entity.js";

export class AppointmentAssembler {
    /**
     * @param {Object} resource
     * @returns {Appointment}
     */
    static toEntityFromResource(resource) {
        return new Appointment(resource);
    }

    /**
     * @param {Array} resources
     * @returns {Array<Appointment>}
     */
    static toEntitiesFromResponse(resources) {
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}