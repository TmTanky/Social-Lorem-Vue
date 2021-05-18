<template>
    <footer v-if="!isLoggedIn" > Copyright &copy; Social-Lorem {{ year }} </footer>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
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

footer {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    background-color: black;
    color: white;
}

</style>