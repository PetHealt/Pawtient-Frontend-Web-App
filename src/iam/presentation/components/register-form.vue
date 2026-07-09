<script setup>
import { ref } from 'vue';
import { useI18n } from "vue-i18n";

const emit = defineEmits(['register-requested']);
const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('admin');
const clinicName = ref('');
const { t } = useI18n();

function submitRegister() {
  emit('register-requested', {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
    clinicName: clinicName.value,
    clinicId: Date.now().toString()
  });
}
</script>

<template>
  <form @submit.prevent="submitRegister" class="custom-form">
    <div class="form-group">
      <label for="name">{{ t('auth.fullName') }}</label>
      <input id="name" v-model="name" type="text" required :placeholder="t('auth.fullNamePlaceholder')" />
    </div>

    <div class="form-group">
      <label for="email">{{ t('auth.email') }}</label>
      <input id="email" v-model="email" type="email" required :placeholder="t('auth.emailPlaceholder')" />
    </div>

    <div class="form-group">
      <label for="password">{{ t('auth.password') }}</label>
      <input id="password" v-model="password" type="password" required placeholder="••••••••" />
    </div>

    <div class="role-selection">
      <label class="role-title">{{ t('auth.useQuestion') }}</label>

      <label class="radio-card" :class="{ active: role === 'admin' }">
        <input type="radio" value="admin" v-model="role" />
        <div class="radio-content">
          <i class="pi pi-building"></i>
          <span>{{ t('auth.clinicOwner') }}</span>
        </div>
      </label>

      <label class="radio-card" :class="{ active: role === 'freelancer' }">
        <input type="radio" value="freelancer" v-model="role" />
        <div class="radio-content">
          <i class="pi pi-user"></i>
          <span>{{ t('auth.freelancer') }}</span>
        </div>
      </label>
    </div>

    <div class="form-group" style="margin-top: 0.5rem;">
      <label for="clinicName">{{ t('auth.clinicName') }}</label>
      <input id="clinicName" v-model="clinicName" type="text" required :placeholder="t('auth.clinicNamePlaceholder')" />
    </div>

    <button type="submit" class="submit-btn">
      {{ t('auth.createAccount') }}
    </button>
  </form>
</template>

<style scoped>
.custom-form { display: flex; flex-direction: column; gap: 1.2rem; width: 100%; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-group label { color: #334155; font-weight: 700; font-size: 0.95rem; }
.form-group input { padding: 0.9rem 1rem; border: 1px solid #d1dce8; border-radius: 8px; font-size: 1rem; color: #17233c; background: #f8fbff; outline: none; transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s; }
.form-group input:focus { background: #ffffff; border-color: #2f80ed; box-shadow: 0 0 0 3px rgba(47, 128, 237, 0.14); }
.role-selection { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 0.5rem; }
.role-title { color: #17233c; font-weight: 800; }
.radio-card { border: 1px solid #dbe5f1; border-radius: 8px; padding: 1rem; cursor: pointer; transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s; display: flex; align-items: center; background: #ffffff; }
.radio-card input[type="radio"] { display: none; }
.radio-content { display: flex; align-items: center; gap: 1rem; color: #475569; font-weight: 700; }
.radio-content i { font-size: 1.5rem; }
.radio-card:hover { border-color: #b7c8dd; box-shadow: 0 8px 18px rgba(51, 65, 85, 0.06); }
.radio-card.active { border-color: #2f80ed; background-color: #eff7ff; color: #1455d9; box-shadow: inset 0 0 0 1px rgba(47, 128, 237, 0.15); }
.radio-card.active .radio-content { color: #1455d9; }
.submit-btn { width: 100%; padding: 1rem; background: linear-gradient(135deg, #1d6ce3, #1455d9); color: white; border: none; border-radius: 8px; font-size: 1.05rem; font-weight: 750; cursor: pointer; margin-top: 1rem; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 12px 22px rgba(29, 108, 227, 0.24); }
.submit-btn:hover { transform: translateY(-1px); box-shadow: 0 16px 28px rgba(29, 108, 227, 0.3); }
</style>
