<template>
    <main>
        <form @submit.prevent >
            <input ref="firstName" type="text" :value="firstName" placeholder="First Name" name="firstName">
            <input ref="lastName" type="text" :value="lastName" placeholder="Last Name" name="lastName">
            <span> <button @click="editNameSubmit" type="submit"> Confirm </button> <button @click="toggle" > Cancel </button> </span>
        </form>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        toggle: Function,
        firstName: String,
        lastName: String,
        getUsername: Function
    },
    methods: {
        async editNameSubmit() {

            await axios.post('http://localhost:8000/graphql', {
                query: `mutation editUsername($userID: ID!, $firstName: String!, $lastName: String!) {
                    editUsername(userID: $userID, firstName: $firstName, lastName: $lastName)
                }`,
                variables: {
                    userID: this.userID,
                    firstName: this.$refs.firstName.value,
                    lastName: this.$refs.lastName.value
                }
            })

            await this.getUsername()
            this.toggle()

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

main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
}

main form {
    padding: 2rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25%;
    background-color: white;
    border-radius: 5px;
}

input {
    padding: 0.8rem 0.5rem;
    margin: 0.2rem 0rem;
    background-color: whitesmoke;
    border: none;
    outline-color: rgb(206, 198, 198);
    color: black;
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

</style>