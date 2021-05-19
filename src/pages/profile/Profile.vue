<template>
    <main class="homebox" >
        <sidebar> </sidebar>
        <me> </me>
    </main>
</template>

<script>
import Sidebar from '../../components/sidebar/Sidebar.vue'
import Me from '../../components/profile/me/Me.vue'

export default {
    components: {
        Sidebar,
        Me
    }
}
</script>

<style scoped>

main.homebox {
    display: flex;
}

</style>