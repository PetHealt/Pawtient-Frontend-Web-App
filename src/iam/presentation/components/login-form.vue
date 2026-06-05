<script setup>
import { ref } from 'vue';
import { useI18n } from "vue-i18n";

const emit = defineEmits(['login-requested']);
const email = ref('');
const password = ref('');
const { t } = useI18n();

function submitLogin() {
  emit('login-requested', { email: email.value, password: password.value });
}
</script>

<template>
  <form @submit.prevent="submitLogin" class="custom-form">
    <div class="form-group">
      <label for="email">{{ t('auth.email') }}</label>
      <input id="email" v-model="email" type="email" required :placeholder="t('auth.emailPlaceholder')" />
    </div>

    <div class="form-group">
      <label for="password">{{ t('auth.password') }}</label>
      <input id="password" v-model="password" type="password" required placeholder="••••••••" />
    </div>

    <button type="submit" class="submit-btn">
      <i class="pi pi-sign-in" style="margin-right: 8px;"></i> {{ t('auth.login') }}
    </button>
  </form>
</template>

<style scoped>
.custom-form { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-group label { color: #4b5563; font-weight: 600; font-size: 0.95rem; }
.form-group input { padding: 0.8rem 1rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; color: #1f2937; transition: border-color 0.2s, box-shadow 0.2s; outline: none; }
.form-group input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); }
.submit-btn { width: 100%; padding: 1rem; background-color: #2563eb; color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; margin-top: 1rem; transition: background-color 0.2s; display: flex; justify-content: center; align-items: center; }
.submit-btn:hover { background-color: #1d4ed8; }
</style>
