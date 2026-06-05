<script setup>
import { ref } from 'vue';
import { useI18n } from "vue-i18n";

const props = defineProps({ visible: Boolean });
const emit = defineEmits(['close', 'save']);

const newPet = ref({ name: '', type: '', breed: '', age: 0 });
const { t } = useI18n();

const save = () => {
  emit('save', { ...newPet.value });
  newPet.value = { name: '', type: '', breed: '', age: 0 }; // Reset
};
</script>

<template>
  <Dialog v-model:visible="isDialogVisible" modal :header="t('patients.details')" :style="{ width: '400px' }">
    <div class="flex flex-column gap-3">
      <div class="field">
        <label for="name" class="font-bold">{{ t('common.name') }}</label>
        <InputText id="name" v-model="selectedPet.name" class="w-full" />
      </div>
    </div>
    <template #footer>
      <pv-button :label="t('common.cancel')" icon="pi pi-times" text @click="isDialogVisible = false" />
      <pv-button :label="t('common.save')" icon="pi pi-check" @click="handleSave" />
    </template>
  </Dialog>
</template>
