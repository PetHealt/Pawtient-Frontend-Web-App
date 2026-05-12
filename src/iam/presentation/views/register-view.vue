<script setup>
import RegisterForm from '../components/register-form.vue';
import { authStore } from '../../application/auth.store.js';
import { useRouter } from 'vue-router';

const router = useRouter();

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
        <h2>Únete a Pawtient</h2>
        <p>
          ¿Ya tienes cuenta?
          <router-link to="/login" class="link">Inicia sesión</router-link>
        </p>
      </div>

      <RegisterForm @register-requested="handleRegister" />
    </div>

  </div>
</template>

<style scoped>
.register-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f0f4f8, #dbeafe);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  padding: 1rem;
}
.register-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  max-height: 95vh;
  overflow-y: auto; /* Por si la pantalla es muy pequeña */
}
.header-text {
  text-align: center;
  margin-bottom: 2rem;
}
.icon-header {
  font-size: 3.5rem;
  color: #2563eb;
  margin-bottom: 1rem;
}
.header-text h2 {
  font-size: 2.2rem;
  color: #111827;
  margin: 0 0 0.5rem 0;
}
.header-text p {
  color: #6b7280;
  margin: 0;
  font-size: 1rem;
}
.link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}
.link:hover {
  text-decoration: underline;
}
</style>