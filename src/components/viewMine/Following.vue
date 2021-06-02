<template>
    <main>
        <div class="title">
            <h1> Following </h1>
        </div>

        <div v-if="isLoading" class="isloading" >
            <beat-loader :loading="isLoading" color="black" size="15px"></beat-loader>
        </div>

        <transition name="nofollowing">
            <div v-if="following.length === 0 && !isLoading" class="nono">
                <h1> No following </h1>
            </div>
        </transition>

        <div class="following">
            <transition-group name="following">
                <div v-for="user in following" :key="user._id" class="onefollower">
                    <router-link :to="{name: 'oneuser', params: {username: user.username}}" > {{ user.firstName }} {{ user.lastName }} </router-link>
                </div>
            </transition-group>
        </div>

    </main>
</template>

<script>
import axios from'axios'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

export default {
    components: {
        BeatLoader
    },
    data() {
        return {
            following: [],
            isLoading: true
        }
    },
    methods: {
        async getFollowing() {
            const {data} = await axios.post('https://loremshare-ts-gql-api.herokuapp.com/graphql', {
                query: `query viewUserByID($userID: ID) {
                    viewUserByID(userID: $userID) {
                        following {
                            _id
                            firstName
                            lastName
                            username
                        }
                    }
                }`,
                variables: {
                    userID: this.userID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            this.following = data.data.viewUserByID.following
            this.isLoading = false

        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        }
    },
    created() {
        this.getFollowing()
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

a {
    font-size: 1.5rem;
    color: black;
    text-decoration: none;
}

main {
    flex: 5;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.title {
    background-color: black;
    padding: 1rem;
    margin: 0rem 1rem;
    padding-top: 4rem;
    padding-bottom: 1rem;
}

.title h1 {
    font-size: 4rem;
    color: white;
}

main .following {
    margin-top: 4rem;
}

main .onefollower {
    padding: 1rem;
    background-color: rgb(250, 250, 250);
    box-shadow: 0 8px 6px -8px black;
    border: solid black 2px;
    border-radius: 3px;
    margin: 0.2rem 1rem;
    width: inherit;
}

.nono {
    margin: 4rem 0rem;
    text-align: center;
}

.following-enter-active,
.nofollowing-enter-active {
    animation: fade 0.3s ease-in;
}


</style>