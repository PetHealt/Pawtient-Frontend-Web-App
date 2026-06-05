<script setup>
import { ref, onMounted } from 'vue';
import { appointmentsStore } from "../../application/appointments.store.js";
import { Appointment } from "../../domain/model/appointment.entity.js";

const displayDialog = ref(false);
const appointment = ref(new Appointment({}));

const statusOptions = ref([
  { label: 'Pendiente', value: 'scheduled' },
  { label: 'Confirmado', value: 'confirmed' },
  { label: 'Atendido', value: 'attended' }
]);

onMounted(() => appointmentsStore.loadAppointments());

const openNew = () => {
  appointment.value = new Appointment({});
  displayDialog.value = true;
};

const openEdit = (data) => {
  appointment.value = new Appointment({ ...data });
  displayDialog.value = true;
};

const save = async () => {
  await appointmentsStore.saveAppointment(appointment.value);
  displayDialog.value = false;
};

const confirmDelete = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
    await appointmentsStore.deleteAppointment(id);
  }
};
</script>

<template>
  <div class="p-4 lg:p-6">
    <div class="clinic-card">
      <div class="flex justify-content-between align-items-center mb-5">
        <div>
          <h1 class="text-3xl font-bold m-0 text-gray-800">Agenda Médica</h1>
          <p class="text-gray-500 m-0 mt-1">Visualiza y gestiona las citas programadas.</p>
        </div>
        <pv-button label="Nueva Cita" icon="pi pi-plus" class="btn-primary-clinic" @click="openNew" />
      </div>

      <pv-data-table :value="appointmentsStore.appointments" :loading="appointmentsStore.loading"
                     stripedRows scrollable scrollHeight="400px" class="clinic-table">

        <template #empty> <div class="p-4 text-center text-gray-500">No hay citas registradas en el sistema.</div> </template>

        <pv-column field="date" header="Fecha" sortable style="min-width: 120px"></pv-column>
        <pv-column field="time" header="Hora" style="min-width: 100px"></pv-column>
        <pv-column field="petName" header="Paciente" class="font-bold text-blue-600" style="min-width: 150px"></pv-column>
        <pv-column field="ownerName" header="Dueño" style="min-width: 150px"></pv-column>

        <pv-column field="status" header="Estado" style="min-width: 130px">
          <template #body="slotProps">
            <span :class="'status-badge ' + slotProps.data.status">
              {{ slotProps.data.status === 'scheduled' ? 'Pendiente' :
                slotProps.data.status === 'confirmed' ? 'Confirmado' : 'Atendido' }}
            </span>
          </template>
        </pv-column>
        <pv-column field="amount" header="Monto" style="min-width: 100px">
          <template #body="slotProps">S/ {{ slotProps.data.amount }}</template>
        </pv-column>
        <pv-column header="Acciones" fixed="right" style="min-width: 120px">
          <template #body="slotProps">
            <div class="flex gap-2">
              <pv-button icon="pi pi-pencil" class="p-button-rounded p-button-text text-blue-500 hover:surface-200" @click="openEdit(slotProps.data)" />
              <pv-button icon="pi pi-trash" class="p-button-rounded p-button-text text-red-500 hover:surface-200" @click="confirmDelete(slotProps.data.id)" />
            </div>
          </template>
        </pv-column>

      </pv-data-table>
    </div>

    <!-- DIÁLOGO EMERGENTE CLÍNICO PREMIUM -->
    <pv-dialog
        v-model:visible="displayDialog"
        modal
        appendTo="body"
        :draggable="false"
        :closable="false"
        :style="{width: '600px'}"
        class="clinic-dialog"
    >
      <template #header>
        <div class="flex align-items-center justify-content-between w-full pb-2">
          <div class="flex align-items-center gap-3">
            <div class="bg-blue-50 p-2 border-round-lg flex align-items-center justify-content-center">
              <i class="pi pi-calendar-plus text-blue-600 text-xl"></i>
            </div>
            <h2 class="text-xl font-bold text-gray-800 m-0">{{ appointment.id ? 'Editar Cita' : 'Nueva Cita Médica' }}</h2>
          </div>
          <button @click="displayDialog = false" class="p-link w-2rem h-2rem flex align-items-center justify-content-center border-circle hover:surface-100 transition-colors cursor-pointer border-none bg-transparent text-gray-500">
            <i class="pi pi-times text-lg"></i>
          </button>
        </div>
      </template>

      <!-- Se agregó pt-4 para dar respiro entre el título y el primer input -->
      <div class="grid formgrid pt-3">
        <div class="col-12 md:col-6 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Paciente</label>
          <pv-input-text v-model="appointment.petName" placeholder="Ej: Peluchín" class="clinic-input" />
        </div>
        <div class="col-12 md:col-6 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Dueño</label>
          <pv-input-text v-model="appointment.ownerName" placeholder="Ej: Gonzalo" class="clinic-input" />
        </div>
        <div class="col-12 md:col-6 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
          <pv-input-text v-model="appointment.date" type="date" class="clinic-input" />
        </div>
        <div class="col-12 md:col-6 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Hora</label>
          <pv-input-text v-model="appointment.time" type="time" class="clinic-input" />
        </div>
        <div class="col-12 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Estado de la Cita</label>
          <pv-select v-model="appointment.status" :options="statusOptions" optionLabel="label" optionValue="value" class="clinic-input" appendTo="body" />        </div>
        <div class="col-12 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Motivo de consulta</label>
          <pv-textarea v-model="appointment.reason" placeholder="Describa los síntomas o el motivo de la visita..." rows="3" class="clinic-input" />
        </div>
        <div class="col-12 md:col-6 mb-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Monto Total</label>
          <!-- Modo moneda: Añade el "S/" automáticamente y evita el glitch del scrollbar -->
          <pv-input-number v-model="appointment.amount" mode="currency" currency="PEN" locale="es-PE" placeholder="0.00" class="clinic-input-num" />
        </div>
      </div>

      <template #footer>
        <!-- Se quitaron las líneas de borde para mantener la limpieza -->
        <div class="flex justify-content-end gap-3 pt-3">
          <pv-button label="Cancelar" class="p-button-text text-gray-500 hover:text-gray-800 font-semibold transition-colors p-2" @click="displayDialog = false" />
          <pv-button label="Guardar Cita" icon="pi pi-check" class="btn-primary-clinic" @click="save" />
        </div>
      </template>
    </pv-dialog>
  </div>
