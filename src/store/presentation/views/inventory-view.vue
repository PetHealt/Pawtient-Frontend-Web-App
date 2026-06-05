<script setup>
import { ref, onMounted } from 'vue';
import { storeStore } from "../../application/store.store.js";
import { useI18n } from "vue-i18n";

const displayDialog = ref(false);
const product = ref({ id: 0, name: '', stock: 0, price: 0 });
const { t } = useI18n();

onMounted(() => storeStore.loadInventory());

const openNew = () => {
  product.value = { id: 0, name: '', stock: 0, price: 0 };
  displayDialog.value = true;
};

const editProduct = (data) => {
  product.value = { ...data };
  displayDialog.value = true;
};

const confirmDelete = async (id) => {
  if (confirm(t('inventory.confirmDelete'))) {
    await storeStore.deleteProduct(id);
  }
};

const handleSave = async () => {
  await storeStore.addProduct(product.value);
  displayDialog.value = false;
};
</script>

<template>
  <div class="p-4 lg:p-6">
    <div class="clinic-card">
      <div class="flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center mb-5 gap-3">
        <div>
          <h1 class="text-3xl font-bold m-0 text-gray-800">{{ t('inventory.title') }}</h1>
          <p class="text-gray-500 m-0 mt-1">{{ t('inventory.subtitle') }}</p>
        </div>
        <pv-button :label="t('inventory.newItem')" icon="pi pi-plus" class="btn-primary-clinic" @click="openNew" />
      </div>

      <pv-data-table :value="storeStore.products" :loading="storeStore.loading" stripedRows class="clinic-table">
        <template #empty> <div class="p-4 text-center text-gray-500">{{ t('inventory.empty') }}</div> </template>

        <pv-column field="name" :header="t('inventory.item')" sortable class="font-bold text-blue-600"></pv-column>
        <pv-column field="stock" :header="t('inventory.currentStock')">
          <template #body="slotProps">
            <span :class="{'text-red-500 font-bold': slotProps.data.stock <= 5}">
              {{ slotProps.data.stock }} {{ t('common.units') }}
            </span>
          </template>
        </pv-column>
        <pv-column field="price" :header="t('inventory.price')">
          <template #body="slotProps">S/ {{ slotProps.data.price }}</template>
        </pv-column>

        <pv-column :header="t('common.actions')" fixed="right">
          <template #body="slotProps">
            <div class="flex gap-2">
              <pv-button icon="pi pi-pencil" class="p-button-rounded p-button-text text-blue-500 hover:surface-200" @click="editProduct(slotProps.data)" />
              <pv-button icon="pi pi-trash" class="p-button-rounded p-button-text text-red-500 hover:surface-200" @click="confirmDelete(slotProps.data.id)" />
            </div>
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <pv-dialog v-model:visible="displayDialog" modal appendTo="body" :draggable="false" :closable="false" :style="{width: '450px'}" class="clinic-dialog">
      <template #header>
        <div class="flex align-items-center justify-content-between w-full pb-2">
          <div class="flex align-items-center gap-3">
            <div class="bg-blue-50 p-2 border-round-lg flex align-items-center justify-content-center">
              <i class="pi pi-box text-blue-600 text-xl"></i>
            </div>
            <h2 class="text-xl font-bold text-gray-800 m-0">{{ product.id ? t('inventory.editItem') : t('inventory.newItem') }}</h2>
          </div>
          <button @click="displayDialog = false" class="p-link w-2rem h-2rem flex align-items-center justify-content-center border-circle hover:surface-100 transition-colors cursor-pointer border-none bg-transparent text-gray-500">
            <i class="pi pi-times text-lg"></i>
          </button>
        </div>
      </template>

      <div class="grid formgrid pt-3">
        <div class="col-12 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('inventory.itemName') }}</label>
          <pv-input-text v-model="product.name" :placeholder="t('inventory.itemPlaceholder')" class="clinic-input" />
        </div>
        <div class="col-12 md:col-6 mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('inventory.initialStock') }}</label>
          <pv-input-number v-model="product.stock" class="clinic-input-num" :min="0" />
        </div>
        <div class="col-12 md:col-6 mb-2">
          <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('inventory.salePrice') }}</label>
          <pv-input-number v-model="product.price" mode="currency" currency="PEN" locale="es-PE" class="clinic-input-num" placeholder="0.00" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-content-end gap-3 pt-3">
          <pv-button :label="t('common.cancel')" class="p-button-text text-gray-500 hover:text-gray-800 font-semibold transition-colors p-2" @click="displayDialog = false" />
          <pv-button :label="t('inventory.saveItem')" icon="pi pi-check" class="btn-primary-clinic" @click="handleSave" />
        </div>
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.clinic-card { background-color: #ffffff; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
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
.clinic-dialog .p-inputtext, .clinic-dialog .p-inputnumber-input, .clinic-dialog .p-select, .clinic-dialog .p-dropdown { width: 100% !important; background-color: #f8fafc !important; border: 1px solid #cbd5e1 !important; color: #334155 !important; border-radius: 8px !important; padding: 0.8rem 1rem !important; font-size: 0.95rem !important; transition: all 0.2s ease !important; box-shadow: none !important; }
.clinic-dialog .p-inputtext:focus, .clinic-dialog .p-select.p-focus, .clinic-dialog .p-dropdown.p-focus { background-color: #ffffff !important; border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important; outline: none !important; }
</style>
