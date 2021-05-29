<template>
    <main>
        <sidebar> </sidebar>
        <following> </following>
    </main>
</template>

<script>
import Sidebar from '../../components/sidebar/Sidebar.vue'
import Following from '../../components/viewMine/Following.vue'

export default {
    components: {
        Sidebar,
        Following
    }
}
</script>

<style scoped>

main {
    display: flex;
}

</style>