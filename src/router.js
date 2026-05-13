import { createRouter, createWebHistory } from 'vue-router';
import Home from './shared/presentation/views/home.vue';
import PageNotFound from './shared/presentation/views/page-not-found.vue';

// IAM
import Login from './iam/presentation/views/login-view.vue';
import Register from './iam/presentation/views/register-view.vue';
import ChoosePlan from './iam/presentation/views/choose-plan-view.vue';

// Profiles & Clinic
import ProfileView from './profiles/presentation/views/profile-view.vue';
import PatientsView from './clinic/presentation/views/patients-view.vue';

// Bounded Context: Store (Almacén)
import InventoryView from './store/presentation/views/inventory-view.vue';
import SuppliersView from './store/presentation/views/suppliers-view.vue';

// Bounded Contexts restantes (Para que no den 404 al navegar)
import ScheduleView from './appointments/presentation/views/schedule-view.vue';
import ReportsView from './reports/presentation/views/reports-view.vue';



const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/choose-plan', component: ChoosePlan },

    // Rutas Privadas Protegidas
    { path: '/home', component: Home },
    { path: '/profile', component: ProfileView },
    { path: '/clinic/patients', component: PatientsView },

    // Rutas de Almacén (Intercalables desde el Sidebar)
    { path: '/store/inventory', component: InventoryView },
    { path: '/store/suppliers', component: SuppliersView },
    { path: '/appointments/schedule', component: ScheduleView },
    { path: '/reports/dashboard', component: ReportsView },




    // Manejo de errores
    { path: '/:pathMatch(.*)*', component: PageNotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Guardián de navegación para proteger rutas privadas
router.beforeEach((to) => {
    const publicPages = ['/login', '/register', '/choose-plan'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('currentUser');

    if (authRequired && !loggedIn) {
        return '/login';
    }
});

export default router;