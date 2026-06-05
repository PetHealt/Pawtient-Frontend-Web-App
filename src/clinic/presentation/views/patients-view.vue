<script setup>
import { ref, onMounted } from 'vue';
import { clinicStore } from "../../application/clinic.store.js";
import PetForm from "../components/pet-form.vue";

const isDialogVisible = ref(false);
const selectedPet = ref(null);

onMounted(() => clinicStore.loadPets());

const openNew = () => {
  selectedPet.value = null;
  isDialogVisible.value = true;
};

const editPet = (pet) => {
  selectedPet.value = { ...pet };
  isDialogVisible.value = true;
};

const confirmDelete = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
    try {
      await clinicStore.deletePet(id);
    } catch (error) {
      alert("Error al eliminar");
    }
  }
};

const handleSave = async (data) => {
  await clinicStore.savePet(data);
  isDialogVisible.value = false;
};
</script>

<template>
  <div class="p-4 lg:p-6">
    <div class="clinic-card">
      <div class="flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center mb-5 gap-3">
        <div>
          <h1 class="text-3xl font-bold m-0 text-gray-800">Gestión de Pacientes</h1>
          <p class="text-gray-500 m-0 mt-1">Administra la información de las mascotas.</p>
        </div>
        <pv-button label="Registrar Mascota" icon="pi pi-plus" class="btn-primary-clinic" @click="openNew" />
      </div>

      <pv-data-table :value="clinicStore.pets" :loading="clinicStore.loading" stripedRows class="clinic-table">
        <template #empty> <div class="p-4 text-center text-gray-500">No se encontraron mascotas en el sistema.</div> </template>

        <pv-column field="name" header="Nombre" sortable class="font-bold text-blue-600"></pv-column>
        <pv-column field="type" header="Especie"></pv-column>
        <pv-column field="breed" header="Raza"></pv-column>
        <pv-column field="age" header="Edad">
          <template #body="slotProps"> {{ slotProps.data.age }} años </template>
        </pv-column>

        <pv-column header="Acciones" fixed="right">
          <template #body="slotProps">
            <div class="flex gap-2">
              <pv-button icon="pi pi-pencil" class="p-button-rounded p-button-text text-blue-500 hover:surface-200" @click="editPet(slotProps.data)" />
              <pv-button icon="pi pi-trash" class="p-button-rounded p-button-text text-red-500 hover:surface-200" @click="confirmDelete(slotProps.data.id)" />
            </div>
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <!-- COMPONENTE DEL FORMULARIO -->
    <PetForm
        :visible="isDialogVisible"
        :pet="selectedPet"
        @close="isDialogVisible = false"
        @save="handleSave"
    />
  </div>
</template>

<style scoped>
/* Estilo de Tarjeta Principal */
.clinic-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

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