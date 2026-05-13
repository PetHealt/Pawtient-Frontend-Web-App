import { reactive, computed } from "vue";
import { AppointmentsApi } from "../infrastructure/appointments-api.js";
import { AppointmentAssembler } from "../infrastructure/appointment.assembler.js";

const appointmentsApi = new AppointmentsApi();

export const appointmentsStore = reactive({
    appointments: [],
    loading: false,

    // Propiedad corregida: Ahora reconoce ambos términos
    pendingAppointments: computed(() =>
        appointmentsStore.appointments.filter(a => a.status === 'scheduled')
    ),

    async loadAppointments() {
        this.loading = true;
        const user = JSON.parse(localStorage.getItem('currentUser')); //
        try {
            // json-server filtra automáticamente usando query params
            const response = await appointmentsApi.http.get(`${appointmentsApi.endpointPath}?clinicId=${user.clinicId}`);
            this.appointments = AppointmentAssembler.toEntitiesFromResponse(response.data);
        } finally { this.loading = false; }
    },

    async saveAppointment(appointmentData) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const dataWithOwnership = { ...appointmentData, clinicId: user.clinicId }; //

        if (dataWithOwnership.id && dataWithOwnership.id !== 0) {
            await appointmentsApi.update(dataWithOwnership.id, dataWithOwnership);
        } else {
            const { id, ...newData } = dataWithOwnership;
            await appointmentsApi.create(newData);
        }
        await this.loadAppointments();
    },

    async deleteAppointment(id) {
        // Validamos que el ID no sea nulo antes de intentar borrar
        if (id === undefined || id === null || id === 0) {
            console.error("ID no válido para eliminar");
            return;
        }
        try {
            await appointmentsApi.delete(id);
            this.appointments = this.appointments.filter(a => a.id !== id);
        } catch (error) { console.error("Error deleting:", error); }
    }
});