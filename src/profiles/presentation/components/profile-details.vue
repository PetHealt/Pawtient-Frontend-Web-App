<script setup>
import { Profile } from "../../domain/model/profile.entity.js";
import { useI18n } from "vue-i18n";

defineProps({
  profile: {
    type: Profile,
    required: true
  }
});

const { t } = useI18n();
</script>

<template>
  <div class="profile-card">
    <div class="info-row">
      <i class="pi pi-user"></i>
      <div>
        <label>{{ t('profile.fullName') }}</label>
        <p>{{ profile.fullName }}</p>
      </div>
    </div>
    <div class="info-row">
      <i class="pi pi-envelope"></i>
      <div>
        <label>{{ t('common.email') }}</label>
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <div class="info-row">
      <i class="pi pi-building"></i>
      <div>
        <label>{{ t('profile.clinicName') }}</label>
        <p>{{ profile.clinicName || t('profile.unspecified') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-card { display: flex; flex-direction: column; gap: 1.5rem; }
.info-row { display: flex; align-items: center; gap: 1rem; }
.info-row i { font-size: 1.5rem; color: #3b82f6; width: 30px; }
label { font-size: 0.85rem; color: #64748b; font-weight: bold; display: block; }
p { margin: 0; font-size: 1.1rem; color: #1e293b; }
</style>
