<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="not-found-container">
    <i class="pi pi-exclamation-triangle" style="font-size: 5rem; color: #ef4444; margin-bottom: 1rem;"></i>
    <h1 class="text-primary">404</h1>
    <h2>{{ t('notFound.title') }}</h2>
    <p>{{ t('notFound.message') }}</p>
    <router-link to="/home" class="home-link">{{ t('notFound.backHome') }}</router-link>
  </div>
</template>

<style scoped>
.not-found-container { display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 5rem; text-align: center; }
h1 { font-size: 6rem; margin: 0; }
h2 { font-size: 2rem; color: #333; }
p { color: #666; margin-bottom: 2rem; }
.home-link { padding: 0.8rem 1.5rem; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
.home-link:hover { background-color: #2563eb; }
</style>
