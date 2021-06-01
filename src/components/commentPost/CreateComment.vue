<template>
    <main>
        <form @submit.prevent="createComment" method="post">
            <input v-model="comment" type="text" name="" id="">
            <button :disabled="isEmpty" type="submit" > Submit </button>
        </form>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        postID: String
    },
    data() {
        return {
            comment: ""
        }
    },
    methods: {
        async createComment() {

            await axios.post('http://localhost:8000/graphql', {
                query: `mutation createComment($postID: ID!, $content: String!, $userID: ID!) {
                    createComment(postID: $postID, content: $content, userID: $userID)
                }`,
                variables: {
                    postID: this.postID,
                    content: this.comment,
                    userID: this.userID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            this.comment = ""
            this.$emit('toggle-refetch')

        }
    },
    computed: {
        userID() {
             return this.$store.state.user._id
        },
        isEmpty() {
            if (this.comment === "") {
                return true
            }

            return false
        }
    }
}
</script>

<style scoped>

input {
    width: 100%;
    padding: 0.5rem;
}

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

button:disabled {
    background-color: rgba(0, 0, 0, 0.5);
}

</style>