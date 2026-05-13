<script setup>
import { ref, onMounted } from 'vue';
import { clinicStore } from "../../application/clinic.store.js";

// ESTA LÍNEA ES LA QUE FALTA O ESTÁ MAL
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
    <div class="surface-card p-5 shadow-2 border-round">
      <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-5 gap-3">
        <div>
          <h1 class="text-3xl font-bold m-0 text-900">Gestión de Pacientes</h1>
          <p class="text-600 m-0 mt-1">Administra la información de las mascotas.</p>
        </div>
        <pv-button label="Registrar Mascota" icon="pi pi-plus" @click="openNew" />
      </div>

      <pv-data-table :value="clinicStore.pets" :loading="clinicStore.loading" stripedRows>
        <template #empty> No se encontraron mascotas. </template>

        <pv-column field="name" header="Nombre" sortable class="font-bold"></pv-column>
        <pv-column field="type" header="Especie"></pv-column>
        <pv-column field="breed" header="Raza"></pv-column>
        <pv-column field="age" header="Edad">
          <template #body="slotProps"> {{ slotProps.data.age }} años </template>
        </pv-column>

        <pv-column header="Acciones">
          <template #body="slotProps">
            <div class="flex gap-2">
              <pv-button icon="pi pi-pencil" class="p-button-text p-button-warning" @click="editPet(slotProps.data)" />
              <pv-button icon="pi pi-trash" class="p-button-text p-button-danger" @click="confirmDelete(slotProps.data.id)" />
            </div>
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <PetForm
        :visible="isDialogVisible"
        :pet="selectedPet"
        @close="isDialogVisible = false"
        @save="handleSave"
    />
  </div>
</template>