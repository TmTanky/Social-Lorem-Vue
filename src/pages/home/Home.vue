<template>
    <main class="homebox" >
        <sidebar> </sidebar>
        <feed> </feed>
    </main>
</template>

<script>
import Sidebar from '../../components/sidebar/Sidebar.vue'
import Feed from '../../components/home/feed/Feed.vue'

export default {
    components: {
        Sidebar,
        Feed
    }
}
</script>

<style scoped>

main.homebox {
    display: flex;
    min-height: 100vh;
    width: 100%;
}

</style>