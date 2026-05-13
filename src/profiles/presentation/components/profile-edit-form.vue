<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialData: Object
});

const emit = defineEmits(['save', 'cancel']);

const formData = ref({ ...props.initialData });

function submit() {
  emit('save', formData.value);
}
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-column gap-3">
    <div class="flex flex-column gap-1">
      <label class="font-bold text-700">Nombre</label>
      <input v-model="formData.name" type="text" class="p-2 border-1 border-300 border-round" required />
    </div>
    <div class="flex flex-column gap-1">
      <label class="font-bold text-700">Correo</label>
      <input v-model="formData.email" type="email" class="p-2 border-1 border-300 border-round" required />
    </div>
    <div class="flex flex-column gap-1">
      <label class="font-bold text-700">Nombre del Negocio</label>
      <input v-model="formData.clinicName" type="text" class="p-2 border-1 border-300 border-round" />
    </div>
    <div class="flex justify-content-end gap-2 mt-3">
      <button type="button" @click="$emit('cancel')" class="p-button p-button-text">Cancelar</button>
      <button type="submit" class="p-button p-button-primary">Guardar Cambios</button>
    </div>
  </form>
</template>