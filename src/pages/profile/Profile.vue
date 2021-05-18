<template>
    <main class="homebox" >
        <sidebar> </sidebar>

        <div class="title">
            <h1> Profile </h1>
        </div>

    </main>
</template>

<script>
import Sidebar from '../../components/home/sidebar/Sidebar.vue'

export default {
    components: {
        Sidebar
    }
}
</script>

<style scoped>

main.homebox {
    position: absolute;
    display: flex;
    min-height: 100vh;
}

.title {
    padding: 1rem 2rem;
    padding-top: 4rem;
}

.title h1 {
    font-size: 4rem;
}

</style>