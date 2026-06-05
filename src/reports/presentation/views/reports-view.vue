<script setup>
import { ref, onMounted } from 'vue';
import { reportsStore } from "../../application/reports.store.js";
import { appointmentsStore } from "../../../appointments/application/appointments.store.js";

const displayDialog = ref(false);
const invoice = ref({ id: 0, date: '', petName: '', ownerName: '', amount: 0 });
const selectedAppointment = ref(null);

onMounted(async () => {
  await reportsStore.loadInvoices();
  await reportsStore.generateGeneralReport();
  await appointmentsStore.loadAppointments();
});

const openNew = () => {
  selectedAppointment.value = null;
  invoice.value = { id: 0, date: new Date().toISOString().split('T')[0], petName: '', ownerName: '', amount: 0 };
  displayDialog.value = true;
};

const onAppointmentSelect = () => {
  if (selectedAppointment.value) {
    invoice.value.petName = selectedAppointment.value.petName;
    invoice.value.ownerName = selectedAppointment.value.ownerName;
    invoice.value.amount = selectedAppointment.value.amount || 0;
  }
};

const handleSave = async () => {
  await reportsStore.addInvoice(invoice.value);
  displayDialog.value = false;
};

const confirmDelete = async (id) => {
  if (confirm("¿Estás seguro de eliminar esta factura?")) {
    await reportsStore.deleteInvoice(id);
  }
};
</script>

<template>
  <div class="p-4 lg:p-6">
    <!-- Cabecera -->
    <div class="flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center mb-5 gap-3">
      <div>
        <h1 class="text-3xl font-bold m-0 text-gray-800">Facturación y Reportes</h1>
        <p class="text-gray-500 m-0 mt-1 text-sm">Monitorea tus ingresos y gestiona tus comprobantes.</p>
      </div>
      <pv-button label="Actualizar Reporte" icon="pi pi-refresh" class="btn-outline-clinic font-bold" @click="reportsStore.generateGeneralReport()" />
    </div>

    <!-- KPIs -->
    <div class="grid mb-5">
      <div class="col-12 md:col-4"><div class="clinic-stat-card p-4 flex align-items-center justify-content-between"><div><span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ingresos Totales</span><div class="text-3xl font-bold text-gray-800">S/ {{ reportsStore.summary.totalRevenue || 0 }}</div></div><div class="icon-box bg-blue-50 text-blue-600"><i class="pi pi-wallet text-2xl"></i></div></div></div>
      <div class="col-12 md:col-4"><div class="clinic-stat-card p-4 flex align-items-center justify-content-between"><div><span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Rentabilidad Neta</span><div class="text-3xl font-bold text-gray-800" :class="{'text-red-500': reportsStore.summary.netProfit < 0}">S/ {{ reportsStore.summary.netProfit || 0 }}</div></div><div class="icon-box bg-green-50 text-green-600"><i class="pi pi-chart-line text-2xl"></i></div></div></div>
      <div class="col-12 md:col-4"><div class="clinic-stat-card p-4 flex align-items-center justify-content-between"><div><span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Alertas Almacén</span><div class="text-3xl font-bold text-gray-800">{{ reportsStore.summary.lowStockAlerts || 0 }}</div></div><div class="icon-box bg-orange-50 text-orange-500"><i class="pi pi-exclamation-circle text-2xl"></i></div></div></div>
    </div>

    <!-- TABLA ESTANDARIZADA -->
    <div class="clinic-card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2 class="text-xl font-bold m-0 text-gray-800">Centro de Facturación</h2>
        <pv-button label="Registrar Pago" icon="pi pi-plus" class="btn-primary-clinic" @click="openNew" />
      </div>

      <pv-data-table :value="reportsStore.invoices" stripedRows class="clinic-table">
        <template #empty> <div class="p-4 text-center text-gray-500">No hay facturas registradas.</div> </template>

        <pv-column field="date" header="Fecha" class="p-3"></pv-column>
        <pv-column field="petName" header="Paciente" class="font-bold text-blue-600 p-3"></pv-column>
        <pv-column field="ownerName" header="Cliente" class="p-3"></pv-column>
        <pv-column field="amount" header="Monto Pagado" class="p-3">
          <template #body="slotProps">
            <span class="bg-green-50 text-green-700 px-3 py-1 border-round-2xl text-sm font-bold border-1 border-green-200">
              S/ {{ slotProps.data.amount }}
            </span>
          </template>
        </pv-column>

        <pv-column header="Acciones" class="p-3" style="text-align: right;">
          <template #body="slotProps">
            <div class="flex gap-2 justify-content-end">
              <pv-button icon="pi pi-download" class="p-button-rounded p-button-text text-blue-600 hover:bg-blue-50" @click="reportsStore.downloadInvoicePdf(slotProps.data.id)" />
              <pv-button icon="pi pi-trash" class="p-button-rounded p-button-text text-red-500 hover:bg-red-50" @click="confirmDelete(slotProps.data.id)" />
            </div>
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <!-- MODAL -->
    <pv-dialog v-model:visible="displayDialog" modal :draggable="false" :style="{width: '500px'}" class="clinic-dialog">
      <template #header><h2 class="text-xl font-bold text-gray-800 m-0">Emitir Boleta</h2></template>
      <div class="flex flex-column gap-3 pt-3">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Seleccionar Cita (Autocompletar)</label>
          <pv-select v-model="selectedAppointment" :options="appointmentsStore.appointments" optionLabel="petName" placeholder="Buscar paciente en agenda..." class="w-full" appendTo="body" @change="onAppointmentSelect" />
        </div>
        <div class="grid m-0">
          <div class="col-6 pl-0 pr-2"><label class="block text-xs font-bold text-gray-500 uppercase mb-2">Paciente</label><pv-input-text v-model="invoice.petName" class="w-full" /></div>
          <div class="col-6 pr-0 pl-2"><label class="block text-xs font-bold text-gray-500 uppercase mb-2">Cliente</label><pv-input-text v-model="invoice.ownerName" class="w-full" /></div>
          <div class="col-6 pl-0 pr-2"><label class="block text-xs font-bold text-gray-500 uppercase mb-2 mt-2">Fecha</label><pv-input-text v-model="invoice.date" type="date" class="w-full" /></div>
          <div class="col-6 pr-0 pl-2"><label class="block text-xs font-bold text-gray-500 uppercase mb-2 mt-2">Monto</label><pv-input-number v-model="invoice.amount" mode="currency" currency="PEN" class="w-full" /></div>
        </div>
      </div>
      <template #footer>
        <pv-button label="Cancelar" class="p-button-text text-gray-500" @click="displayDialog = false" />
        <pv-button label="Registrar Pago" class="btn-primary-clinic" @click="handleSave" />
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.clinic-card { background: #fff; padding: 1.5rem; border-radius: 16px; border: 1px solid #e2e8f0; }
.clinic-stat-card { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; }
.icon-box { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
.btn-primary-clinic { background: #2563eb !important; border: none; border-radius: 8px; padding: 0.7rem 1.5rem; }
.btn-outline-clinic { background: #fff !important; border: 1px solid #e2e8f0 !important; color: #64748b !important; padding: 0.6rem 1.2rem; border-radius: 8px; }

/* Asegurar estilo de tabla igual a los otros módulos */
:deep(.p-datatable .p-datatable-thead > tr > th) { background: #f8fafc !important; color: #64748b !important; border: none !important; }
:deep(.p-datatable .p-datatable-tbody > tr > td) { border: none !important; padding: 1rem !important; }
</style>