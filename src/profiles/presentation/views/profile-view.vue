<script setup>
import { computed } from 'vue';
import { authStore } from "../../../iam/application/auth.store.js";
import { useRouter } from "vue-router";
import ProfileEditForm from "../components/profile-edit-form.vue";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();
const user = computed(() => authStore.currentUser);

const handleSave = async (updatedData) => {
  try {
    await authStore.updateProfile(updatedData);
    router.push('/home');
  } catch (error) {
    console.error(error);
  }
};

const removeUser = async () => {
  if (!user.value?.id) return;

  if (confirm(t('profile.confirmDelete'))) {
    const success = await authStore.deleteUserAccount();
    if (success) {
      authStore.logout();
      window.location.href = '/login';
    } else {
      alert(t('profile.deleteError'));
    }
  }
};
</script>

<template>
  <div class="p-4 lg:p-5">
    <div class="clinic-profile-card mx-auto w-full" style="max-width: 750px;">

      <div class="flex align-items-center mb-3 pb-3 border-bottom-1 border-gray-200">
        <button @click="router.push('/home')" class="back-btn mr-3">
          <i class="pi pi-arrow-left"></i>
        </button>
        <div>
          <h1 class="text-2xl font-bold m-0 text-gray-800">{{ t('profile.title') }}</h1>
          <p class="text-gray-500 m-0 mt-1 text-sm">{{ t('profile.subtitle') }}</p>
        </div>
      </div>

      <ProfileEditForm
          v-if="user"
          :initialData="{ name: user.name, email: user.email, clinicName: user.clinicName }"
          @save="handleSave"
          @cancel="router.push('/home')"
      />
      <div v-else class="flex justify-content-center p-4">
        <i class="pi pi-spin pi-spinner text-blue-500" style="font-size: 2rem"></i>
      </div>

      <div v-if="user" class="danger-zone mt-4">
        <div class="flex flex-column md:flex-row align-items-start md:align-items-center justify-content-between gap-3">
          <div class="flex align-items-center gap-3">
            <div class="icon-box-danger">
              <i class="pi pi-exclamation-triangle text-lg"></i>
            </div>
            <div>
              <h3 class="text-red-600 font-bold m-0 text-base mb-1">{{ t('profile.dangerZone') }}</h3>
              <p class="text-gray-600 text-xs m-0">{{ t('profile.dangerText') }}</p>
            </div>
          </div>

          <button class="btn-danger-outline w-full md:w-auto text-sm" @click="removeUser">
            <i class="pi pi-trash mr-1"></i> {{ t('profile.deleteAccount') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clinic-profile-card {
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
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
.back-btn:hover { background-color: #f1f5f9; color: #1e293b; transform: translateX(-3px); }
.danger-zone { background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 1rem 1.2rem; }
.icon-box-danger { width: 40px; height: 40px; border-radius: 10px; background-color: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.btn-danger-outline { background-color: transparent; border: 2px solid #fecaca; color: #dc2626; padding: 0.6rem 1rem; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }
.btn-danger-outline:hover { background-color: #dc2626; color: white; border-color: #dc2626; }
</style>
