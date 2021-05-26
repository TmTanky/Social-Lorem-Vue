// Pages
import Login from '../pages/login/Login.vue'
import Register from '../pages/register/Register.vue'
import Home from '../pages/home/Home.vue'
import Profile from '../pages/profile/Profile.vue'
import ViewUser from '../pages/viewUser/ViewUser.vue'
import ViewLikes from '../pages/viewLikes/ViewLikes.vue'
import CommentPost from '../pages/commentPost/CommentPost.vue'

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
    },
    {
        path: '/profile',
        component: Profile,
        beforeEnter: (to, from, next) => {
            
            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    },
    {
        name: 'oneuser',
        path: '/user/:username',
        component: ViewUser,
        beforeEnter: (to, from, next) => {

            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    },
    {
        name: 'viewlikes',
        path: '/viewlikes/:postID',
        component: ViewLikes,
        beforeEnter: (to, from, next) => {

            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    },
    {
        name: 'viewcomments',
        path: '/viewcomments/:postID',
        component: CommentPost,
        beforeEnter: (to, from, next) => {

            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    }
]