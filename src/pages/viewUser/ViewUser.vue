<template>
    <main>
        <side-bar> </side-bar>
        <user> </user>        
    </main>
</template>

<script>

// Components
import SideBar from '../../components/sidebar/Sidebar.vue'
import User from '../../components/viewUser/User.vue'

export default {
    components: {
        SideBar,
        User
    }
}
</script>

<style scoped>

main {
    display: flex;
}

</style>
