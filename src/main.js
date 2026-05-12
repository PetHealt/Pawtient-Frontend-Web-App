import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

// Importamos PrimeVue y los componentes que usa tu Layout
import PrimeVue from 'primevue/config'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import SelectButton from 'primevue/selectbutton'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Asumiendo que tienes tu archivo i18n.js para los idiomas
import i18n from '/src/i18n.js'

const app = createApp(App)

// Usamos el router y las configuraciones
app.use(router)
app.use(i18n)
app.use(PrimeVue)

// Registramos los componentes globales de UI
app.component('pv-toolbar', Toolbar)
app.component('pv-button', Button)
app.component('pv-drawer', Drawer)
app.component('pv-select-button', SelectButton)

app.mount('#app')