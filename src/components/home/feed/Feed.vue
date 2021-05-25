<template>
    <main>
        <div class="title">
            <h1> News Feed </h1>
        </div>

        <create-post @refetch-data="refetch"> </create-post>

        <div v-if="isLoading" class="isloading" >
            <beat-loader :loading="isLoading" color="black" size="15px"></beat-loader>
        </div>

        <transition name="noposts" >
            <div v-if="isEmpty" class="noposts" >
                <h1> No post available </h1>
            </div>
        </transition>

        <transition-group name="posts" >
            <div class="onepost" v-for="post in myPosts" :key="post._id" >
                <div class="postdetails">
                    <h2> {{ post.postBy.firstName }} {{ post.postBy.lastName }} </h2>
                    <p> {{ post.content }} </p>
                </div>

                <div class="reactcount">
                    <p class="likecount" > Likes: 0 </p>
                    <p> Comments: 0 </p>
                </div>

                <div class="react">
                    <div class="like"> <img src="https://img.icons8.com/material-sharp/24/000000/facebook-like--v1.png"/> </div>
                    <div class="comment"> <img src="https://img.icons8.com/material-sharp/24/000000/topic.png"/> </div>
                </div>
            </div>
        </transition-group>

    </main>
</template>

<script>
import axios from 'axios'
import CreatePost from '../createPost/CreatePost.vue'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

export default {
    components: {
        BeatLoader,
        CreatePost
    },
    data() {
        return {
            myPosts: [],
            isLoading: true,
            isEmpty: false,
        }
    },
    methods: {
        async getData() {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query getUsersPosts($userID: ID) {
                    getUsersPosts(userID: $userID) {
                        _id
                        content
                        createdAt
                        postBy {
                            _id
                            firstName
                            lastName
                        }
                    }
                }`,
                variables: {
                    userID: this.userID
                }
            })
            console.log(data)
            if (data.data.getUsersPosts.length === 0) {
                this.isLoading = false
                this.isEmpty = true
            }

            if (data.data.getUsersPosts.length > 0) {
                this.isEmpty = false
            }
            
            this.myPosts = data.data.getUsersPosts
            this.isLoading = false

        },
        async refetch() {
            await this.getData()
        }
    },
    created() {
        this.getData()
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        }
    }
}
</script>


<style scoped>

main {
    flex: 5;
    padding: 1rem 2rem;
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

.onepost {
    padding: 1rem;
    background-color: rgb(250, 250, 250);
    box-shadow: 0 8px 6px -8px black;
    border: solid black 2px;
    border-radius: 3px;
    margin: 1rem 0rem;
    width: inherit;
    display: flex;
    flex-direction: column;
}

.onepost .postdetails {
    padding-bottom: 1rem;
}

.react {
    display: flex;
    border-top: 1px solid black;
}

.reactcount {
    display: flex;
    padding-bottom: 0.2rem;
}

.reactcount p.likecount {
    margin-right: 0.5rem;
}

.react .like,
.react .comment {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0.5rem 0rem;
    transition-property: all;
    transition-duration: 0.3s;
    cursor: pointer;
}

.react .like {
    border-right: black solid 1px;
}

.react .like:hover {
    background-color: rgba(134, 131, 131, 0.3);
}

.react .comment:hover {
    background-color: rgba(134, 131, 131, 0.3);
}

.noposts {
    padding-top: 5rem;
    display: flex;
    justify-content: center;
}

h2 {
    padding-bottom: 1rem;
}

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.posts-enter-active,
.noposts-enter-active {
    animation: fade 0.25s ease-in;
}

</style>