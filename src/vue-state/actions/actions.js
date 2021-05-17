export const actions = {
    loginSuccess(context) {
        context.commit('loginSuccess')
    },
    logoutSuccess(context) {
        context.commit('logoutSuccess')
    },
    setUser(context, payload) {
        context.commit('setUser', payload)
    },
    emptyUser(context) {
        context.commit('emptyUser')
    }
}