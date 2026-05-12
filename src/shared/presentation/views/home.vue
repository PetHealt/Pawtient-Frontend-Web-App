<script setup>
import { authStore } from "../../../iam/application/auth.store.js";
import { useRouter } from "vue-router";

const user = authStore.currentUser;
const router = useRouter();

const goToEdit = () => {
  router.push('/profile');
};
</script>

<template>
  <div class="p-5 surface-ground min-h-screen">
    <div class="grid">

      <div class="col-12">
        <div class="surface-card p-4 shadow-2 border-round mb-4 flex justify-content-between align-items-center">
          <div>
            <h1 class="text-900 font-bold text-3xl mb-2 m-0">¡Hola, {{ user?.name.split(' ')[0] }}! 👋</h1>
            <p class="text-600 m-0 text-lg">Panel de control para <strong>{{ user?.clinicName }}</strong></p>
          </div>
          <button @click="goToEdit" class="p-button p-button-outlined p-button-secondary border-round-lg">
            <i class="pi pi-pencil mr-2"></i> Editar Perfil
          </button>
        </div>
      </div>

      <div class="col-12 md:col-6 lg:col-4">
        <div class="surface-card p-4 shadow-2 border-round h-full">
          <div class="flex align-items-center justify-content-between mb-4">
            <span class="text-900 font-bold text-xl">Información General</span>
            <div class="bg-blue-100 border-round p-2">
              <i class="pi pi-id-card text-blue-500 text-2xl"></i>
            </div>
          </div>

          <div class="flex flex-column gap-3">
            <div>
              <label class="text-500 font-semibold block mb-1">Nombre Completo</label>
              <div class="text-900 font-medium text-lg">{{ user?.name }}</div>
            </div>
            <div>
              <label class="text-500 font-semibold block mb-1">Correo Electrónico</label>
              <div class="text-900 font-medium text-lg">{{ user?.email }}</div>
            </div>
            <div>
              <label class="text-500 font-semibold block mb-1">Especialidad</label>
              <div class="text-900 font-medium text-lg">
                {{ user?.role === 'admin' ? 'Administrador' : 'Veterinario' }}
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-top-1 border-200 flex justify-content-between align-items-center">
            <span class="text-700 font-bold">Plan: {{ user?.plan }}</span>
            <router-link to="/choose-plan" class="text-blue-500 font-bold no-underline hover:underline">Cambiar</router-link>
          </div>
        </div>
      </div>

      <div class="col-12 md:col-6 lg:col-4">
        <div class="surface-card p-4 shadow-2 border-round h-full border-left-3 border-orange-500">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">Citas Pendientes</span>
              <div class="text-900 font-bold text-3xl">0</div>
            </div>
            <div class="bg-orange-100 border-round p-2" style="width:2.5rem;height:2.5rem">
              <i class="pi pi-calendar text-orange-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #f8fafc;
  min-height: 100vh;
}
</style>