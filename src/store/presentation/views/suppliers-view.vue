<script setup>
import { onMounted, ref } from 'vue';
import { storeStore } from "../../application/store.store.js";

const displayDialog = ref(false);
const supplier = ref({ id: 0, name: '', contact: '', category: '' });

onMounted(() => storeStore.loadSuppliers());

const openNew = () => {
  supplier.value = { id: 0, name: '', contact: '', category: '' };
  displayDialog.value = true;
};

const openEdit = (data) => {
  supplier.value = { ...data };
  displayDialog.value = true;
};

const saveSupplier = async () => {
  if (supplier.value.name.trim()) {
    await storeStore.addSupplier(supplier.value);
    displayDialog.value = false;
  }
};

const confirmDelete = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
    await storeStore.deleteSupplier(id);
  }
};
</script>

<template>
  <div class="surface-card p-5 shadow-2 border-round">
    <div class="flex justify-content-between align-items-center mb-4">
      <h2 class="text-3xl font-bold m-0 text-900">Mis Proveedores</h2>
      <pv-button label="Nuevo Proveedor" icon="pi pi-user-plus" class="p-button-success" @click="openNew" />
    </div>

    <pv-data-table :value="storeStore.suppliers" :loading="storeStore.loading" stripedRows>
      <pv-column field="name" header="Empresa" class="font-bold"></pv-column>
      <pv-column field="contact" header="Contacto"></pv-column>
      <pv-column field="category" header="Categoría"></pv-column>
      <pv-column header="Acciones">
        <template #body="slotProps">
          <div class="flex gap-2">
            <pv-button icon="pi pi-pencil" class="p-button-text p-button-warning" @click="openEdit(slotProps.data)" />
            <pv-button icon="pi pi-trash" class="p-button-text p-button-danger" @click="confirmDelete(slotProps.data.id)" />
          </div>
        </template>
      </pv-column>
    </pv-data-table>

    <pv-dialog v-model:visible="displayDialog" :header="supplier.id ? 'Editar Proveedor' : 'Registrar Proveedor'" modal :style="{width: '450px'}">
      <div class="flex flex-column gap-3 mt-2">
        <div class="field">
          <label class="font-bold">Nombre de la Empresa</label>
          <pv-input-text v-model="supplier.name" class="w-full" />
        </div>
        <div class="field">
          <label class="font-bold">Contacto (Tel/Email)</label>
          <pv-input-text v-model="supplier.contact" class="w-full" />
        </div>
        <div class="field">
          <label class="font-bold">Giro/Categoría</label>
          <pv-input-text v-model="supplier.category" class="w-full" />
        </div>
      </div>
      <template #footer>
        <pv-button label="Cerrar" icon="pi pi-times" class="p-button-text" @click="displayDialog = false" />
        <pv-button label="Registrar" icon="pi pi-check" class="p-button-success" @click="saveSupplier" />
      </template>
    </pv-dialog>
  </div>
</template>