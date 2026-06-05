<script setup>
import { authStore } from "../../../iam/application/auth.store.js";
import { useRouter } from "vue-router";
import { onMounted, computed } from "vue";
import { appointmentsStore } from "../../../appointments/application/appointments.store.js";

const user = authStore.currentUser;
const router = useRouter();

// Carga las citas al iniciar para que el contador sea real
onMounted(() => {
  appointmentsStore.loadAppointments();
});

// Calculamos dinámicamente cuántas citas están en estado 'scheduled' (Pendientes)
const pendingCount = computed(() => {
  return appointmentsStore.appointments.filter(a => a.status === 'scheduled').length;
});

const goToEdit = () => {
  router.push('/profile');
};
</script>

<template>
  <div class="p-5 lg:p-7">
    <!-- BANNER DE BIENVENIDA -->
    <div class="clinic-welcome-card mb-5">
      <div class="flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center gap-3">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2 m-0">¡Hola, {{ user?.name.split(' ')[0] }}! 👋</h1>
          <p class="text-gray-500 m-0 text-lg">Panel de control para <span class="font-bold text-blue-600">{{ user?.clinicName }}</span></p>
        </div>
        <button @click="goToEdit" class="btn-outline-clinic">
          <i class="pi pi-user-edit mr-2"></i> Editar Perfil
        </button>
      </div>
    </div>

    <div class="grid">
      <!-- TARJETA 1: INFORMACIÓN GENERAL -->
      <div class="col-12 md:col-6 lg:col-5">
        <div class="clinic-stat-card h-full flex flex-column">
          <div class="flex align-items-center justify-content-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 m-0">Información General</h2>
            <div class="icon-box bg-blue-50 text-blue-600">
              <i class="pi pi-id-card text-xl"></i>
            </div>
          </div>

          <div class="flex flex-column gap-4 flex-grow-1">
            <div>
              <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre Completo</span>
              <div class="text-gray-800 font-semibold text-lg">{{ user?.name }}</div>
            </div>
            <div>
              <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Correo Electrónico</span>
              <div class="text-gray-800 font-semibold text-lg">{{ user?.email }}</div>
            </div>
            <div>
              <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Rol en el sistema</span>
              <div class="text-gray-800 font-semibold text-lg">
                {{ user?.role === 'admin' ? 'Administrador' : 'Veterinario' }}
              </div>
            </div>
          </div>

          <div class="mt-4 pt-4 border-top-1 border-gray-200 flex justify-content-between align-items-center">
            <span class="text-gray-500 font-medium text-sm">Plan actual: <span class="text-gray-800 font-bold">{{ user?.plan || 'Free' }}</span></span>
            <router-link to="/choose-plan" class="text-blue-600 font-bold no-underline hover:text-blue-800 transition-colors text-sm">Cambiar plan</router-link>
          </div>
        </div>
      </div>

      <!-- TARJETA 2: CITAS PENDIENTES -->
      <div class="col-12 md:col-6 lg:col-4">
        <div class="clinic-stat-card h-full flex flex-column justify-content-between relative overflow-hidden">
          <!-- Icono gigante arreglado: ahora es una marca de agua sutil -->
          <i class="pi pi-calendar absolute" style="font-size: 9rem; top: -15px; right: -20px; z-index: 0; color: rgba(37, 99, 235, 0.08); transform: rotate(-10deg);"></i>

          <div class="relative z-10">
            <div class="flex justify-content-between align-items-start mb-2">
              <span class="block text-sm font-bold text-gray-500 uppercase tracking-widest">Citas Pendientes</span>
              <div class="icon-box bg-blue-50 text-blue-500">
                <i class="pi pi-clock text-xl"></i>
              </div>
            </div>
            <!-- Número gigante -->
            <div class="text-blue-600 font-bold text-7xl mb-4 mt-2">
              {{ pendingCount }}
            </div>
          </div>

          <div class="mt-auto pt-4 border-top-1 border-gray-200 relative z-10">
            <router-link to="/appointments/schedule" class="flex align-items-center text-blue-600 font-bold no-underline hover:text-blue-800 transition-colors">
              Ver Agenda Completa <i class="pi pi-arrow-right ml-2 text-sm"></i>
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Fondo general del área de trabajo */
.dashboard-bg {
  background-color: #f4f6f8;
}

/* Tarjeta de bienvenida ancha */
.clinic-welcome-card {
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* Tarjetas de estadísticas (Info y Citas) */
.clinic-stat-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}
.clinic-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Cajas contenedoras de íconos para dar el "Look Médico" */
.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Botón secundario para editar perfil */
.btn-outline-clinic {
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}
.btn-outline-clinic:hover {
  background-color: #f8fafc;
  border-color: #94a3b8;
  color: #1e293b;
}
</style>