<script setup>
import { ref } from 'vue';
import { useI18n } from "vue-i18n";

const emit = defineEmits(['register-requested']);
const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('admin');
const clinicName = ref('');
const { t } = useI18n();

function submitRegister() {
  emit('register-requested', {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
    clinicName: clinicName.value,
    clinicId: Date.now().toString()
  });
}
</script>

<template>
  <form @submit.prevent="submitRegister" class="custom-form">
    <div class="form-group">
      <label for="name">{{ t('auth.fullName') }}</label>
      <input id="name" v-model="name" type="text" required :placeholder="t('auth.fullNamePlaceholder')" />
    </div>

    <div class="form-group">
      <label for="email">{{ t('auth.email') }}</label>
      <input id="email" v-model="email" type="email" required :placeholder="t('auth.emailPlaceholder')" />
    </div>

    <div class="form-group">
      <label for="password">{{ t('auth.password') }}</label>
      <input id="password" v-model="password" type="password" required placeholder="••••••••" />
    </div>

    <div class="role-selection">
      <label class="role-title">{{ t('auth.useQuestion') }}</label>

      <label class="radio-card" :class="{ 'active': role === 'admin' }">
        <input type="radio" value="admin" v-model="role" />
        <div class="radio-content">
          <i class="pi pi-building"></i>
          <span>{{ t('auth.clinicOwner') }}</span>
        </div>
      </label>

      <label class="radio-card" :class="{ 'active': role === 'freelancer' }">
        <input type="radio" value="freelancer" v-model="role" />
        <div class="radio-content">
          <i class="pi pi-user"></i>
          <span>{{ t('auth.freelancer') }}</span>
        </div>
      </label>
    </div>

    <div class="form-group" style="margin-top: 0.5rem;">
      <label for="clinicName">{{ t('auth.clinicName') }}</label>
      <input id="clinicName" v-model="clinicName" type="text" required :placeholder="t('auth.clinicNamePlaceholder')" />
    </div>

    <button type="submit" class="submit-btn">
      {{ t('auth.createAccount') }}
    </button>
  </form>
</template>

<style scoped>
.custom-form { display: flex; flex-direction: column; gap: 1.2rem; width: 100%; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-group label { color: #4b5563; font-weight: 600; font-size: 0.95rem; }
.form-group input { padding: 0.8rem 1rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; color: #1f2937; outline: none; transition: border-color 0.2s; }
.form-group input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); }
.role-selection { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 0.5rem; }
.role-title { color: #1f2937; font-weight: bold; }
.radio-card { border: 2px solid #e5e7eb; border-radius: 8px; padding: 1rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; }
.radio-card input[type="radio"] { display: none; }
.radio-content { display: flex; align-items: center; gap: 1rem; color: #4b5563; font-weight: 600; }
.radio-content i { font-size: 1.5rem; }
.radio-card.active { border-color: #2563eb; background-color: #eff6ff; color: #1d4ed8; }
.radio-card.active .radio-content { color: #1d4ed8; }
.submit-btn { width: 100%; padding: 1rem; background-color: #2563eb; color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; margin-top: 1rem; transition: background-color 0.2s; }
.submit-btn:hover { background-color: #1d4ed8; }
</style>
