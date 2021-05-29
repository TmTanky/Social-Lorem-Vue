<template>
    <main>
        <sidebar> </sidebar>
        <followers> </followers>
    </main>
</template>

<script>
import Sidebar from '../../components/sidebar/Sidebar.vue'
import Followers from '../../components/viewMine/Followers.vue'

export default {
    components: {
        Sidebar,
        Followers
    }
}
</script>

<style scoped>

main {
    display: flex;
}

</style>