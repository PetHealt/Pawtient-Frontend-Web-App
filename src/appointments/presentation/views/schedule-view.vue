<script setup>
import { ref, onMounted } from 'vue';
import { appointmentsStore } from "../../application/appointments.store.js";
import { Appointment } from "../../domain/model/appointment.entity.js";

const displayDialog = ref(false);
const appointment = ref(new Appointment({}));

/**
 * Opciones predefinidas para el estado de la cita.
 * Mapeamos etiquetas en español a valores técnicos consistentes con el Store.
 */
const statusOptions = ref([
  { label: 'Pendiente', value: 'scheduled' },
  { label: 'Confirmado', value: 'confirmed' },
  { label: 'Atendido', value: 'attended' }
]);

onMounted(() => appointmentsStore.loadAppointments());

const openNew = () => {
  // La entidad Appointment inicializa automáticamente el status como 'scheduled'
  appointment.value = new Appointment({});
  displayDialog.value = true;
};

const openEdit = (data) => {
  // Clonamos los datos para evitar mutaciones directas en la tabla
  appointment.value = new Appointment({ ...data });
  displayDialog.value = true;
};

const save = async () => {
  // Guarda los cambios y actualiza el Dashboard automáticamente
  await appointmentsStore.saveAppointment(appointment.value);
  displayDialog.value = false;
};

const confirmDelete = async (id) => {
  // Validación de seguridad para evitar eliminaciones accidentales
  if (confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
    await appointmentsStore.deleteAppointment(id);
  }
};
</script>

<template>
  <div class="p-4 lg:p-6">
    <div class="surface-card p-5 shadow-2 border-round">
      <div class="flex justify-content-between align-items-center mb-5">
        <div>
          <h1 class="text-3xl font-bold m-0 text-900">Agenda Médica</h1>
          <p class="text-600 m-0 mt-1">Visualiza y gestiona las citas programadas.</p>
        </div>
        <pv-button label="Nueva Cita" icon="pi pi-plus" @click="openNew" />
      </div>

      <pv-data-table :value="appointmentsStore.appointments" :loading="appointmentsStore.loading"
                     stripedRows scrollable scrollHeight="400px" class="p-datatable-sm">

        <template #empty> No hay citas registradas. </template>

        <pv-column field="date" header="Fecha" sortable style="min-width: 120px"></pv-column>
        <pv-column field="time" header="Hora" style="min-width: 100px"></pv-column>
        <pv-column field="petName" header="Paciente" class="font-bold" style="min-width: 150px"></pv-column>
        <pv-column field="ownerName" header="Dueño" style="min-width: 150px"></pv-column>

        <pv-column field="status" header="Estado" style="min-width: 130px">
          <template #body="slotProps">
            <span :class="'status-badge ' + slotProps.data.status">
              {{ slotProps.data.status === 'scheduled' ? 'Pendiente' :
                slotProps.data.status === 'confirmed' ? 'Confirmado' : 'Atendido' }}
            </span>
          </template>
        </pv-column>
        <pv-column field="amount" header="Monto (S/)" style="min-width: 100px"></pv-column>
        <pv-column header="Acciones" fixed="right" style="min-width: 120px">
          <template #body="slotProps">
            <div class="flex gap-2">
              <pv-button icon="pi pi-pencil" class="p-button-text p-button-warning" @click="openEdit(slotProps.data)" />
              <pv-button icon="pi pi-trash" class="p-button-text p-button-danger" @click="confirmDelete(slotProps.data.id)" />
            </div>
          </template>
        </pv-column>

      </pv-data-table>
    </div>

    <pv-dialog v-model:visible="displayDialog" :header="appointment.id ? 'Editar Cita' : 'Nueva Cita'"
               modal :style="{width: '450px'}">
      <div class="flex flex-column gap-3 mt-2">
        <div class="flex flex-column gap-1">
          <label class="font-semibold text-sm">Nombre Mascota</label>
          <pv-input-text v-model="appointment.petName" placeholder="Ej: Peluchín" class="w-full" />
        </div>
        <div class="flex flex-column gap-1">
          <label class="font-semibold text-sm">Nombre Dueño</label>
          <pv-input-text v-model="appointment.ownerName" placeholder="Ej: Gonzalo" class="w-full" />
        </div>
        <div class="grid">
          <div class="col-6">
            <label class="font-semibold text-sm block mb-1">Fecha</label>
            <pv-input-text v-model="appointment.date" type="date" class="w-full" />
          </div>
          <div class="col-6">
            <label class="font-semibold text-sm block mb-1">Hora</label>
            <pv-input-text v-model="appointment.time" type="time" class="w-full" />
          </div>
        </div>
        <div class="flex flex-column gap-1">
          <label class="font-semibold text-sm">Motivo de consulta</label>
          <pv-textarea v-model="appointment.reason" placeholder="Describa el motivo..." rows="3" class="w-full" />
        </div>
        <div class="flex flex-column gap-1">
          <label class="font-semibold text-sm">Estado de la Cita</label>
          <pv-select v-model="appointment.status" :options="statusOptions"
                     optionLabel="label" optionValue="value" placeholder="Seleccione estado" class="w-full" />
        </div>
        <div class="flex flex-column gap-1">
          <label class="font-semibold text-sm">Monto de la Consulta (S/)</label>
          <pv-input-number v-model="appointment.amount" placeholder="Ej: 50" class="w-full" />
        </div>

      </div>
      <template #footer>
        <pv-button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="displayDialog = false" />
        <pv-button label="Guardar Cita" icon="pi pi-check" @click="save" />
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.status-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}
/* Estilos dinámicos según el valor técnico guardado */
.status-badge.scheduled { background: #e0f2fe; color: #0369a1; }
.status-badge.confirmed { background: #dcfce7; color: #15803d; }
.status-badge.attended { background: #f1f5f9; color: #475569; }
</style>