<template>
  <the-header> </the-header>
    <div id="app">
      <router-view> </router-view>
    </div>
  <the-footer> </the-footer>
</template>

<script>
import TheHeader from './components/header/TheHeader.vue'
import TheFooter from './components/footer/TheFooter.vue'

export default {
  components: { TheHeader, TheFooter }
}
</script>

<style>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
}

.router-link-active {
  border-bottom: black solid 2px;
}

</style>