</template>

<!-- ESTILOS LOCALES DE LA VISTA -->
<style scoped>
.clinic-card { background-color: #ffffff; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }

/* --- BADGES DE ESTADO --- */
.status-badge { padding: 0.35rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.status-badge.scheduled { background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe; }
.status-badge.confirmed { background: #f0fdf4; color: #22c55e; border: 1px solid #bbf7d0; }
.status-badge.attended { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }

/* Botón Principal */
.btn-primary-clinic {
  background-color: #2563eb !important;
  border: none !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  padding: 0.75rem 1.5rem !important;
  transition: background-color 0.2s, transform 0.1s !important;
}
.btn-primary-clinic:hover { background-color: #1d4ed8 !important; transform: translateY(-1px) !important; }

/* Tabla Limpia */
:deep(.clinic-table .p-datatable-header) { background: transparent; }
:deep(.clinic-table .p-datatable-thead > tr > th) { background-color: #f8fafc !important; color: #475569 !important; border-bottom: 2px solid #e2e8f0 !important; padding: 1rem; }
:deep(.clinic-table .p-datatable-tbody > tr) { background-color: #ffffff !important; color: #334155 !important; transition: background 0.2s; }
:deep(.clinic-table .p-datatable-tbody > tr:hover) { background-color: #f8fafc !important; }
:deep(.clinic-table .p-datatable-tbody > tr > td) { border-bottom: 1px solid #e2e8f0 !important; padding: 1rem; }
</style>

<!-- ESTILOS GLOBALES PARA EL MODAL (SIN SCOPED) -->
<style>
/* Fondo oscuro suave detrás del modal */
.p-dialog-mask { background-color: rgba(15, 23, 42, 0.45) !important; backdrop-filter: blur(3px); }

/* Modal Pawtient Blanco - Limpio y espacioso */
.clinic-dialog {
  background-color: #ffffff !important;
  border-radius: 16px !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2) !important;
  border: none !important;
  padding: 1rem !important;
}
.clinic-dialog .p-dialog-header, .clinic-dialog .p-dialog-content, .clinic-dialog .p-dialog-footer {
  background-color: transparent !important;
  color: #1f2937 !important;
}

/* ========================================================
   SOLUCIÓN A LOS INPUTS Y EL GLITCH DE LA BARRA INFERIOR
   ======================================================== */

/.clinic-input, .clinic-input-num { width: 100% !important; }

/* Inputs internos */
.clinic-dialog .p-inputtext,
.clinic-dialog .p-textarea,
.clinic-dialog .p-select,
.clinic-dialog .p-dropdown {
  width: 100% !important;
  background-color: #f8fafc !important;
  border: 1px solid #cbd5e1 !important;
  color: #334155 !important;
  border-radius: 8px !important;
  padding: 0.8rem 1rem !important;
  font-size: 0.95rem !important;
  transition: all 0.2s ease !important;
  box-shadow: none !important;
}

.clinic-dialog .p-inputtext:focus,
.clinic-dialog .p-textarea:focus,
.clinic-dialog .p-select.p-focus,
.clinic-dialog .p-dropdown.p-focus {
  background-color: #ffffff !important;
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
  outline: none !important;
}

/* --- REPARACIÓN DEL PANEL FLOTANTE (DROPDOWN) --- */
.p-dropdown-panel, .p-select-panel, .p-select-overlay {
  background-color: #ffffff !important; /* Fondo 100% blanco y sólido */
  border: 1px solid #cbd5e1 !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important; /* Sombra fuerte para resaltar */
  z-index: 99999 !important; /* Fuerza a que se ponga encima de todo el texto */
}

/* Contenedor interno de las opciones */
.p-dropdown-items-wrapper, .p-select-list-wrapper {
  background-color: #ffffff !important;
  border-radius: 8px !important;
}

/* Opciones de la lista */
.p-dropdown-item, .p-select-item {
  color: #334155 !important;
  padding: 0.75rem 1rem !important;
  font-size: 0.95rem !important;
  background-color: transparent !important;
  transition: background-color 0.2s !important;
}

/* Efecto hover celeste al pasar el mouse */
.p-dropdown-item:hover, .p-select-item:hover,
.p-dropdown-item.p-highlight, .p-select-item.p-highlight {
  background-color: #eff6ff !important;
  color: #1d4ed8 !important;
}
</style>