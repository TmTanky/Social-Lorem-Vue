<template>
    <main>
        <div class="title">
            <h1> Profile </h1>
        </div>

        <div v-if="isLoading" class="isloading" >
            <beat-loader :loading="isLoading" color="black" size="15px"></beat-loader>
        </div>

        <transition name="mebox">
            <div class="me" v-if="isDone && !isLoading">
                <div class="mename">
                    <h1> {{ firstName }} {{ lastName }} </h1>
                    <div class="follow">
                        <strong> <p> Following: {{ myFollowing.length }} </p> </strong>
                        <strong> <p> Followers: {{ myFollowers.length }} </p> </strong>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="noposts" >
            <div v-if="isEmpty" class="noposts" >
                <h1> No post available </h1>
            </div>
        </transition>

        <transition-group name="posts" mode="out-in" >
            <div class="onepost" v-for="post in myPosts" :key="post._id" >
                <div class="head">
                    <div class="headtitle">
                        <h2> {{ post.postBy.firstName }} {{ post.postBy.lastName }} </h2>
                    </div>
                    <div @click="deletePost(post._id)" class="headdelete">
                        <img src="https://img.icons8.com/material-sharp/30/000000/delete-forever.png"/>
                    </div>
                </div>

                <div class="content">
                    <p> {{ post.content }} </p>
                </div>
            </div>
        </transition-group>

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
            firstName: null,
            lastName: null,
            isDone: false,
            myPosts: [],
            isLoading: true,
            isEmpty: null,
            myFollowing: [],
            myFollowers: []
        }
    },
    methods: {
        async getUsername() {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query getUsername($userID: ID) {
                    getUsername(userID: $userID) {
                        firstName
                        lastName
                    }
                }`,
                variables: {
                    userID: this.userID
                }
            })

            this.firstName = data.data.getUsername.firstName 
            this.lastName = data.data.getUsername.lastName
            this.isDone = true

        },
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

            if (data.data.getUsersPosts.length === 0) {
                this.isLoading = false
                this.isEmpty = true
            }

            this.myPosts = data.data.getUsersPosts.sort(() => -1)
            this.isLoading = false

        },
        async deletePost(postID) {
            await axios.post('http://localhost:8000/graphql', {
                query: `mutation deletePost($postID: ID!) {
                    deletePost(postID: $postID)
                }`,
                variables: {
                    postID
                }
            })

            await this.getData()

        },
        async getFollow() {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query getFollow($userID: ID) {
                    getFollow(userID: $userID) {
                        following {
                            firstName
                            lastName
                        }
                        followers {
                            firstName
                            lastName
                        }
                    }
                }`,
                variables: {
                    userID: this.userID
                }
            })
            this.myFollowing = data.data.getFollow.following
            this.myFollowers =  data.data.getFollow.followers
        }
    },
    created() {
        this.getUsername()
        this.getData()
        this.getFollow()
    },
    updated() {
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

.me {
    padding-top: 1rem;
    padding-bottom: 2rem;
}

.me .mename {
    padding: 0rem 1rem;
}

.me .mename h1 {
    font-size: 3rem;
}

.onepost {
    padding: 1rem;
    background-color: rgb(250, 250, 250);
    box-shadow: 0 8px 6px -10px black;
    border-radius: 3px;
    margin: 1rem;
    width: inherit;
}

.noposts {
    padding-top: 5rem;
    display: flex;
    justify-content: center;
}

.follow {
    display: flex;
}

.follow p {
    margin: 0rem 0.2rem;
}

.mebox-enter-active,
.posts-enter-active,
.noposts-enter-active {
    animation: fade 0.25s ease-in;
}

.posts-leave-active {
    animation: fade 0.5s ease-in reverse;
}

.head {
    display: flex;
    padding-bottom: 1.5rem;
}

.head .headtitle {
    flex: 1;
}

.head .headdelete {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}

</style>