<template>
    <main>
        <sidebar> </sidebar>
        <likes> </likes>
    </main>
</template>

<script>
import Sidebar from '../../components/sidebar/Sidebar.vue'
import Likes from '../../components/viewLikes/Likes.vue'

export default {
  components: {
      Sidebar,
      Likes
  },
    
}
</script>

<style scoped>

main {
    display: flex;
}

</style>