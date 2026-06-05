<script setup>
import { ref, onMounted } from 'vue';
import { reportsStore } from "../../application/reports.store.js";
import { appointmentsStore } from "../../../appointments/application/appointments.store.js";
import { useI18n } from "vue-i18n";

const displayDialog = ref(false);
const invoice = ref({ id: 0, date: '', petName: '', ownerName: '', amount: 0 });
const selectedAppointment = ref(null);
const { t } = useI18n();

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
  if (confirm(t('reports.confirmDelete'))) {
    await reportsStore.deleteInvoice(id);
  }
};
</script>

<template>
  <div class="p-4 lg:p-6">
    <div class="flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center mb-5 gap-3">
      <div>
        <h1 class="text-3xl font-bold m-0 text-gray-800">{{ t('reports.title') }}</h1>
        <p class="text-gray-500 m-0 mt-1 text-sm">{{ t('reports.subtitle') }}</p>
      </div>
      <pv-button :label="t('reports.refresh')" icon="pi pi-refresh" class="btn-outline-clinic font-bold" @click="reportsStore.generateGeneralReport()" />
    </div>

    <div class="grid mb-5">
      <div class="col-12 md:col-4"><div class="clinic-stat-card p-4 flex align-items-center justify-content-between"><div><span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{{ t('reports.totalIncome') }}</span><div class="text-3xl font-bold text-gray-800">S/ {{ reportsStore.summary.totalRevenue || 0 }}</div></div><div class="icon-box bg-blue-50 text-blue-600"><i class="pi pi-wallet text-2xl"></i></div></div></div>
      <div class="col-12 md:col-4"><div class="clinic-stat-card p-4 flex align-items-center justify-content-between"><div><span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{{ t('reports.netProfit') }}</span><div class="text-3xl font-bold text-gray-800" :class="{'text-red-500': reportsStore.summary.netProfit < 0}">S/ {{ reportsStore.summary.netProfit || 0 }}</div></div><div class="icon-box bg-green-50 text-green-600"><i class="pi pi-chart-line text-2xl"></i></div></div></div>
      <div class="col-12 md:col-4"><div class="clinic-stat-card p-4 flex align-items-center justify-content-between"><div><span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{{ t('reports.inventoryAlerts') }}</span><div class="text-3xl font-bold text-gray-800">{{ reportsStore.summary.lowStockAlerts || 0 }}</div></div><div class="icon-box bg-orange-50 text-orange-500"><i class="pi pi-exclamation-circle text-2xl"></i></div></div></div>
    </div>

    <div class="clinic-card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2 class="text-xl font-bold m-0 text-gray-800">{{ t('reports.billingCenter') }}</h2>
        <pv-button :label="t('reports.registerPayment')" icon="pi pi-plus" class="btn-primary-clinic" @click="openNew" />
      </div>

      <pv-data-table :value="reportsStore.invoices" stripedRows class="clinic-table">
        <template #empty> <div class="p-4 text-center text-gray-500">{{ t('reports.emptyInvoices') }}</div> </template>

        <pv-column field="date" :header="t('common.date')" class="p-3"></pv-column>
        <pv-column field="petName" :header="t('common.patient')" class="font-bold text-blue-600 p-3"></pv-column>
        <pv-column field="ownerName" :header="t('common.client')" class="p-3"></pv-column>
        <pv-column field="amount" :header="t('reports.paidAmount')" class="p-3">
          <template #body="slotProps">
            <span class="bg-green-50 text-green-700 px-3 py-1 border-round-2xl text-sm font-bold border-1 border-green-200">
              S/ {{ slotProps.data.amount }}
            </span>
          </template>
        </pv-column>

        <pv-column :header="t('common.actions')" class="p-3" style="text-align: right;">
          <template #body="slotProps">
            <div class="flex gap-2 justify-content-end">
              <pv-button icon="pi pi-download" class="p-button-rounded p-button-text text-blue-600 hover:bg-blue-50" @click="reportsStore.downloadInvoicePdf(slotProps.data.id)" />
              <pv-button icon="pi pi-trash" class="p-button-rounded p-button-text text-red-500 hover:bg-red-50" @click="confirmDelete(slotProps.data.id)" />
            </div>
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <pv-dialog v-model:visible="displayDialog" modal :draggable="false" :style="{width: '500px'}" class="clinic-dialog">
      <template #header><h2 class="text-xl font-bold text-gray-800 m-0">{{ t('reports.issueReceipt') }}</h2></template>
      <div class="flex flex-column gap-3 pt-3">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">{{ t('reports.selectAppointment') }}</label>
          <pv-select v-model="selectedAppointment" :options="appointmentsStore.appointments" optionLabel="petName" :placeholder="t('reports.searchPatient')" class="w-full" appendTo="body" @change="onAppointmentSelect" />
        </div>
        <div class="grid m-0">
          <div class="col-6 pl-0 pr-2"><label class="block text-xs font-bold text-gray-500 uppercase mb-2">{{ t('common.patient') }}</label><pv-input-text v-model="invoice.petName" class="w-full" /></div>
          <div class="col-6 pr-0 pl-2"><label class="block text-xs font-bold text-gray-500 uppercase mb-2">{{ t('common.client') }}</label><pv-input-text v-model="invoice.ownerName" class="w-full" /></div>
          <div class="col-6 pl-0 pr-2"><label class="block text-xs font-bold text-gray-500 uppercase mb-2 mt-2">{{ t('common.date') }}</label><pv-input-text v-model="invoice.date" type="date" class="w-full" /></div>
          <div class="col-6 pr-0 pl-2"><label class="block text-xs font-bold text-gray-500 uppercase mb-2 mt-2">{{ t('common.amount') }}</label><pv-input-number v-model="invoice.amount" mode="currency" currency="PEN" class="w-full" /></div>
        </div>
      </div>
      <template #footer>
        <pv-button :label="t('common.cancel')" class="p-button-text text-gray-500" @click="displayDialog = false" />
        <pv-button :label="t('reports.registerPayment')" class="btn-primary-clinic" @click="handleSave" />
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
:deep(.p-datatable .p-datatable-thead > tr > th) { background: #f8fafc !important; color: #64748b !important; border: none !important; }
:deep(.p-datatable .p-datatable-tbody > tr > td) { border: none !important; padding: 1rem !important; }
</style>
