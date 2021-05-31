<template>
    <nav v-if="!isLoggedIn" >
        <div class="navlogo">
            <h1 @click="toMain"> Social-Vue </h1>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        toMain() {
            this.$router.push('/')  
        },
        logout() {
            this.$store.dispatch('logoutSuccess')
            this.$store.dispatch('emptyUser')
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn
        }
    }
}
</script>

<style scoped>

nav {
    display: flex;
    background-color: black;
    padding: 1rem;
    color: white;
}

.navlogo, .navlinks {
    flex: 1;
    display: flex;
}

.navlogo h1 {
    cursor: pointer;
}

.navlinks {
    justify-content: flex-end;
    margin: auto 1rem;
}

a {
    margin: 0rem 0.5rem;
    text-decoration: none;
    color: white;
}

</style>