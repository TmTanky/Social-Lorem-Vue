// Pages
import Login from '../pages/login/Login.vue'
import Register from '../pages/register/Register.vue'
import Home from '../pages/home/Home.vue'
import Profile from '../pages/profile/Profile.vue'
import Settings from '../pages/settings/Settings.vue'
import ResetPassword from '../pages/resetPassword/ResetPassword.vue'
import ViewUser from '../pages/viewUser/ViewUser.vue'
import ViewLikes from '../pages/viewLikes/ViewLikes.vue'
import CommentPost from '../pages/commentPost/CommentPost.vue'
import ViewMyFollowing from '../pages/viewMine/ViewMyFollowing.vue'
import ViewMyFollowers from '../pages/viewMine/ViewMyFollowers.vue'
import ViewUsersFollowing from '../pages/viewUser/ViewFollowing.vue'
import ViewUsersFollowers from '../pages/viewUser/ViewFollowers.vue'

import Error from '../pages/errorPage/Error.vue'

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
        path: '/settings',
        component: Settings,
        beforeEnter: (to, from, next) => {
            
            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    },
    {
        path: '/resetpassword',
        component: ResetPassword,
        beforeEnter: (to, from, next) => {
            
            if (!store.state.isLoggedIn) {
                return next()
            }

            return next('/')
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
    },
    {
        name: 'viewmyfollowing',
        path: '/following/:userID',
        component: ViewMyFollowing,
        beforeEnter: (to, from, next) => {

            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    },
    {
        name: 'viewmyfollowers',
        path: '/followers/:userID',
        component: ViewMyFollowers,
        beforeEnter: (to, from, next) => {

            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    },
    {
        name: 'viewusersfollowing',
        path: '/usersfollowing/:userID',
        component: ViewUsersFollowing,
        beforeEnter: (to, from, next) => {

            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    },
    {
        name: 'viewusersfollowers',
        path: '/usersfollowers/:userID',
        component: ViewUsersFollowers,
        beforeEnter: (to, from, next) => {

            if (!store.state.isLoggedIn) {
                return next('/')
            }

            return next()
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: Error
    }

]