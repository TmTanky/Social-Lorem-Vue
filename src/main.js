import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'

// Routes
import {routes} from './router/router'

// Store
import {store} from './vue-state/store/store'

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).
use(router).
use(store).
mount('#app')
