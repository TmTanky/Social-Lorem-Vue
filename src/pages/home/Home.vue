<template>
    <main>
        <h1> Welcome {{ firstName }} {{ lastName }} </h1>
    </main>
</template>

<script>
export default {
    computed: {
        firstName() {
            return this.$store.state.user.firstName
        },
        lastName() {
            return this.$store.state.user.lastName
        }
    }
}
</script>