<template>
    <main>
        <form @submit.prevent="createComment" method="post">
            <input ref="comment" type="text" name="" id="">
            <button> Submit </button>
        </form>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        postID: String
    },
    methods: {
        async createComment() {
            await axios.post('http://localhost:8000/graphql', {
                query: `mutation createComment($postID: ID!, $content: String!, $userID: ID!) {
                    createComment(postID: $postID, content: $content, userID: $userID)
                }`,
                variables: {
                    postID: this.postID,
                    content: this.$refs.comment.value,
                    userID: this.userID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            this.$refs.comment.value = ""
            this.$emit('toggle-refetch')
        }
    },
    computed: {
        userID() {
             return this.$store.state.user._id
        }
    }
}
</script>

<style scoped>

input {
    width: 100%;
    padding: 0.5rem;
}

/* button {
    margin-top: 0.5rem;
    width: 100px;
    padding: 0.5rem 1rem;
} */

button {
    border: none;
    background-color: black;
    color: white;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    transition-duration: 0.5s;
    font-size: 0.8rem;
    text-transform: uppercase;
}

button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
}

</style>