<template>
    <main>
        <sidebar> </sidebar>
        <settings-menu> </settings-menu>
    </main>
</template>

<script>
import Sidebar from '../../components/sidebar/Sidebar.vue'
import SettingsMenu from '../../components/settings/SettingsMenu.vue'

export default {
    components: {
        Sidebar,
        SettingsMenu
    }
}
</script>

<style
Sidebar scoped>

main {
    display: flex;
}

</style>