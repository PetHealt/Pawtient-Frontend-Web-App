<script setup>
import LoginForm from '../components/login-form.vue';
import { authStore } from '../../application/auth.store.js';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

async function handleLogin(credentials) {
  const success = await authStore.login(credentials.email, credentials.password);
  if (success) {
    router.push('/home');
  } else {
    alert(authStore.errors[0]);
  }
}
</script>

<template>
  <div class="split-layout">
    <div class="left-panel">
      <i class="pi pi-verified brand-icon"></i>
      <h1 class="brand-title">Pawtient</h1>
      <p class="brand-subtitle">{{ t('auth.brandSubtitle') }}</p>
    </div>

    <div class="right-panel">
      <div class="login-card">
        <div class="header-text">
          <h2>{{ t('auth.loginTitle') }}</h2>
          <p>
            {{ t('auth.noAccount') }}
            <router-link to="/register" class="link">{{ t('auth.createFree') }}</router-link>
          </p>
        </div>

        <LoginForm @login-requested="handleLogin" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.split-layout { display: flex; height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; z-index: 2000; background: #f7fbff; }
.left-panel { flex: 1; background: linear-gradient(155deg, #1455d9 0%, #1d6ce3 55%, #16a3a3 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; text-align: center; position: relative; overflow: hidden; }
.left-panel::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 44px 44px; opacity: 0.2; }
.brand-icon { font-size: 5.5rem; margin-bottom: 1rem; position: relative; filter: drop-shadow(0 14px 18px rgba(0, 0, 0, 0.15)); }
.brand-title { font-size: 4rem; margin: 0 0 1rem 0; font-weight: 850; color: #ffffff; position: relative; }
.brand-subtitle { font-size: 1.18rem; color: #dff8ff; max-width: 430px; line-height: 1.55; position: relative; }
.right-panel { flex: 1; display: flex; justify-content: center; align-items: center; background: linear-gradient(180deg, #f8fbff, #eef5fb); padding: 1.5rem; }
.login-card { background: rgba(255, 255, 255, 0.94); padding: 3rem; border-radius: 8px; box-shadow: 0 24px 60px rgba(36, 72, 112, 0.14); border: 1px solid #dbe5f1; width: 100%; max-width: 450px; }
.header-text { text-align: center; margin-bottom: 2rem; }
.header-text h2 { font-size: 2rem; color: #17233c; margin: 0 0 0.5rem 0; font-weight: 850; }
.header-text p { color: #6b7280; margin: 0; font-size: 1rem; }
.link { color: #1455d9; text-decoration: none; font-weight: 700; }
.link:hover { text-decoration: underline; }
@media (max-width: 768px) { .left-panel { display: none; } }
</style>
