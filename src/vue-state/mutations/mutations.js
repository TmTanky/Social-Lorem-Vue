export const mutations = {
    loginSuccess(state) {
        state.isLoggedIn = true
    },
    logoutSuccess(state) {
        state.isLoggedIn = false
    },
    setUser(state, payload) {
        state.user = payload
    },
    emptyUser(state) {
        state.user = {}
    }
}