<template>
    <main>
        <div class="title">
            <h1> Followers </h1>
        </div>

        <div v-if="isLoading" class="isloading" >
            <beat-loader :loading="isLoading" color="black" size="15px"></beat-loader>
        </div>

        <transition name="nofollowing">
            <div v-if="followers.length === 0 && !isLoading" class="nono">
                <h1> No followers </h1>
            </div>
        </transition>

        <div class="following">
            <transition-group name="following">
                <div v-for="user in followers" :key="user._id" class="onefollower">
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
            followers: [],
            isLoading: true
        }
    },
    methods: {
        async getFollowers() {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query viewUserByID($userID: ID) {
                    viewUserByID(userID: $userID) {
                        _id
                        firstName
                        followers {
                            _id
                            firstName
                            lastName
                            username
                        }
                    }
                }`,
                variables: {
                    userID: this.$route.params.userID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            if (data.errors && data.errors.length >= 1) {
                return this.$router.push({name: 'not-found', params: { pathMatch: 'usernotfound' }})
            }

            this.followers = data.data.viewUserByID.followers
            this.isLoading = false

        }
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        }
    },
    created() {
        this.getFollowers()
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

@media screen and (max-width: 500px) {

    main {
        padding: 0.5rem;
    }

    .title {
        margin: 0;
    }

    .title h1 {
        font-size: 10vw;
    }

    main .onefollower {
        margin: 0.2rem 0;
    }

}

</style>