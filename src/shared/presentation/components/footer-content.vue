<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="footer-container">
    <p>{{ t('footer.copyright') }}</p>
  </div>
</template>

<style scoped>
.footer-container {
  width: 100%;
  background-color: #3b82f6;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
}

p {
  margin: 0;
}
</style>
