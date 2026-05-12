import { createRouter, createWebHistory } from 'vue-router';
import Home from './shared/presentation/views/home.vue';
import PageNotFound from './shared/presentation/views/page-not-found.vue';

// Importamos las vistas de IAM (Asegúrate que tengan el ./ adelante)
import Login from './iam/presentation/views/login-view.vue';
import Register from './iam/presentation/views/register-view.vue';
import ChoosePlan from './iam/presentation/views/choose-plan-view.vue';

// --- CORRECCIÓN AQUÍ ---
import ProfileView from './profiles/presentation/views/profile-view.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/choose-plan', component: ChoosePlan },

    // Rutas Privadas
    { path: '/home', component: Home },
    { path: '/profile', component: ProfileView },

    { path: '/:pathMatch(.*)*', component: PageNotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Guardián de rutas (Se queda igual)
router.beforeEach((to, from) => {
    const publicPages = ['/login', '/register', '/choose-plan'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('currentUser');

    // Si requiere auth y no está logueado, retornamos la ruta de login
    if (authRequired && !loggedIn) {
        return '/login';
    }
});

export default router;