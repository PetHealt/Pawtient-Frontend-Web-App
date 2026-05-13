<script setup>
import { ref } from 'vue';

const props = defineProps({ visible: Boolean });
const emit = defineEmits(['close', 'save']);

const newPet = ref({ name: '', type: '', breed: '', age: 0 });

const save = () => {
  emit('save', { ...newPet.value });
  newPet.value = { name: '', type: '', breed: '', age: 0 }; // Reset
};
</script>

<template>
  <Dialog v-model:visible="isDialogVisible" modal header="Detalles del Paciente" :style="{ width: '400px' }">
    <div class="flex flex-column gap-3">
      <div class="field">
        <label for="name" class="font-bold">Nombre</label>
        <InputText id="name" v-model="selectedPet.name" class="w-full" />
      </div>
    </div>
    <template #footer>
      <pv-button label="Cancelar" icon="pi pi-times" text @click="isDialogVisible = false" />
      <pv-button label="Guardar" icon="pi pi-check" @click="handleSave" />
    </template>
  </Dialog>
</template>