import { createI18n } from 'vue-i18n';

// Mensajes básicos (luego podemos ampliarlos)
const messages = {
    en: {
        welcome: 'Welcome',
    },
    es: {
        welcome: 'Bienvenido',
    }
};

const i18n = createI18n({
    legacy: false, // Requerido para usar Vue 3 Composition API (script setup)
    locale: 'es',  // Idioma por defecto
    fallbackLocale: 'en',
    messages,
});

export default i18n;