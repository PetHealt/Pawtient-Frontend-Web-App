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
.form-group label { color: #334155; font-weight: 700; font-size: 0.95rem; }
.form-group input { padding: 0.9rem 1rem; border: 1px solid #d1dce8; border-radius: 8px; font-size: 1rem; color: #17233c; background: #f8fbff; transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s; outline: none; }
.form-group input:focus { background: #ffffff; border-color: #2f80ed; box-shadow: 0 0 0 3px rgba(47, 128, 237, 0.14); }
.submit-btn { width: 100%; padding: 1rem; background: linear-gradient(135deg, #1d6ce3, #1455d9); color: white; border: none; border-radius: 8px; font-size: 1.05rem; font-weight: 750; cursor: pointer; margin-top: 1rem; transition: transform 0.2s, box-shadow 0.2s; display: flex; justify-content: center; align-items: center; box-shadow: 0 12px 22px rgba(29, 108, 227, 0.24); }
.submit-btn:hover { transform: translateY(-1px); box-shadow: 0 16px 28px rgba(29, 108, 227, 0.3); }
</style>
