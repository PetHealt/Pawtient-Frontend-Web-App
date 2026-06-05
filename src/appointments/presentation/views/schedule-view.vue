<script setup>
import { ref, onMounted, computed } from 'vue';
import { appointmentsStore } from "../../application/appointments.store.js";
import { Appointment } from "../../domain/model/appointment.entity.js";
import { useI18n } from "vue-i18n";

const displayDialog = ref(false);
const appointment = ref(new Appointment({}));
const { t } = useI18n();

const statusOptions = computed(() => [
  { label: t('appointments.scheduled'), value: 'scheduled' },
  { label: t('appointments.confirmed'), value: 'confirmed' },
  { label: t('appointments.attended'), value: 'attended' }
]);

const statusLabel = (status) => {
  if (status === 'scheduled') return t('appointments.scheduled');
  if (status === 'confirmed') return t('appointments.confirmed');
  return t('appointments.attended');
};

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
  if (confirm(t('appointments.confirmDelete'))) {
    await appointmentsStore.deleteAppointment(id);
  }
};
</script>

<template>
  <div class="p-4 lg:p-6">
    <div class="clinic-card">
      <div class="flex justify-content-between align-items-center mb-5">
        <div>
          <h1 class="text-3xl font-bold m-0 text-gray-800">{{ t('appointments.title') }}</h1>
          <p class="text-gray-500 m-0 mt-1">{{ t('appointments.subtitle') }}</p>
        </div>
        <pv-button :label="t('appointments.new')" icon="pi pi-plus" class="btn-primary-clinic" @click="openNew" />
      </div>

      <pv-data-table :value="appointmentsStore.appointments" :loading="appointmentsStore.loading" stripedRows scrollable scrollHeight="400px" class="clinic-table">
        <template #empty> <div class="p-4 text-center text-gray-500">{{ t('appointments.empty') }}</div> </template>

        <pv-column field="date" :header="t('common.date')" sortable style="min-width: 120px"></pv-column>
        <pv-column field="time" :header="t('common.time')" style="min-width: 100px"></pv-column>
        <pv-column field="petName" :header="t('common.patient')" class="font-bold text-blue-600" style="min-width: 150px"></pv-column>
        <pv-column field="ownerName" :header="t('common.owner')" style="min-width: 150px"></pv-column>

        <pv-column field="status" :header="t('common.status')" style="min-width: 130px">
          <template #body="slotProps">
            <span :class="'status-badge ' + slotProps.data.status">
              {{ statusLabel(slotProps.data.status) }}
            </span>
          </template>
        </pv-column>
        <pv-column field="amount" :header="t('common.amount')" style="min-width: 100px">
          <template #body="slotProps">S/ {{ slotProps.data.amount }}</template>
        </pv-column>
        <pv-column :header="t('common.actions')" fixed="right" style="min-width: 120px">
          <template #body="slotProps">
            <div class="flex gap-2">
              <pv-button icon="pi pi-pencil" class="p-button-rounded p-button-text text-blue-500 hover:surface-200" @click="openEdit(slotProps.data)" />
              <pv-button icon="pi pi-trash" class="p-button-rounded p-button-text text-red-500 hover:surface-200" @click="confirmDelete(slotProps.data.id)" />
            </div>
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <pv-dialog v-model:visible="displayDialog" modal appendTo="body" :draggable="false" :closable="false" :style="{width: '600px'}" class="clinic-dialog">
      <template #header>
        <div class="flex align-items-center justify-content-between w-full pb-2">
          <div class="flex align-items-center gap-3">
            <div class="bg-blue-50 p-2 border-round-lg flex align-items-center justify-content-center">
              <i class="pi pi-calendar-plus text-blue-600 text-xl"></i>
            </div>
            <h2 class="text-xl font-bold text-gray-800 m-0">{{ appointment.id ? t('appointments.edit') : t('appointments.newMedical') }}</h2>
          </div>
          <button @click="displayDialog = false" class="p-link w-2rem h-2rem flex align-items-center justify-content-center border-circle hover:surface-100 transition-colors cursor-pointer border-none bg-transparent text-gray-500">
            <i class="pi pi-times text-lg"></i>
          </button>
        </div>
      </template>

      <div class="grid formgrid pt-3">
        <div class="col-12 md:col-6 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('common.patient') }}</label>
          <pv-input-text v-model="appointment.petName" :placeholder="t('appointments.petPlaceholder')" class="clinic-input" />
        </div>
        <div class="col-12 md:col-6 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('common.owner') }}</label>
          <pv-input-text v-model="appointment.ownerName" :placeholder="t('appointments.ownerPlaceholder')" class="clinic-input" />
        </div>
        <div class="col-12 md:col-6 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('common.date') }}</label>
          <pv-input-text v-model="appointment.date" type="date" class="clinic-input" />
        </div>
        <div class="col-12 md:col-6 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('common.time') }}</label>
          <pv-input-text v-model="appointment.time" type="time" class="clinic-input" />
        </div>
        <div class="col-12 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('appointments.appointmentStatus') }}</label>
          <pv-select v-model="appointment.status" :options="statusOptions" optionLabel="label" optionValue="value" class="clinic-input" appendTo="body" />
        </div>
        <div class="col-12 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('appointments.reason') }}</label>
          <pv-textarea v-model="appointment.reason" :placeholder="t('appointments.reasonPlaceholder')" rows="3" class="clinic-input" />
        </div>
        <div class="col-12 md:col-6 mb-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('appointments.totalAmount') }}</label>
          <pv-input-number v-model="appointment.amount" mode="currency" currency="PEN" locale="es-PE" placeholder="0.00" class="clinic-input-num" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-content-end gap-3 pt-3">
          <pv-button :label="t('common.cancel')" class="p-button-text text-gray-500 hover:text-gray-800 font-semibold transition-colors p-2" @click="displayDialog = false" />
          <pv-button :label="t('appointments.save')" icon="pi pi-check" class="btn-primary-clinic" @click="save" />
        </div>
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.clinic-card { background-color: #ffffff; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
.status-badge { padding: 0.35rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.status-badge.scheduled { background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe; }
.status-badge.confirmed { background: #f0fdf4; color: #22c55e; border: 1px solid #bbf7d0; }
.status-badge.attended { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }
.btn-primary-clinic { background-color: #2563eb !important; border: none !important; border-radius: 8px !important; font-weight: 600 !important; padding: 0.75rem 1.5rem !important; transition: background-color 0.2s, transform 0.1s !important; }
.btn-primary-clinic:hover { background-color: #1d4ed8 !important; transform: translateY(-1px) !important; }
:deep(.clinic-table .p-datatable-header) { background: transparent; }
:deep(.clinic-table .p-datatable-thead > tr > th) { background-color: #f8fafc !important; color: #475569 !important; border-bottom: 2px solid #e2e8f0 !important; padding: 1rem; }
:deep(.clinic-table .p-datatable-tbody > tr) { background-color: #ffffff !important; color: #334155 !important; transition: background 0.2s; }
:deep(.clinic-table .p-datatable-tbody > tr:hover) { background-color: #f8fafc !important; }
:deep(.clinic-table .p-datatable-tbody > tr > td) { border-bottom: 1px solid #e2e8f0 !important; padding: 1rem; }
</style>

<style>
.p-dialog-mask { background-color: rgba(15, 23, 42, 0.45) !important; backdrop-filter: blur(3px); }
.clinic-dialog { background-color: #ffffff !important; border-radius: 16px !important; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2) !important; border: none !important; padding: 1rem !important; }
.clinic-dialog .p-dialog-header, .clinic-dialog .p-dialog-content, .clinic-dialog .p-dialog-footer { background-color: transparent !important; color: #1f2937 !important; }
.clinic-input, .clinic-input-num { width: 100% !important; }
.clinic-dialog .p-inputtext, .clinic-dialog .p-textarea, .clinic-dialog .p-select, .clinic-dialog .p-dropdown { width: 100% !important; background-color: #f8fafc !important; border: 1px solid #cbd5e1 !important; color: #334155 !important; border-radius: 8px !important; padding: 0.8rem 1rem !important; font-size: 0.95rem !important; transition: all 0.2s ease !important; box-shadow: none !important; }
.clinic-dialog .p-inputtext:focus, .clinic-dialog .p-textarea:focus, .clinic-dialog .p-select.p-focus, .clinic-dialog .p-dropdown.p-focus { background-color: #ffffff !important; border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important; outline: none !important; }
.p-dropdown-panel, .p-select-panel, .p-select-overlay { background-color: #ffffff !important; border: 1px solid #cbd5e1 !important; border-radius: 8px !important; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important; z-index: 99999 !important; }
.p-dropdown-items-wrapper, .p-select-list-wrapper { background-color: #ffffff !important; border-radius: 8px !important; }
.p-dropdown-item, .p-select-item { color: #334155 !important; padding: 0.75rem 1rem !important; font-size: 0.95rem !important; background-color: transparent !important; transition: background-color 0.2s !important; }
.p-dropdown-item:hover, .p-select-item:hover, .p-dropdown-item.p-highlight, .p-select-item.p-highlight { background-color: #eff6ff !important; color: #1d4ed8 !important; }
</style>
