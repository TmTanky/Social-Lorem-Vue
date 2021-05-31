<template>
    <nav>
        <div class="topbar">
            <p @click="toHome" > <img src="https://img.icons8.com/material-sharp/30/ffffff/home.png"/> </p>
            <p @click="toProfile" > <img src="https://img.icons8.com/material/30/ffffff/person-male.png"/> </p>
            <p @click="toSettings" > <img src="https://img.icons8.com/material/30/ffffff/settings.png"/> </p>
            <p @click="logout" > <img src="https://img.icons8.com/material-rounded/30/ffffff/exit.png"/> </p>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('logoutSuccess')
            this.$store.dispatch('emptyUser')
            this.$router.push('/')
        },
        toProfile() {
            this.$router.push('/profile')
        },
        toHome() {
            this.$router.push('/home')
        },
        toSettings() {
            this.$router.push('/settings')
        }
    }
}
</script>

<style scoped>

nav {
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
    background-color: black;
    display: none;
}

.topbar {
    display: flex;
    justify-content: center;
}

.topbar p {
    margin: 0rem 1rem;
    cursor: pointer;
}

@media screen and (max-width: 750px) {
    nav {
        display: block;
    }
}

</style>