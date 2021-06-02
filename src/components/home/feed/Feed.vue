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
                    <router-link :to="{name: 'oneuser', params: {username: post.postBy.username}}">
                        <strong> {{ post.postBy.firstName }} {{ post.postBy.lastName }} </strong>
                    </router-link>
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

                    <div @click="openComment(post._id)" class="comment"> <img class="imgcomment" src="https://img.icons8.com/material-sharp/24/000000/topic.png"/> </div>
                </div>
                
                <div v-if="post.isOpen">
                    <transition name="commentopen" mode="out-in" >
                        <create-comment @toggle-refetch="refetchAgain" :postID="post._id" > </create-comment>
                    </transition>
                </div>

            </div>
        </transition-group>

    </main>
</template>

<script>
import axios from 'axios'
import CreatePost from '../createPost/CreatePost.vue'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import CreateComment from '../../commentPost/CreateComment.vue'

export default {
    components: {
        BeatLoader,
        CreatePost,
        CreateComment
    },
    data() {
        return {
            myPosts: [],
            isLoading: true,
            isEmpty: false,
            openLikes: false,
            openComments: false
        }
    },
    methods: {
        async getData() {
            const {data} = await axios.post('https://loremshare-ts-gql-api.herokuapp.com/graphql', {
                query: `query getAllPosts {
                    getAllPosts {
                        _id
                        content
                        createdAt
                        postBy {
                            _id
                            firstName
                            lastName
                            username
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
                    userID: this.userID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.token}`
                }
            })


            data.data.getAllPosts.forEach(element => {
                element.isOpen = false
            })

            if (data.data.getAllPosts.length === 0) {
                this.isLoading = false
                this.isEmpty = true
            }

            if (data.data.getAllPosts.length > 0) {
                this.isEmpty = false
            }
            
            this.myPosts = data.data.getAllPosts
            this.isLoading = false

        },
        async like(postID) {
            await axios.post('https://loremshare-ts-gql-api.herokuapp.com/graphql', {
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
        }
    },
    created() {
        this.getData()
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        token() {
            return this.$store.state.user.token
        }
    }
}
</script>


<style scoped>

main {
    flex: 5;
    padding: 1rem 2rem;
}

h2 {
    padding-bottom: 1rem;
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

.onepost .postdetails a {
    text-decoration: none;
    font-size: 1.5rem;
    color: black;
}
.onepost .postdetails p {
    margin-top: 1rem;
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

.noposts-enter-active,
.posts-enter-active,
.commentopen-enter-active {
    animation: fade 0.25s ease-in;
}

.reacting-enter-active {
    animation: enlarge 0.25s ease-in;
}

.commentopen-leave-active {
    animation: fade 0.25s ease-in reverse;
}

/* .reacting-leave-active {
    animation: fade 0.25s ease-in;
} */

/* .react .like {
    border-right: black solid 1px;
} */

/* .react .like:hover {
    background-color: rgba(134, 131, 131, 0.3);
}

.react .comment:hover {
    background-color: rgba(134, 131, 131, 0.3);
} */

/* Media Q's */

@media screen and (max-width: 500px) {

    main {
        padding: 0.5rem;
    }

    .title h1 {
        font-size: 15vw;
    }

}

</style>