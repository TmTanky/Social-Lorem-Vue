<template>
    <main>
        <div v-if="!isDoneLoading" class="isloading" >
            <beat-loader :loading="!isDoneLoading" color="black" size="15px"></beat-loader>
        </div>

        <div v-if="user" class="userbox">
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
                        <strong> <p @click="redirectToFollowing(user._id)" class="following" > Following: {{ user.following.length }} </p> </strong>
                        <strong> <p @click="redirectToFollowers(user._id)" class="followers" > Followers: {{ user.followers.length }} </p> </strong>
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
                        <div class="postdetails">
                            <h2> {{ post.postBy.firstName }} {{ post.postBy.lastName }} </h2>
                            <p> {{ post.content }} </p>
                        </div>

                        <div class="reactcount">
                            <p class="likecount" @click="toggleLikes(post._id)" > Likes: {{ post.likes.length }} </p>
                            <p class="commentcount" @click="toggleComments(post._id)" > Comments: {{ post.comments.length }} </p>
                        </div>

                        <div class="react">
                            <transition mode="out-in" name="reacting" >
                                <div v-if="post.likes.filter(user => user._id === userID).length === 1" @click="like(post._id)" class="like">
                                    <img class="imglike" src="https://img.icons8.com/material-sharp/24/000000/facebook-like--v1.png"/>
                                </div>

                                <div v-else @click="like(post._id)" class="like"> 
                                    <img class="imglike" src="https://img.icons8.com/material-outlined/24/000000/facebook-like--v1.png"/>
                                </div>   
                            </transition> 

                            <div @click="openComment(post._id)" class="comment">
                                <img class="imgcomment" src="https://img.icons8.com/material-sharp/24/000000/topic.png"/>
                            </div>
                        </div>

                        <div v-if="post.isOpen">
                            <transition name="commentopen" mode="out-in" >
                                <create-comment @toggle-refetch="refetchAgain" :postID="post._id" > </create-comment>
                            </transition>
                        </div>

                    </div>

            </transition-group>

            <button v-if="myPosts.length >= 1" @click="loadMore" > Load More </button>

        </div>
    </main>
</template>

<script>
import axios from 'axios'

// Components
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import CreateComment from '../../components/commentPost/CreateComment.vue'

export default {
    components: {
        BeatLoader,
        CreateComment
    },
    data() {
        return {
            user: {},
            isDoneLoading: false,
            isEmpty: false,
            myPosts: [],
            toViewID: "",
            limitCount: 5
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
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            this.toViewID = data.data.viewUser.username ?? "tae" 
            this.isDoneLoading = true
            this.user = data.data.viewUser

        },
        async getData() {
            
            try {

                const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query viewUserPosts($username: String, $limitCount: Int) {
                    viewUserPosts(username: $username, limitCount: $limitCount) {
                        _id
                        createdAt
                        content
                        postBy {
                            firstName
                            lastName
                        }
                        likes {
                            _id
                            firstName
                            lastName
                        }
                        comments {
                            _id
                            content
                            commentBy {
                                _id
                                firstName
                                lastName
                            }
                        }
                    }
                }`,
                variables: {
                    username: this.$route.params.username,
                    limitCount: this.limitCount
                }
                }, {
                    headers: {
                        'authorization': `Bearer ${this.$store.state.user.token}`
                    }
                })

                if (data.errors && data.errors.length >= 1) {
                    return this.$router.push({name: 'not-found', params: { pathMatch: 'usernotfound' }})
                }

                data.data.viewUserPosts && data.data.viewUserPosts.length === 0 ? this.isEmpty = true : this.isEmpty = false
                
                this.myPosts = data.data.viewUserPosts
                this.limitCount+=5
                
            } catch (err) {
                console.log(err)
            }

        },
        async follow(toFollowID) {
            await axios.post('http://localhost:8000/graphql', {
                query: `mutation followUser($userID: ID!, $toFollowID: ID!) {
                    followUser(userID: $userID, toFollowID: $toFollowID)
                }`,
                variables: {
                    userID: this.userID,
                    toFollowID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            await this.search()
        },
        async like(postID) {
            await axios.post('http://localhost:8000/graphql', {
                query: `mutation reactToPost($postID: ID!, $userID: ID!) {
                    reactToPost(postID: $postID, userID: $userID)
                }`,
                variables: {
                    postID,
                    userID: this.userID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            await this.refetch()

        },
        async refetch() {
            await this.getData()
        },
        async loadMore() {
            await this.getData()
        },
        toggleLikes(postID) {
            this.openLikes = true
            this.$router.push({name: 'viewlikes', params: {postID}})
        },
        toggleComments(postID) {
            this.$router.push({name: 'viewcomments', params: {postID}})
        },
        openComment(postID) {
            const toActivated = this.myPosts.find(item => item._id === postID)
            toActivated.isOpen = !toActivated.isOpen
        },
        refetchAgain() {
            this.refetch()
        },
        redirectToFollowing(userID) {
            this.$router.push({name: 'viewusersfollowing', params: {userID}})
        },
        redirectToFollowers(userID) {
            this.$router.push({name: 'viewusersfollowers', params: {userID}})
        }
    },
    async created() {
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
        async $route(prevValue,value) {

            if (prevValue.params.username !== value.params.username && prevValue.matched[0].path === value.matched[0].path ) {
                this.isDoneLoading = false
                this.isEmpty = false
                await this.search(value.params.username)
                return this.getData()
            }
            
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

@keyframes enlarge {
    0% {
        transform: rotate(20deg);
    }

    50% {
        transform: rotate(-20deg);
    }

    100% {
        transform: rotate(0);
    }
}

main {
    display: flex;
    flex: 5;
    flex-direction: column;
    padding: 1rem 2rem;
}

button {
    border: none;
    background-color: black;
    color: white;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    transition-duration: 0.5s;
    font-size: 0.8rem;
    text-transform: uppercase;
}

button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
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

.following {
    cursor: pointer;
}

.followers {
    margin-left: 0.5rem;
    cursor: pointer;
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
    cursor: pointer;
    margin-right: 0.5rem;
}

.reactcount p.commentcount {
    cursor: pointer;
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

.react .comment {
    border-left: black solid 1px;
}

.react .like .imglike {
    transition-property: all;
    transition-duration: 0.3s;
}

.react .like .imglike:hover {
    transform: scale(1.2);
}

.react .comment .imgcomment {
    transition-property: all;
    transition-duration: 0.3s;
}

.react .comment .imgcomment:hover {
    transform: scale(1.2);
}

.noposts {
    padding-top: 5rem;
    display: flex;
    justify-content: center;
}

.reacting-enter-active {
    animation: enlarge 0.25s ease-in;
}

.posts-enter-active,
.theuser-enter-active,
.noposts-enter-active {
    animation: fade 0.25s ease-in;
}

.posts-leave-active,
.theuser-leave-active,
.noposts-leave-active {
    animation: fade 0.25s ease-in reverse;
}

@media screen and (max-width: 500px) {

    main {
        padding: 0.5rem;
    }

    /* .title h1 {
        font-size: 10vw;
        text-align: center;
    }

    .noposts h1 {
        font-size: 8vw;
    } */

    .usernames h1 {
        font-size: 1.2rem;
    }

}

</style>