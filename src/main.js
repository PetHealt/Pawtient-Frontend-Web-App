import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

// Importamos PrimeVue y los componentes de UI
import PrimeVue from 'primevue/config'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import SelectButton from 'primevue/selectbutton'

// Componentes para tablas y formularios
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown'; // Componente para los estados predefinidos

// Estilos de PrimeVue - CORREGIDOS para evitar error de importación
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import i18n from './i18n.js'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(PrimeVue, { ripple: true })

// REGISTRO DE COMPONENTES GLOBALES (Usando prefijo pv- para consistencia)
app.component('pv-toolbar', Toolbar)
app.component('pv-button', Button)
app.component('pv-drawer', Drawer)
app.component('pv-select-button', SelectButton)

// Registros para Almacén, Clínica y Agenda
app.component('pv-data-table', DataTable);
app.component('pv-column', Column);
app.component('pv-input-text', InputText);
app.component('pv-input-number', InputNumber);
app.component('pv-textarea', Textarea);
app.component('pv-dialog', Dialog);
app.component('pv-select', Dropdown); // Registrado como pv-select para estados predefinidos

app.mount('#app')