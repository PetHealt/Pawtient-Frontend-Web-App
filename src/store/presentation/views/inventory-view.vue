<script setup>
import { onMounted, ref } from 'vue';
import { storeStore } from "../../application/store.store.js";

const displayDialog = ref(false);
const item = ref({ id: 0, name: '', stock: 0, price: 0 });

onMounted(() => storeStore.loadInventory());

const openNew = () => {
  item.value = { id: 0, name: '', stock: 0, price: 0 };
  displayDialog.value = true;
};

const openEdit = (data) => {
  item.value = { ...data };
  displayDialog.value = true;
};

const saveItem = async () => {
  await storeStore.addProduct(item.value);
  displayDialog.value = false;
};

const confirmDelete = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar este insumo?")) {
    await storeStore.deleteProduct(id);
  }
};
</script>

<template>
  <div class="surface-card p-5 shadow-2 border-round">
    <div class="flex justify-content-between align-items-center mb-4">
      <h2 class="text-3xl font-bold m-0 text-900">Inventario de Almacén</h2>
      <pv-button label="Nuevo Insumo" icon="pi pi-plus" @click="openNew" />
    </div>

    <pv-data-table :value="storeStore.products" :loading="storeStore.loading" stripedRows>
      <pv-column field="name" header="Insumo" class="font-bold"></pv-column>
      <pv-column field="stock" header="Stock Actual"></pv-column>
      <pv-column field="price" header="Precio (S/)"></pv-column>
      <pv-column header="Acciones">
        <template #body="slotProps">
          <div class="flex gap-2">
            <pv-button icon="pi pi-pencil" class="p-button-text p-button-warning" @click="openEdit(slotProps.data)" />
            <pv-button icon="pi pi-trash" class="p-button-text p-button-danger" @click="confirmDelete(slotProps.data.id)" />
          </div>
        </template>
      </pv-column>
    </pv-data-table>

    <pv-dialog v-model:visible="displayDialog" :header="item.id ? 'Editar Insumo' : 'Registrar Nuevo Insumo'" modal :style="{ width: '400px' }">
      <div class="flex flex-column gap-4 mt-2">
        <div class="flex flex-column gap-1">
          <label class="font-bold">Nombre del insumo</label>
          <pv-input-text v-model="item.name" class="w-full" />
        </div>
        <div class="flex flex-column gap-1">
          <label class="font-bold">Stock</label>
          <pv-input-number v-model="item.stock" class="w-full" />
        </div>
        <div class="flex flex-column gap-1">
          <label class="font-bold">Precio</label>
          <pv-input-number v-model="item.price" mode="currency" currency="PEN" locale="es-PE" class="w-full" />
        </div>
      </div>
      <template #footer>
        <pv-button label="Cancelar" icon="pi pi-times" text @click="displayDialog = false" />
        <pv-button label="Guardar" icon="pi pi-check" @click="saveItem" />
      </template>
    </pv-dialog>
  </div>
</template>