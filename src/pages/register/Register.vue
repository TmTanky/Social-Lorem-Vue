<template>
    <main>
        <div class="registerbox">
            <form @submit.prevent="registerSubmit" method="post">
                <h1> Create an account </h1>

                <transition name="error" >
                    <div class="errorbox" v-if="isError"  >
                        <div class="errormsg">
                            <p class="loginerror"> {{ error.message }} </p>
                        </div>

                        <div @click="closeError" class="close">
                            <p> Close </p>
                        </div>
                    </div>
                </transition>

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
            password: "",
            error: {},
            isError: false
        }
    },
    methods: {
        async registerSubmit() {

            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
                    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
                        _id
                        firstName
                        lastName
                        email
                        myPosts {
                            _id
                            content
                            postBy {
                                _id
                                firstName
                                lastName
                            }
                        }
                    }
                }`,
                variables: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
            })

            if (data.errors !== undefined && data.errors.length > 0) {
                this.isError = true
                return this.error = data.errors[0]
            }

            this.$store.dispatch('loginSuccess')
            this.$store.dispatch('setUser', data.data.createUser)
            this.$router.push('/home')

        },
        closeError() {
            this.isError = false
        }
    },
    watch: {
        isError() {
            setTimeout(() => {
                this.isError = false
            }, 8000)
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
    border-radius: 5px;
    margin: 7rem 0rem;
    padding: 1rem 2rem;
}

.registerbox form h1 {
    margin-bottom: 0.5rem;
}

input {
    padding: 0.8rem 0.5rem;
    margin: 0.2rem 0rem;
    background-color: whitesmoke;
    border: none;
    outline-color: rgb(180, 176, 176);
    color: black;
}

button {
    border: none;
    background-color: black;
    color: white;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    transition-duration: 0.5s;
    font-size: 1rem;
    text-transform: uppercase;
}

button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
}

/* Error handling */

@keyframes loginError {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.errorbox {
    border: solid red 1px;
    border-radius: 3px;
    margin: 0.5rem 0rem;
    padding: 0.2rem 0.5rem;
    display: flex;
}

.errormsg, .close {
    flex: 1;
    display: flex;
}

.close {
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
}

.close p {
    font-size: 0.8rem;
}

.errorbox p {
    color: red;
}

.loginerror {
    margin: 0.5rem 0rem;
    color: red;
    font-size: 0.8rem;
}

.error-enter-active {
    animation: loginError 0.3s ease-in;
}

.error-leave-active {
    animation: loginError 0.3s ease-out reverse;
}

</style>