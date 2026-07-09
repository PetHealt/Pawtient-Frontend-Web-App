<script setup>
import RegisterForm from '../components/register-form.vue';
import { authStore } from '../../application/auth.store.js';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

async function handleRegister(userData) {
  const success = await authStore.register(userData);
  if (success) {
    router.push('/choose-plan');
  } else {
    alert(authStore.errors[0]);
  }
}
</script>

<template>
  <div class="register-layout">
    <div class="register-card">
      <div class="header-text">
        <i class="pi pi-user-plus icon-header"></i>
        <h2>{{ t('auth.join') }}</h2>
        <p>
          {{ t('auth.hasAccount') }}
          <router-link to="/login" class="link">{{ t('auth.signIn') }}</router-link>
        </p>
      </div>

      <RegisterForm @register-requested="handleRegister" />
    </div>
  </div>
</template>

<style scoped>
.register-layout { display: flex; align-items: center; justify-content: center; min-height: 100vh; width: 100vw; background: linear-gradient(180deg, #f8fbff, #eaf4fb); position: fixed; top: 0; left: 0; z-index: 2000; padding: 1rem; }
.register-card { background: rgba(255, 255, 255, 0.96); padding: 3rem; border-radius: 8px; border: 1px solid #dbe5f1; box-shadow: 0 24px 60px rgba(36, 72, 112, 0.14); width: 100%; max-width: 500px; max-height: 95vh; overflow-y: auto; box-sizing: border-box; }
.header-text { text-align: center; margin-bottom: 2rem; }
.icon-header { font-size: 3.5rem; color: #1d6ce3; margin-bottom: 1rem; }
.header-text h2 { font-size: 2.2rem; color: #17233c; margin: 0 0 0.5rem 0; font-weight: 850; }
.header-text p { color: #6b7280; margin: 0; font-size: 1rem; }
.link { color: #1455d9; text-decoration: none; font-weight: 700; }
.link:hover { text-decoration: underline; }
</style>
