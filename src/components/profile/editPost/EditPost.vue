<template>
    <dialog v-if="isOpen">
        <form @submit.prevent >
            <textarea ref="content" :value="currentContent" name="current" cols="30" rows="10"></textarea>
            <span> <button type="submit" @click="submitEdit"> Edit </button> <button @click="closeForm" > Cancel </button>  </span>
        </form>
    </dialog>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        isOpen: Boolean,
        closeForm: Function,
        myPosts: Array,
        selectedID: String,
        getData: Function
    },
    methods: {
        async submitEdit() {
            await axios.post('http://localhost:8000/graphql',{
                query: `mutation editPost($postID: ID!, $content: String!) {
                    editPost(postID: $postID, content: $content) 
                }`,
                variables: {
                    postID: this.selectedID,
                    content: this.$refs.content.value
                }
            })

            await this.getData()
            this.closeForm()

        }
    },
    computed: {
        currentContent() {
            const currentPost = this.myPosts.find(item => item._id === this.selectedID)
            return currentPost.content
        }
    }
}
</script>

<style scoped>

dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 4rem;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
}

textarea {
    padding: 0.5rem;
}

form {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-color: white;
    border-radius: 5px;
}

form button {
    margin-top: 0.2rem;
    padding: 0.5rem 1rem;
    background-color: black;
    width: 80px;
    color: white;
    border: none;
    transition-property: background-color;
    transition-duration: 0.3s;
}

form button:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.8);
}

</style>