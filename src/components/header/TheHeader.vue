<template>
    <nav v-if="!isLoggedIn" >
        <div class="navlogo">
            <h1> Social-Vue </h1>
        </div>

        <div class="navlinks">
            <router-link to="/" @click="logout" v-if="isLoggedIn" > Logout </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
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