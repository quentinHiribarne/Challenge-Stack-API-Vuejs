import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layout/MainLayout.vue';

const routes = [
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
                name: "recipies",
                path: "/recipies",
                component: () => import("../views/Recipies.vue"),
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

export default router;