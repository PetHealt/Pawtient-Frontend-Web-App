<script setup>
import Layout from './shared/presentation/components/layout.vue';
</script>

<template>
  <Layout />
</template>

<style>
:root {
  --pw-blue-700: #1455d9;
  --pw-blue-600: #1d6ce3;
  --pw-blue-500: #2f80ed;
  --pw-teal-500: #16a3a3;
  --pw-emerald-500: #20b486;
  --pw-coral-500: #f15f5f;
  --pw-ink-900: #17233c;
  --pw-ink-700: #334155;
  --pw-ink-500: #64748b;
  --pw-line: #dbe5f1;
  --pw-card: rgba(255, 255, 255, 0.94);
  --pw-shadow: 0 16px 38px rgba(36, 72, 112, 0.12);
  --pw-shadow-soft: 0 8px 22px rgba(36, 72, 112, 0.08);
  --font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
  background: linear-gradient(180deg, #f8fbff 0%, #eef5fb 46%, #f7fafc 100%) !important;
  color: var(--pw-ink-700);
  letter-spacing: 0;
}

button,
input,
textarea,
.p-component {
  font-family: var(--font-family) !important;
}

#app {
  min-height: 100vh;
}

h1,
h2,
h3,
p {
  letter-spacing: 0;
}

.clinic-card,
.clinic-stat-card,
.clinic-welcome-card {
  background: var(--pw-card) !important;
  border: 1px solid rgba(219, 229, 241, 0.9) !important;
  border-radius: 8px !important;
  box-shadow: var(--pw-shadow-soft) !important;
}

.clinic-card {
  overflow: hidden;
}

.clinic-card:hover,
.clinic-stat-card:hover,
.clinic-welcome-card:hover {
  box-shadow: var(--pw-shadow) !important;
}

.btn-primary-clinic,
.p-button.btn-primary-clinic {
  background: linear-gradient(135deg, var(--pw-blue-600), var(--pw-blue-700)) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 20px rgba(29, 108, 227, 0.22) !important;
  color: #ffffff !important;
}

.btn-primary-clinic:hover,
.p-button.btn-primary-clinic:hover {
  background: linear-gradient(135deg, #0f63d8, #114bbd) !important;
  box-shadow: 0 14px 26px rgba(29, 108, 227, 0.28) !important;
}

.btn-outline-clinic,
.p-button.btn-outline-clinic {
  background: #ffffff !important;
  border: 1px solid var(--pw-line) !important;
  border-radius: 8px !important;
  color: var(--pw-ink-700) !important;
  box-shadow: 0 8px 18px rgba(51, 65, 85, 0.05) !important;
}

.btn-outline-clinic:hover,
.p-button.btn-outline-clinic:hover {
  border-color: #b7c8dd !important;
  color: var(--pw-blue-700) !important;
}

.icon-box {
  border-radius: 8px !important;
  box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.08);
}

.clinic-table {
  border-radius: 8px;
  overflow: hidden;
}

.clinic-table .p-datatable-thead > tr > th,
.p-datatable .p-datatable-thead > tr > th {
  background: #f3f7fb !important;
  color: var(--pw-ink-500) !important;
  border-bottom: 1px solid var(--pw-line) !important;
  font-size: 0.88rem !important;
  font-weight: 800 !important;
  letter-spacing: 0 !important;
}

.clinic-table .p-datatable-tbody > tr,
.p-datatable .p-datatable-tbody > tr {
  transition: background-color 0.18s ease;
}

.clinic-table .p-datatable-tbody > tr:hover,
.p-datatable .p-datatable-tbody > tr:hover {
  background: #f8fbff !important;
}

.clinic-table .p-datatable-tbody > tr > td,
.p-datatable .p-datatable-tbody > tr > td {
  color: var(--pw-ink-700) !important;
  border-bottom: 1px solid #edf2f7 !important;
}

.p-button.p-button-text {
  border-radius: 8px !important;
}

.p-button.p-button-rounded {
  width: 2.35rem;
  height: 2.35rem;
}

.p-dialog-mask {
  background: rgba(19, 32, 54, 0.38) !important;
  backdrop-filter: blur(6px);
}

.clinic-dialog {
  border-radius: 8px !important;
  border: 1px solid rgba(219, 229, 241, 0.9) !important;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.24) !important;
}

.clinic-dialog .p-inputtext,
.clinic-dialog .p-inputnumber-input,
.clinic-dialog .p-textarea,
.clinic-dialog .p-select,
.clinic-dialog .p-dropdown {
  border-radius: 8px !important;
  background: #f8fbff !important;
}

.clinic-dialog .p-inputtext:focus,
.clinic-dialog .p-inputnumber-input:focus,
.clinic-dialog .p-textarea:focus {
  border-color: var(--pw-blue-500) !important;
  box-shadow: 0 0 0 3px rgba(47, 128, 237, 0.14) !important;
}

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #b8c7d8; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #8aa0b8; }
</style>
