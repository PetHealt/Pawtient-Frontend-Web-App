<script setup>
import Layout from './shared/presentation/components/layout.vue';
</script>

<template>
  <Layout />
</template>

<style>
/* Reseteo Global - Tema Clínico Pawtient */
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family, 'Inter', Arial, sans-serif);
  background-color: #f4f6f8 !important; /* Gris perla muy claro para descansar la vista */
  color: #334155;
}

/* Scrollbar sutil */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>