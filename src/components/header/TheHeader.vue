<template>
    <nav>
        <div class="navlogo">
            <h1> Social-Vue </h1>
        </div>

        <!-- <div class="navlinks">
            <router-link to="/"> Login </router-link>
            <router-link to="/register"> Register </router-link>
        </div> -->
    </nav>
</template>

<style scoped>

nav {
    display: flex;
    background-color: black;
    padding: 1rem;
    color: white;
}

.navlogo, .navlinks {
    flex: 1;
    display: flex;
}

.navlinks {
    justify-content: flex-end;
    margin: auto 1rem;
}

a {
    margin: 0rem 0.5rem;
    text-decoration: none;
}

</style>