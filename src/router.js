import { createRouter, createWebHistory } from 'vue-router';

// import CoachesDetail from './pages/coaches/CoachesDetail';
// import CoachRegistration from './pages/coaches/CoachRegistration';
// import ContactCoach from './pages/requests/ContactCoach';
// import RequestReceive from './pages/requests/RequestReceive';
// import UserAuth from './pages/auth/UserAuth.vue';
import CoachesList from './pages/coaches/CoachesList';
import NotFound from './pages/NotFound';
import store from './store';

const CoachesDetail = () => import('./pages/coaches/CoachesDetail');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration');
const ContactCoach = () => import('./pages/requests/ContactCoach');
const RequestReceive = () => import('./pages/requests/RequestReceive');
const UserAuth = () => import('./pages/auth/UserAuth');





const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/coaches',
        },
        {
            path: '/coaches',
            component: CoachesList,
        },
        {
            path: '/coaches/:id',
            component: CoachesDetail,
            props: true,
            children: [
                {
                    path: 'contact',
                    component: ContactCoach,
                },
            ]
        },
        {
            path: '/register',
            component: CoachRegistration,
            meta: { requiresAuth: true }
        },
        {
            path: '/requests',
            component: RequestReceive,
            meta: { requiresAuth: true }
        },
        {
            path: '/auth',
            component: UserAuth,
            meta: { requiresUnauth: true }
        },
        {
            path: '/:notFound(.*)',
            component: NotFound,
        },
    ],
});

router.beforeEach(function(to, from, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})


export default router;