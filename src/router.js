import { createRouter, createWebHistory } from 'vue-router';
import Home from './shared/presentation/views/home.vue';
import PageNotFound from './shared/presentation/views/page-not-found.vue';

// Importamos TODAS las vistas de IAM
import Login from './iam/presentation/views/login-view.vue';
import Register from './iam/presentation/views/register-view.vue';
import ChoosePlan from './iam/presentation/views/choose-plan-view.vue';

const routes = [
    // 1. Redirigir siempre al login al abrir la app
    { path: '/', redirect: '/login' },

    // 2. Rutas Públicas (IAM)
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/choose-plan', component: ChoosePlan },

    // 3. Rutas Privadas (Requieren sesión)
    { path: '/home', component: Home },

    // Cualquier otra ruta que no exista, manda error 404
    { path: '/:pathMatch(.*)*', component: PageNotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Guardián de rutas: Revisa si hay un usuario guardado en localStorage
router.beforeEach((to, from, next) => {
    // Estas páginas se pueden ver sin iniciar sesión
    const publicPages = ['/login', '/register', '/choose-plan'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('currentUser');

    // Si la ruta requiere sesión y no hay usuario logueado, lo patea al login
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;