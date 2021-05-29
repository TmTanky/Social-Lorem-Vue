<template>
    <main>
        <side-bar> </side-bar>
        <user-followers> </user-followers>        
    </main>
</template>

<script>

// Components
import SideBar from '../../components/sidebar/Sidebar.vue'
import UserFollowers from '../../components/viewUser/UserFollowers.vue'

export default {
    components: {
        SideBar,
        UserFollowers
    }
}
</script>

<style scoped>

main {
    display: flex;
}

</style>
