import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ModelEmbedCreator from '@/views/model/ModelEmbedCreator.vue'
import Index from '@/views/Index.vue'
import ModelEmbedWizard from '@/views/embed/wizard/ModelEmbedWizard.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: ModelEmbedCreator
    },
    {
        path: '/wizard',
        alias: '/wizard/model',
        name: 'wizard-embed',
        component: ModelEmbedWizard
    },
    {
        path: '/test',
        name: 'test',
        component: Index
    },
    {
        path: '/test/:modelId',
        name: 'embed-model',
        component: () => import('@/views/model/ModelEmbed2.vue')
    }
    // {
    //     path: '/:modelId',
    //     name: 'embed-model',
    //     component: () => import('@/views/model/ModelEmbed2.vue')
    // }
    /*  {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/!* webpackChunkName: "about" *!/ '../views/AboutView.vue')
      }*/
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
