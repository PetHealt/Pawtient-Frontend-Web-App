<script setup>
import { authStore } from "../../../iam/application/auth.store.js";
const user = authStore.currentUser;
</script>

<template>
  <div class="dashboard-container">
    <h1 class="text-3xl font-bold mb-4">Bienvenido al Panel Principal, {{ user?.name.split(' ')[0] }} </h1>
    <p class="text-gray-600 mb-5">Aquí verás el resumen de tu veterinaria <strong>{{ user?.clinicName }}</strong>.</p>

    <div class="grid flex gap-4">
      <div class="surface-card p-4 shadow-2 border-round flex-1 border-left-3 border-blue-500">
        <h3 class="mt-0 mb-2 text-gray-500">Citas de Hoy</h3>
        <span class="text-4xl font-bold text-blue-500">0</span>
      </div>
      <div class="surface-card p-4 shadow-2 border-round flex-1 border-left-3 border-green-500">
        <h3 class="mt-0 mb-2 text-gray-500">Pacientes Atendidos</h3>
        <span class="text-4xl font-bold text-green-500">0</span>
      </div>
      <div class="surface-card p-4 shadow-2 border-round flex-1 border-left-3 border-orange-500">
        <h3 class="mt-0 mb-2 text-gray-500">Productos Bajos en Stock</h3>
        <span class="text-4xl font-bold text-orange-500">0</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container { padding: 2rem; }
</style>