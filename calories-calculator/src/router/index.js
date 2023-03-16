import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layout/MainLayout.vue';

import Login from '../API/login.js';

const routes = [
    {
        path: '/login',
        component: () => import("../views/Login.vue")
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                name: "home",
                path: "/",
                component: () => import("../views/Home.vue"),
            },
            {
                name: "recipes",
                path: "/recipes",
                component: () => import("../views/Recipes.vue"),
            },
            {
                name: "ingredients",
                path: "/ingredients",
                component: () => import("../views/Ingredients.vue"),
            },
            {
                name: "calculator",
                path: "/calculator",
                component: () => import("../views/Calculator.vue"),
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = await Login.isTokenValid(localStorage.token);
    console.log(authRequired);
    console.log(localStorage.token);
    console.log(auth);

    if (authRequired && !auth) {
        return '/login';
    }
});

export default router;