<template>
    <main>
        <div class="title">
            <h1> Users who likes the post. </h1>
        </div>

        <div v-if="isLoading" class="isloading" >
            <beat-loader :loading="isLoading" color="black" size="15px"></beat-loader>
        </div>

        <div class="likesbox">
            <transition-group name="likers">
                <div v-if="thePost.length === 0 && !isLoading" class="noposts">
                    <h1> No one likes the post. </h1>
                </div>

                <div v-else v-for="user in thePost" :key="user._id" class="userwholikes">
                    <router-link :to="{name: 'oneuser', params: {username: user.username}}" > {{ user.firstName }} {{ user.lastName }} </router-link>
                </div>
            </transition-group>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

export default {
    components: {
        BeatLoader
    },
    data() {
        return {
            thePost: {},
            isLoading: true
        }
    },
    methods: {
        async getLikes() {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query viewLikes($postID: ID) {
                    viewLikes(postID: $postID) {
                        likes {
                            _id
                            username
                            firstName
                            lastName
                        }
                    }
                }`,
                variables: {
                    postID: this.$route.params.postID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            this.thePost = data.data.viewLikes.likes
            this.isLoading = false
            console.log(this.thePost)

        }
    },
    async created() {
        await this.getLikes()
    }
}
</script>

<style scoped>

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

main {
    flex: 5;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.title {
    background-color: black;
    padding: 1rem;
    padding-top: 4rem;
    padding-bottom: 1rem;
}

.title h1 {
    font-size: 4rem;
    color: white;
}

.likesbox {
    margin: 3rem 0rem;
}

.userwholikes {
    padding: 1rem;
    background-color: rgb(250, 250, 250);
    box-shadow: 0 8px 6px -8px black;
    border: solid black 2px;
    border-radius: 3px;
    margin: 0.5rem 0rem;
}

.userwholikes a {
    font-size: 1.5rem;
    text-decoration: none;
    color: black;
}

.noposts {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
}

.likers-enter-active {
    animation: fade 0.3s ease-in;
}

@media screen and (max-width: 500px) {

    main {
        padding: 0.5rem;
    }

    .title h1 {
        font-size: 10vw;
        text-align: center;
    }

    .noposts h1 {
        font-size: 8vw;
    }

}

</style>