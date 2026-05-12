<script setup>
import { ref, onMounted } from 'vue';
import { authStore } from "../../../iam/application/auth.store.js";
import { ProfilesApi } from "../../infrastructure/profiles-api.js";
import { useRouter } from "vue-router";

// IMPORTANTE: Asegúrate de que este archivo exista en components
import ProfileEditForm from "../components/profile-edit-form.vue";

const router = useRouter();
const profilesApi = new ProfilesApi();

// Cargamos el usuario actual del store
const user = ref(null);

onMounted(() => {
  user.value = authStore.currentUser;
});

const handleSave = async (updatedData) => {
  try {
    // 1. Mandamos solo los cambios al db.json usando PATCH
    await profilesApi.updateProfile(user.value.id, updatedData);

    // 2. Fusionamos: mantenemos lo que ya había (password, role, etc) y sumamos lo nuevo
    const updatedUser = { ...authStore.currentUser, ...updatedData };

    // 3. Guardamos la versión completa en el store y localStorage
    authStore.currentUser = updatedUser;
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    alert("¡Perfil actualizado sin perder datos!");
    router.push('/home');
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="p-5 flex justify-content-center">
    <div class="surface-card p-5 shadow-2 border-round w-full lg:w-6">
      <div class="flex align-items-center mb-4">
        <button @click="router.push('/home')" class="p-button p-button-text p-button-plain p-button-rounded mr-3">
          <i class="pi pi-arrow-left"></i>
        </button>
        <h1 class="text-2xl font-bold m-0">Editar Mi Perfil</h1>
      </div>

      <ProfileEditForm
          v-if="user"
          :initialData="{ name: user.name, email: user.email, clinicName: user.clinicName }"
          @save="handleSave"
          @cancel="router.push('/home')"
      />

      <div v-else class="flex justify-content-center p-5">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      </div>
    </div>
  </div>
</template>