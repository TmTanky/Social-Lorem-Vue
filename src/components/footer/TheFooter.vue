<template>
    <footer> Copyright &copy; Social-Lorem {{ year }} </footer>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
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