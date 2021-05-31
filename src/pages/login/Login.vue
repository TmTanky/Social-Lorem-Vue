<template>
    <main>
        <div class="intro">
            <div class="introdetails">
                <h1> Welcome to Social-Lorem </h1>
                <p> This is a existing project built with React JS and transformed it with Vue JS </p>
            </div>
        </div>

        <div class="login">
            <form @submit.prevent="loginSubmit" method="post">
                <h1> Login </h1>
                
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

                <input type="text" placeholder="Email" name="email" v-model="email">
                <input type="password" placeholder="Password" name="password" v-model="password">
                <button> Login </button>
                <router-link class="loginlink" to="/register"> Dont have an account? Register now. </router-link>
                <router-link to="/resetpassword" > Reset Password </router-link>
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: "",
            password: "",
            error: {},
            isError: false
        }
    },
    methods: {
        async loginSubmit() {

            const {data} = await axios.post('http://localhost:8000/graphql',{
                query: `query loginUser($email: String, $password: String) {
                    loginUser(email: $email, password: $password) {
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
                        token
                    }
                }`,
                variables: {
                    email: this.email,
                    password: this.password
                }
            }, {
                headers: {
                    'login': 'true'
                }
            })

            console.log(data)

            if (data.errors !== undefined && data.errors.length > 0) {
                this.isError = true
                return this.error = data.errors[0]
            }

            this.$store.dispatch('loginSuccess')
            this.$store.dispatch('setUser', data.data.loginUser)
            this.$router.push('/home')

            this.email = ""
            this.password = ""

        },
        closeError() {
            this.isError = false
        }
    },
    computed: {
        firstName() {
            return this.$store.state.user.firstName
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
    min-height: 100vh;
}

.intro, .login {
    flex: 1;
    display: flex;
}

/* 1st Box */

.intro {
    flex-direction: column;
    justify-content: center;
}

.introdetails {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto 2rem;
}

.intro .introdetails h1 {
    font-size: 3rem;
}

/* 2nd Box */

.login {
    justify-content: center;
}

.login form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
}

.login form h1 {
    margin-bottom: 0.5rem;
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

a {
    color: black;
}

a.loginlink {
    margin-bottom: 0.2rem;
}

/* Error Handling */

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

@media screen and (max-width: 800px) {

    .intro {
        margin: auto;
    }

    .intro .introdetails h1 {
        font-size: 6vw;
        text-align: center;
    }

    .intro .introdetails p {
        margin-top: 1rem;
        font-size: 5vw;
        text-align: center;
    }
    
    main {
        flex-direction: column;
    }

}

@media screen and (max-width: 500px) {

    .intro .introdetails h1 {
        font-size: 7vw;
        text-align: center;
    }

    .intro .introdetails p {
        margin-top: 1rem;
        font-size: 6vw;
        text-align: center;
    }
    
    .login form {
        width: 90%;
    }

}

</style>