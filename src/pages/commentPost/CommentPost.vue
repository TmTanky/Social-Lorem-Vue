<template>
    <main>
        <sidebar> </sidebar>
        <comment> </comment>
    </main>
</template>

<script>
import Sidebar from '../../components/sidebar/Sidebar.vue'
import Comment from '../../components/commentPost/Comment.vue'

export default {
    components: {
        Sidebar,
        Comment
    }
}
</script>

<style scoped>

main {
    display: flex;
}

</style>