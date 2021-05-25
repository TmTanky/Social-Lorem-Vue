<template>
    <main>
        <div v-if="!isDoneLoading" class="isloading" >
            <beat-loader :loading="!isDoneLoading" color="black" size="15px"></beat-loader>
        </div>

        <div class="userbox">
            <transition name="theuser" >
                <div v-if="isDoneLoading" class="user">
                    <div class="usernames">
                        <div class="userdetails">
                            <h1> {{ user.firstName }} {{ user.lastName }} </h1>
                            <p> @{{ user.username }} </p>
                        </div>

                        <div v-if="user._id !== userID" class="userfollow">
                            <button @click="follow(user._id)" > {{ isFollowed ? 'Unfollow' : 'Follow' }} </button>
                        </div>
                    </div>

                    <div class="follow">
                        <strong> <p class="following" > Following: {{ user.following.length }} </p> </strong>
                        <strong> <p class="followers" > Followers: {{ user.followers.length }} </p> </strong>
                    </div>
                </div>
            </transition>

            <transition name="noposts" >
                <div v-if="isEmpty" class="noposts" >
                    <h1> No post available </h1>
                </div>
            </transition>

            <transition-group name="posts" >
                <div class="onepost" v-for="post in myPosts" :key="post._id" >
                    <h2> {{ post.postBy.firstName }} {{ post.postBy.lastName }} </h2>
                    <p> {{ post.content }} </p>
                </div>
            </transition-group>

        </div>
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
            user: {},
            isDoneLoading: false,
            isEmpty: false,
            myPosts: []
        }
    },
    methods: {
        async search() {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query viewUser($username: String) {
                    viewUser(username: $username) {
                        _id
                        firstName
                        lastName
                        username
                        following {
                            _id
                            firstName
                            lastName
                        }
                        followers {
                            _id
                            firstName
                            lastName
                        }
                    }
                }`,
                variables: {
                    username: this.$route.params.username
                }
            })

            // console.log(data)

            this.isDoneLoading = true
            this.user = data.data.viewUser

        },
        async getData() {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query viewUserPosts($username: String) {
                    viewUserPosts(username: $username) {
                        _id
                        createdAt
                        content
                        postBy {
                            firstName
                            lastName
                        }
                    }
                }`,
                variables: {
                    username: this.$route.params.username
                }
            })

            if (data.data.viewUserPosts.length === 0) {
                this.isEmpty = true
            }
            
            this.myPosts = data.data.viewUserPosts    

        },
        async follow(toFollowID) {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `mutation followUser($userID: ID!, $toFollowID: ID!) {
                    followUser(userID: $userID, toFollowID: $toFollowID)
                }`,
                variables: {
                    userID: this.userID,
                    toFollowID
                }
            })

            console.log(data)

            await this.search()
        }
    },
    async created() {
        // await this.getData()
        await this.search(this.$route.params.username)
        await this.getData()
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        isFollowed() { 
            if (this.user.followers.filter(item => item._id === this.userID).length === 1) {
                return true
            } else {
                return false
            }
        },
        viewedUserID() {
            return this.user._id
        }
    },
    watch: {
        $route(value) {
            this.isEmpty = false
            this.search(value.params.username)
            this.getData()
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
}

.user {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: black;
    color: white;
    padding: 1rem;
    padding-top: 4rem;
}

.user h1 {
    font-size: 3rem;
}

.follow {
    padding-top: 1rem;
    display: flex;
}

.followers {
    margin-left: 0.5rem;
}

.usernames {
    display: flex;
}

.usernames .userdetails {
    flex: 1;
}

.usernames .userfollow {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin: auto;
}

.usernames .userfollow button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    background-color: white;
    transition-property: background-color;
    transition-duration: 0.3s;
    color: black;
}

.usernames .userfollow button:hover {
    background-color: rgba(230, 225, 225, 0.842);
}

.onepost {
    padding: 1rem;
    background-color: rgb(250, 250, 250);
    box-shadow: 0 8px 6px -8px black;
    border: solid black 2px;
    border-radius: 3px;
    margin: 1rem 0rem;
    width: inherit;
}

.onepost h2 {
    padding-bottom: 1rem;
}

.noposts {
    padding-top: 5rem;
    display: flex;
    justify-content: center;
}

.posts-enter-active,
.theuser-enter-active,
.noposts-enter-active {
    animation: fade 0.25s ease-in;
}

</style>