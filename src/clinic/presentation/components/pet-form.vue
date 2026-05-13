<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  visible: Boolean,
  pet: Object
});

const emit = defineEmits(['close', 'save']);

const localPet = ref({ name: '', type: '', breed: '', age: 0 });

// Sincronizar los datos cuando se edita una mascota existente
watch(() => props.pet, (newPet) => {
  if (newPet) {
    localPet.value = { ...newPet };
  } else {
    localPet.value = { name: '', type: '', breed: '', age: 0 };
  }
}, { immediate: true });

const onSave = () => {
  if (localPet.value.name.trim()) {
    emit('save', { ...localPet.value });
  }
};
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="emit('close')" header="Detalles de la Mascota" modal :style="{ width: '400px' }">
    <div class="flex flex-column gap-4 mt-2">

      <div class="flex flex-column gap-2">
        <label for="name" class="font-bold">Nombre</label>
        <pv-input-text id="name" v-model="localPet.name" placeholder="Ej: Max" class="w-full" />
      </div>

      <div class="flex flex-column gap-2">
        <label for="type" class="font-bold">Especie</label>
        <pv-input-text id="type" v-model="localPet.type" placeholder="Ej: Perro, Gato" class="w-full" />
      </div>

      <div class="flex flex-column gap-2">
        <label for="breed" class="font-bold">Raza</label>
        <pv-input-text id="breed" v-model="localPet.breed" placeholder="Ej: Labrador" class="w-full" />
      </div>

      <div class="flex flex-column gap-2">
        <label for="age" class="font-bold">Edad (Años)</label>
        <pv-input-number id="age" v-model="localPet.age" showButtons :min="0" class="w-full" />
      </div>

    </div>

    <template #footer>
      <pv-button label="Cancelar" icon="pi pi-times" text @click="emit('close')" />
      <pv-button label="Guardar" icon="pi pi-check" @click="onSave" />
    </template>
  </pv-dialog>
</template>