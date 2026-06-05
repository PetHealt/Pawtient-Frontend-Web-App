<script setup>
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

const setLocale = (value) => {
  locale.value = value;
  localStorage.setItem('locale', value);
};
</script>

<template>
  <div class="language-switcher" :aria-label="t('language.label')">
    <button
        type="button"
        class="language-option"
        :class="{ active: locale === 'es' }"
        :title="t('language.spanish')"
        @click="setLocale('es')"
    >
      ES
    </button>
    <button
        type="button"
        class="language-option"
        :class="{ active: locale === 'en' }"
        :title="t('language.english')"
        @click="setLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.35rem;
  padding: 0.25rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.14);
}

.language-option {
  border: none;
  border-radius: 8px;
  padding: 0.55rem 0.4rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 800;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.language-option:hover,
.language-option.active {
  background: white;
  color: #2563eb;
}
</style>
