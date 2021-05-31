<template>
    <main>
        <div class="title">
            <h1> Comments </h1>
        </div>

        <div v-if="isLoading" class="isloading" >
            <beat-loader :loading="isLoading" color="black" size="15px"></beat-loader>
        </div>

        <transition name="noposts" >
            <div v-if="isEmpty" class="noposts" >
                <h1> No Comments available </h1>
            </div>
        </transition>

        <transition-group name="commentbox" mode="out-in" >
            <div v-for="comment in allComments" :key="comment._id" class="onecomment">
                <router-link :to="{name: 'oneuser', params: {username: comment.commentBy.username}}" >
                    <strong> {{ comment.commentBy.firstName }} {{ comment.commentBy.lastName }} </strong>
                </router-link>
                <p> {{ comment.content }} </p>
            </div>
        </transition-group>

    </main>
</template>

<script>
import axios from 'axios'

// Components
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

export default {
    components: {
        BeatLoader
    },
    data() {
        return {
            allComments: [],
            isEmpty: false,
            isLoading: true
        }
    },
    methods: {
        async getComments() {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query viewPostComments($postID: ID) {
                    viewPostComments(postID: $postID) {
                        _id
                        content
                        commentBy {
                            firstName
                            lastName
                            username
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

            if (data.data.viewPostComments.length === 0) {
                this.isEmpty = true
            }

            this.allComments = data.data.viewPostComments
            this.isLoading = false

        }
    },
    async created() {
        await this.getComments()
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        }
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
    display: flex;
    flex: 5;
    flex-direction: column;
    padding: 1rem 2rem;
    position: relative;
}

.title {
    background-color: black;
    padding: 1rem;
    padding-top: 4rem;
    padding-bottom: 1rem;
    margin-bottom: 3rem;
}

.title h1 {
    font-size: 4rem;
    color: white;
}

.onecomment {
    padding: 1rem;
    background-color: rgb(250, 250, 250);
    box-shadow: 0 8px 6px -8px black;
    border: solid black 2px;
    border-radius: 3px;
    margin: 0.5rem 0rem;
    width: inherit;
    display: flex;
    flex-direction: column;
}

.onecomment a {
    text-decoration: none;
    font-size: 1.5rem;
    color: black;
}

.noposts {
    padding-top: 5rem;
    display: flex;
    justify-content: center;
}

.noposts-enter-active,
.commentbox-enter-active {
    animation: fade 0.25s ease-in;
}

@media screen and (max-width: 500px) {

    main {
        padding: 0.5rem;
    }

    .title h1 {
        font-size: 12vw;
        text-align: center;
    }

    .noposts h1 {
        font-size: 6vw;
    }

    .onecomment {
        margin: 0.2rem 0;
    }

}

/* .spacebottom {
    margin-bottom: 7rem;
} */

</style>