<script setup>
import { ref } from 'vue';
import { useI18n } from "vue-i18n";

const props = defineProps({
  initialData: Object
});

const emit = defineEmits(['save', 'cancel']);
const formData = ref({ ...props.initialData });
const { t } = useI18n();

function submit() {
  emit('save', formData.value);
}
</script>

<template>
  <form @submit.prevent="submit" class="mt-2">
    <div class="grid formgrid">
      <div class="col-12 md:col-6 mb-3">
        <label class="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-widest">{{ t('profile.fullName') }}</label>
        <pv-input-text v-model="formData.name" type="text" class="w-full clinic-input" required :placeholder="t('profile.namePlaceholder')" />
      </div>

      <div class="col-12 md:col-6 mb-3">
        <label class="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-widest">{{ t('common.email') }}</label>
        <pv-input-text v-model="formData.email" type="email" class="w-full clinic-input" required :placeholder="t('profile.emailPlaceholder')" />
      </div>

      <div class="col-12 mb-3">
        <label class="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-widest">{{ t('profile.clinicName') }}</label>
        <pv-input-text v-model="formData.clinicName" type="text" class="w-full clinic-input" :placeholder="t('profile.clinicPlaceholder')" />
      </div>
    </div>

    <div class="flex justify-content-end gap-3 mt-1">
      <pv-button type="button" :label="t('common.cancel')" class="p-button-text text-gray-500 hover:text-gray-800 font-semibold p-2" @click="$emit('cancel')" />
      <pv-button type="submit" :label="t('profile.saveChanges')" icon="pi pi-save" class="btn-primary-clinic" />
    </div>
  </form>
</template>

<style scoped>
.clinic-input { background-color: #f8fafc !important; border: 1px solid #cbd5e1 !important; color: #334155 !important; border-radius: 8px !important; padding: 0.7rem 1rem !important; font-size: 0.95rem !important; transition: all 0.2s ease !important; }
.clinic-input:focus { background-color: #ffffff !important; border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important; outline: none !important; }
.btn-primary-clinic { background-color: #2563eb !important; border: none !important; border-radius: 8px !important; font-weight: 600 !important; padding: 0.6rem 1.2rem !important; transition: background-color 0.2s, transform 0.1s !important; }
.btn-primary-clinic:hover { background-color: #1d4ed8 !important; transform: translateY(-1px) !important; }
</style>
