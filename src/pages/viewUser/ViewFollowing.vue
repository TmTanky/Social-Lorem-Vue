<template>
    <main>
        <side-bar> </side-bar>
        <user-following> </user-following>        
    </main>
</template>

<script>

// Components
import SideBar from '../../components/sidebar/Sidebar.vue'
import UserFollowing from '../../components/viewUser/UserFollowing.vue'

export default {
    components: {
        SideBar,
        UserFollowing
    }
}
</script>

<style scoped>

main {
    display: flex;
}

</style>
