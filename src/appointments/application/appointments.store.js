import { reactive, computed } from "vue";
import { AppointmentsApi } from "../infrastructure/appointments-api.js";
import { AppointmentAssembler } from "../infrastructure/appointment.assembler.js";

const appointmentsApi = new AppointmentsApi();

export const appointmentsStore = reactive({
    appointments: [],
    loading: false,

    pendingAppointments: computed(() =>
        appointmentsStore.appointments.filter(a => a.status === 'scheduled')
    ),

    async loadAppointments() {
        this.loading = true;
        try {
            const response = await appointmentsApi.getAll();
            this.appointments = AppointmentAssembler.toEntitiesFromResponse(response.data);
        } finally {
            this.loading = false;
        }
    },

    async saveAppointment(appointmentData) {
        if (appointmentData.id && appointmentData.id !== 0) {
            await appointmentsApi.update(appointmentData.id, appointmentData);
        } else {
            await appointmentsApi.create(appointmentData);
        }
        await this.loadAppointments();
    },

    async deleteAppointment(id) {
        if (id === undefined || id === null || id === 0) {
            console.error("ID no válido para eliminar");
            return;
        }
        try {
            await appointmentsApi.delete(id);
            this.appointments = this.appointments.filter(a => a.id !== id);
        } catch (error) {
            console.error("Error deleting:", error);
        }
    }
});
