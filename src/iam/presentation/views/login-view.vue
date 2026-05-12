<script setup>
import LoginForm from '../components/login-form.vue';
import { authStore } from '../../application/auth.store.js';
import { useRouter } from 'vue-router';

const router = useRouter();

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
      <p class="brand-subtitle">El software de gestión definitivo para tu clínica veterinaria.</p>
    </div>

    <div class="right-panel">
      <div class="login-card">
        <div class="header-text">
          <h2>¡Hola de nuevo! 👋</h2>
          <p>
            ¿No tienes cuenta?
            <router-link to="/register" class="link">Crea una gratis</router-link>
          </p>
        </div>

        <LoginForm @login-requested="handleLogin" />
      </div>
    </div>

  </div>
</template>

<style scoped>
.split-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  background-color: #f3f4f6;
}
.left-panel {
  flex: 1;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
}
.brand-icon {
  font-size: 6rem;
  margin-bottom: 1rem;
}
.brand-title {
  font-size: 4rem;
  margin: 0 0 1rem 0;
  font-weight: 800;
}
.brand-subtitle {
  font-size: 1.25rem;
  color: #bfdbfe;
  max-width: 400px;
  line-height: 1.5;
}
.right-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fafb;
}
.login-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 450px;
}
.header-text {
  text-align: center;
  margin-bottom: 2rem;
}
.header-text h2 {
  font-size: 2rem;
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

/* En pantallas pequeñas, ocultamos el lado azul */
@media (max-width: 768px) {
  .left-panel {
    display: none;
  }
}
</style>