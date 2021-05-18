<template>
    <main>
        <div class="title">
            <h1> News Feed </h1>
        </div>

        <div class="onepost" v-for="post in myPosts" :key="post._id" >
            <h2> {{ post.postBy.firstName }} {{ post.postBy.lastName }} </h2>
            <p> {{ post.content }} </p>
        </div>

    </main>
</template>

<script>
export default {
    data() {
        return {
            myPosts: this.$store.state.user.myPosts
        }
    },
    beforeCreate() {
        
    }
}
</script>


<style scoped>

main {
    min-width: 69.3rem;
    padding: 1rem 2rem;
}

.title {
    padding-top: 4rem;
}

.title h1 {
    font-size: 4rem;
}

.onepost {
    padding: 1rem;
    background-color: whitesmoke;
    border-radius: 3px;
    margin: 1rem 0rem;
}

h2 {
    padding-bottom: 1rem;
}

</style>