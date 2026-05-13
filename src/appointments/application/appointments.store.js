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
        try {
            const response = await appointmentsApi.getAll();
            this.appointments = AppointmentAssembler.toEntitiesFromResponse(response.data);
        } finally { this.loading = false; }
    },

    async saveAppointment(appointmentData) {
        try {
            // Si el ID es 0 o no existe, es una creación
            if (appointmentData.id && appointmentData.id !== 0) {
                await appointmentsApi.update(appointmentData.id, appointmentData);
            } else {
                // Eliminamos el ID 0 para que la DB asigne uno real
                const { id, ...newData } = appointmentData;
                await appointmentsApi.create(newData);
            }
            await this.loadAppointments();
        } catch (error) { console.error("Error saving:", error); }
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