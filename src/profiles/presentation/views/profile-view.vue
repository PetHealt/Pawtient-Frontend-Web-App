<script setup>
import { ref, onMounted } from 'vue';
import { authStore } from "../../../iam/application/auth.store.js";
import { ProfilesApi } from "../../infrastructure/profiles-api.js";
import { useRouter } from "vue-router";
import ProfileEditForm from "../components/profile-edit-form.vue";

const router = useRouter();
const profilesApi = new ProfilesApi();
const user = ref(null);

onMounted(() => {
  user.value = authStore.currentUser;
});

const handleSave = async (updatedData) => {
  try {
    await profilesApi.updateProfile(user.value.id, updatedData);
    const updatedUser = { ...authStore.currentUser, ...updatedData };
    authStore.currentUser = updatedUser;
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    router.push('/home');
  } catch (error) {
    console.error(error);
  }
};

const removeUser = async () => {
  const userId = user.value?.id;
  if (!userId) return;

  if (confirm("¿Estás seguro de eliminar tu cuenta permanentemente? Esta acción borrará tu acceso y no se puede deshacer.")) {
    const success = await authStore.deleteUserAccount(userId);
    if (success) {
      authStore.logout();
      window.location.href = '/login';
    } else {
      alert("Hubo un error al intentar eliminar la cuenta.");
    }
  }
};
</script>

<template>
  <div class="p-4 lg:p-5">
    <div class="clinic-profile-card mx-auto w-full" style="max-width: 750px;">

      <!-- CABECERA -->
      <div class="flex align-items-center mb-3 pb-3 border-bottom-1 border-gray-200">
        <button @click="router.push('/home')" class="back-btn mr-3">
          <i class="pi pi-arrow-left"></i>
        </button>
        <div>
          <h1 class="text-2xl font-bold m-0 text-gray-800">Mi Perfil Profesional</h1>
          <p class="text-gray-500 m-0 mt-1 text-sm">Actualiza tu información y los datos de tu clínica.</p>
        </div>
      </div>

      <!-- FORMULARIO -->
      <ProfileEditForm
          v-if="user"
          :initialData="{ name: user.name, email: user.email, clinicName: user.clinicName }"
          @save="handleSave"
          @cancel="router.push('/home')"
      />
      <div v-else class="flex justify-content-center p-4">
        <i class="pi pi-spin pi-spinner text-blue-500" style="font-size: 2rem"></i>
      </div>

      <!-- ZONA DE PELIGRO COMPACTA -->
      <div v-if="user" class="danger-zone mt-4">
        <div class="flex flex-column md:flex-row align-items-start md:align-items-center justify-content-between gap-3">
          <div class="flex align-items-center gap-3">
            <div class="icon-box-danger">
              <i class="pi pi-exclamation-triangle text-lg"></i>
            </div>
            <div>
              <h3 class="text-red-600 font-bold m-0 text-base mb-1">Zona de Peligro</h3>
              <p class="text-gray-600 text-xs m-0">Al eliminar tu cuenta, perderás el acceso permanentemente.</p>
            </div>
          </div>

          <button class="btn-danger-outline w-full md:w-auto text-sm" @click="removeUser">
            <i class="pi pi-trash mr-1"></i> Eliminar cuenta
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Tarjeta principal más compacta */
.clinic-profile-card {
  background-color: #ffffff;
  padding: 1.5rem 2rem; /* Redujimos el relleno superior/inferior */
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); /* Sombra más sutil */
}

/* Botón circular de retroceso */
.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.back-btn:hover {
  background-color: #f1f5f9;
  color: #1e293b;
  transform: translateX(-3px);
}

/* Zona de Peligro más pequeña */
.danger-zone {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 1rem 1.2rem;
}

.icon-box-danger {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #fee2e2;
  color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-danger-outline {
  background-color: transparent;
  border: 2px solid #fecaca;
  color: #dc2626;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.btn-danger-outline:hover {
  background-color: #dc2626;
  color: white;
  border-color: #dc2626;
}
</style>