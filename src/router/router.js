// Pages
import Login from '../pages/login/Login.vue'
import Register from '../pages/register/Register.vue'
import Home from '../pages/home/Home.vue'

// Store
import {store} from '../vue-state/store/store'

export const routes = [
    {
        path: '/',
        component: Login,
        beforeEnter: (to, from, next) => {
            
            if (store.state.isLoggedIn) {
                return next('/home')
            }

            return next()
        },
    },
    {
        path: '/register',
        component: Register,
        beforeEnter: (to, from, next) => {
            
            if (store.state.isLoggedIn) {
                return next('/home')
            }

            return next()
        }
    },
    {
        path: '/home',
        component: Home,
        beforeEnter: (to, from, next) => {
            
            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    }
]