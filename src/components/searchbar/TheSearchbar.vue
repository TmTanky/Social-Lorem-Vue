<template>
    <form @submit.prevent >
        <input ref="search" type="text" placeholder="Search Something" name="" > 
        <button @click="search" > <img src="https://img.icons8.com/material-sharp/20/ffffff/search.png"/> </button>
    </form>
</template>

<script>
export default {
    methods: {
        async search() {
            console.log(this.$refs.search.value)
        }
    }
}
</script>

<style scoped>

form {
    display: flex;
    justify-content: flex-start;
    padding: 1rem 0rem 1rem 1rem;
    background-color: black;
    border-bottom: solid white 2px;
}

input {
    background-color: white;
    border-radius: 25px;
    border: black solid 1px;
    outline: none;
    padding: 0.5rem 1rem;
    width: 30%;
}

button {
    cursor: pointer;
    margin: auto;
    margin-left: 0.5rem;
    background: none;
    outline: none;
    border: none;
}

</style>