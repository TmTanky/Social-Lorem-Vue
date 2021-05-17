import {createStore, createLogger} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import {mutations} from '../mutations/mutations'
import {actions} from '../actions/actions'

export const store = createStore({
    plugins: [createPersistedState(), createLogger()],
    state() {
        return {
            isLoggedIn: false,
            user: {}
        }
    },
    mutations,
    actions
})