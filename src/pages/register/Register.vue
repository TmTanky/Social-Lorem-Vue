<template>
    <main>
        <div class="registerbox">
            <form @submit.prevent="registerSubmit" method="post">
                <h1> Register </h1>
                <input type="text" placeholder="First Name" name="firstName" v-model="firstName">
                <input type="text" placeholder="Last Name" class="inputs" name="lastName" v-model="lastName">
                <input type="email" placeholder="Email" class="inputs" name="email" v-model="email">
                <input type="password" placeholder="Password" class="inputs" name="password" v-model="password">
                <button> Register </button>
                <router-link to="/"> Already have an account? Login now. </router-link>
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async registerSubmit() {

            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
                    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
                        firstName
                    }
                }`,
                variables: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
            })

            this.$store.dispatch('loginSuccess')
            this.$store.dispatch('setUser', data.data.createUser)
            this.$router.push('/home')

            // console.log(this.firstName, this.lastName, this.email, this.password)
        }
    }
}
</script>

<style scoped>

main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.registerbox {
    flex: 1;
    display: flex;
    justify-content: center;
}

.registerbox form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
}

.registerbox form h1 {
    margin-bottom: 1rem;
}

input {
    padding: 0.5rem;
}

.inputs {
    margin-top: -1.5px;
}

button {
    border: none;
    border-radius: 5px;
    background-color: black;
    color: white;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

</style>