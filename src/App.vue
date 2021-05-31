<template>
  <the-header> </the-header>
    <div id="app">
      <router-view v-slot="{ Component }">
        <the-searchbar v-if="isLoggedIn" > </the-searchbar>
        <topbar v-if="isLoggedIn" > </topbar>
        <transition>
            <component :is="Component" />
        </transition>
      </router-view>
    </div>
  <the-footer> </the-footer>
</template>

<script>
import TheHeader from './components/header/TheHeader.vue'
import TheFooter from './components/footer/TheFooter.vue'
import TheSearchbar from './components/searchbar/TheSearchbar.vue'
import Topbar from './components/topbar/Topbar.vue'

export default {
  components: { TheHeader, TheFooter, TheSearchbar, Topbar },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>

<style>

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

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

.isloading {
  display: flex;
  padding: auto;
  margin: 10rem auto;
  justify-content: center;
}

.pageloading {
  position: absolute;
  background-color: black;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
