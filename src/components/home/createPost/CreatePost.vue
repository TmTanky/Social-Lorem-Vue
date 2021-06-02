<template>
    <form @submit.prevent="createPost" method="post">
        <div class="input">
            <textarea v-model="content" placeholder="What's on your mind?" rows="5"></textarea>
        </div>

        <div class="submit">
            <button class="submitbtn" :disabled="isDisabled" > Publish </button>
        </div>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            content: ""
        }
    },
    methods: {
        async createPost() {
            await axios.post(`https://loremshare-ts-gql-api.herokuapp.com/graphql`, {
                query: `mutation createPost($content: String!, $postBy: ID!) {
                    createPost(content: $content, postBy: $postBy) {
                        _id
                        content
                    }
                }`,
                variables: {
                    postBy: this.$store.state.user._id,
                    content: this.content
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            this.refetch()
            this.content = ""

        },
        refetch() {
            this.$emit('refetch-data')
        }
    },
    computed: {
        isDisabled() {
            return this.content === ""
        }
    }
}
</script>

<style scoped>

textarea {
    width: 100%;
}

button.submitbtn:disabled {
    background-color: rgba(0, 0, 0, 0.5);
}

textarea {
    margin-top: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
}

button.submitbtn {
    margin-top: 0.2rem;
    padding: 0.5rem 1rem;
    background-color: black;
    color: white;
    border: none;
    transition-property: background-color;
    transition-duration: 0.3s;
}

button:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.8);
}

</style>