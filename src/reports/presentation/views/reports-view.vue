<script setup>
import { ref, onMounted } from 'vue';
import { reportsStore } from "../../application/reports.store.js";

const showPaymentDialog = ref(false);
const editingInvoice = ref(null);
const selectedAppointment = ref(null);
const paymentDate = ref(new Date().toISOString().slice(0,10));

onMounted(() => {
  reportsStore.generateGeneralReport();
  reportsStore.loadInvoices();
});

const openPaymentDialog = (invoice = null) => {
  if (invoice) {
    editingInvoice.value = { ...invoice };
    selectedAppointment.value = invoice.appointmentId;
    paymentDate.value = invoice.date;
  } else {
    editingInvoice.value = null;
    selectedAppointment.value = null;
    paymentDate.value = new Date().toISOString().slice(0,10);
  }
  showPaymentDialog.value = true;
};

const savePayment = async () => {
  const appointment = reportsStore.appointments.find(a => a.id === selectedAppointment.value);
  if (!appointment) {
    alert("Debes seleccionar una cita válida");
    return;
  }

  const invoiceData = {
    id: editingInvoice.value?.id,
    appointmentId: appointment.id,
    amount: appointment.amount, // monto tomado directamente de la cita
    date: paymentDate.value,
    petName: appointment.petName,
    ownerName: appointment.ownerName
  };

  await reportsStore.saveInvoice(invoiceData);
  showPaymentDialog.value = false;
};

const deleteInvoice = async (id) => {
  if (confirm("¿Seguro que deseas eliminar esta factura?")) {
    await reportsStore.deleteInvoice(id);
  }
};
</script>

<template>
  <div class="p-4 lg:p-6">
    <!-- Encabezado -->
    <div class="flex justify-content-between align-items-center mb-6">
      <h1 class="text-3xl font-bold m-0 text-900">Billing & Reports</h1>
      <pv-button label="Generar Reporte" icon="pi pi-download" @click="reportsStore.generateGeneralReport" />
    </div>

    <!-- Métricas -->
    <div class="grid">
      <div class="col-12 md:col-4">
        <div class="surface-card p-4 shadow-2 border-round border-left-3 border-green-500">
          <span class="block text-500 font-medium mb-3">Ingresos Totales</span>
          <div class="text-900 font-bold text-2xl">S/ {{ reportsStore.summary.totalRevenue }}</div>
        </div>
      </div>
      <div class="col-12 md:col-4">
        <div class="surface-card p-4 shadow-2 border-round border-left-3 border-blue-500">
          <span class="block text-500 font-medium mb-3">Rentabilidad Neta</span>
          <div class="text-900 font-bold text-2xl">S/ {{ reportsStore.summary.netProfit }}</div>
        </div>
      </div>
      <div class="col-12 md:col-4">
        <div class="surface-card p-4 shadow-2 border-round border-left-3 border-orange-500">
          <span class="block text-500 font-medium mb-3">Alertas Almacén</span>
          <div class="text-900 font-bold text-2xl">{{ reportsStore.summary.lowStockAlerts }}</div>
        </div>
      </div>
    </div>

    <!-- Facturación -->
    <div class="surface-card p-5 shadow-2 border-round mt-6">
      <div class="text-900 font-bold text-xl mb-3">Centro de Facturación</div>
      <div class="flex justify-content-center gap-3 mb-4">
        <pv-button label="Registrar Pago" icon="pi pi-plus" class="p-button-outlined"
                   @click="openPaymentDialog()" />
      </div>

      <!-- Tabla de facturas -->
      <pv-data-table :value="reportsStore.invoices" class="p-datatable-sm mt-4">
        <template #empty>No hay facturas registradas.</template>
        <pv-column field="date" header="Fecha"></pv-column>
        <pv-column field="amount" header="Monto (S/)"></pv-column>
        <pv-column field="appointmentId" header="Cita"></pv-column>
        <pv-column header="Acciones">
          <template #body="slotProps">
            <div class="flex gap-2">
              <pv-button icon="pi pi-pencil" class="p-button-text p-button-warning"
                         @click="openPaymentDialog(slotProps.data)" />
              <pv-button icon="pi pi-trash" class="p-button-text p-button-danger"
                         @click="deleteInvoice(slotProps.data.id)" />
            </div>
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <!-- Diálogo de pago -->
    <pv-dialog v-model:visible="showPaymentDialog" :header="editingInvoice ? 'Editar Factura' : 'Registrar Pago'" modal :style="{width:'450px'}">
      <div class="flex flex-column gap-3 mt-2">
        <label>Cita Médica</label>
        <pv-select v-model="selectedAppointment" :options="reportsStore.appointments"
                   optionLabel="petName" optionValue="id" placeholder="Seleccione cita" class="w-full" />
        <label>Fecha</label>
        <pv-input-text v-model="paymentDate" type="date" class="w-full" />
        <p class="text-sm text-600 mt-2" v-if="selectedAppointment">
          Monto automático: S/ {{ reportsStore.appointments.find(a => a.id === selectedAppointment)?.amount }}
        </p>
      </div>
      <template #footer>
        <pv-button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="showPaymentDialog=false" />
        <pv-button label="Guardar" icon="pi pi-check" @click="savePayment" />
      </template>
    </pv-dialog>
  </div>
</template>