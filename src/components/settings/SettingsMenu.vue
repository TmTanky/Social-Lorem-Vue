<template>
    <main>
        <div class="title">
            <h1> Settings </h1>
        </div>

        <div v-if="isLoading" class="isloading" >
            <beat-loader :loading="isLoading" color="black" size="15px"></beat-loader>
        </div>

        <transition name="changebox" >
            <div v-if="!isLoading" class="changeusername">
            
                <form @submit.prevent method="post">
                    <div class="userinfo">
                        <h1> Change Username </h1>

                        <div v-if="isUserError">
                            <div v-for="err in usernameError" :key="err.msg" class="usererrorhandler">
                                <p> {{ err.msg }} </p>
                            </div>
                        </div>

                        <h2 v-if="!isChangeUsername" > {{ user.username }} </h2>
                        <input v-else type="text" ref="username" :value="user.username" name="username">
                    </div>

                    <div class="changebtns">
                        <button @click="submitUsername" v-if="isChangeUsername" > Submit </button>
                        <button class="secbtn" @click="toggleChange" > {{ !isChangeUsername ? 'Change' : 'Cancel' }} </button>
                    </div>
                </form>

                <hr> 

                <form class="passform" @submit.prevent method="post">
                    <div class="userpass">
                        <h1> Change Password </h1>

                        <div v-if="isPassError" class="passhandlerbox">
                            <div v-for="err in passwordError" :key="err.msg" class="errorhandler">
                                <p> {{ err.msg }} </p>
                            </div>
                        </div>

                        <input v-if="isChangePassword" v-model="newPass" class="newpass" type="password" name="newpass">
                        <input v-if="isChangePassword" v-model="confirmPass" class="confirmpass" type="password" name="confirmpass">
                    </div>

                    <div class="changebtns">
                        <button :disabled="passEmpty" @click="submitPass" v-if="isChangePassword" > Submit </button>
                        <button @click="togglePass" class="secbtn" > {{ !isChangePassword ? 'Change Password' : 'Cancel' }} </button>
                    </div>
                </form>

            </div>
        </transition>

    </main>
</template>

<script>
import axios from 'axios'

// Components 
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

export default {
    components: {
        BeatLoader
    },
    data() {
        return {
            user: {},
            newPass: "",
            confirmPass: "",
            isChangeUsername: false,
            isChangePassword: false,
            isPassError: false,
            isUserError: false,
            passwordError: [],
            usernameError: [],
            isLoading: true
        }
    },
    methods: {
        async getUserInfo() {
            const {data} = await axios.post('http://localhost:8000/graphql', {
                query: `query viewUserByID($userID: ID) {
                    viewUserByID(userID: $userID) {
                        firstName
                        lastName
                        username
                    }
                }`,
                variables: {
                    userID: this.userID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            this.user = data.data.viewUserByID
            this.isLoading = false

        },
        async submitUsername() {

            if (this.$refs.username.value === "") {
                this.usernameError.push({msg: 'Username Required.'})
                return this.isUserError = true
            }

            await axios.post('http://localhost:8000/graphql', {
                query: `mutation changeUsername($userID: ID!, $newUsername: String!) {
                    changeUsername(userID: $userID, newUsername: $newUsername)
                }`,
                variables: {
                    userID: this.userID,
                    newUsername: this.$refs.username.value
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            await this.getUserInfo()
            this.isChangeUsername = false
        },
        async submitPass() {

            if (this.newPass !== this.confirmPass) {
                this.passwordError.push({msg: 'Password must match.'})
                return this.isPassError = true
            }

            if (this.newPass === this.confirmPass && this.newPass.length < 5 ) {
                this.passwordError.push({msg: 'Password must be 5 characters long.'})
                return this.isPassError = true
            }

            await axios.post('http://localhost:8000/graphql', {
                query: `mutation changePassword($userID: ID!, $newPass: String!) {
                    changePassword(userID: $userID, newPass: $newPass)
                }`,
                variables: {
                    userID: this.userID,
                    newPass: this.newPass
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            this.passwordError = []
            this.isChangePassword = false

        },
        toggleChange() {
            this.isChangeUsername = !this.isChangeUsername
        },
        togglePass() {
            this.isChangePassword = !this.isChangePassword
            this.passwordError = []
            this.newPass = ""
            this.confirmPass = ""
        }
    },
    created() {
        this.getUserInfo()
    },
    computed: {
        userID() {
            return this.$store.state.user._id
        },
        passEmpty() {
            if (this.newPass === "" || this.confirmPass === "") {
                return true
            }

            return false
        }
    },
    watch: {
        isPassError() {
            setTimeout(() => {
                this.isPassError = false
                this.passwordError = []
            }, 5000)
        },
        isUserError() {
            setTimeout(() => {
                this.isUserError = false
                this.usernameError = []
            }, 5000)
        }
    }

}
</script>

<style scoped>

main {
    flex: 5;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}


input {
    padding: 0.5rem;
}

button {
    border: none;
    background-color: black;
    color: white;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
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

hr {
    margin: 1rem 0;
}

.title {
    background-color: black;
    padding: 1rem;
    margin: 0rem 1rem;
    padding-top: 4rem;
    padding-bottom: 1rem;
}

.title h1 {
    font-size: 4rem;
    color: white;
}

.changeusername {
    padding: 1rem;
    padding-top: 4rem;
}

.userinfo h1 {
    margin-bottom: 2rem;
}

form.passform .userpass {
    display: flex;
    flex-direction: column;
}

form.passform {
    display: flex;
    flex-direction: column;
}

form.passform .userpass h1 {
    margin-bottom: 2rem;
}

input.newpass {
    margin-bottom: 0.5rem;
}

.usererrorhandler {
    margin: 0.2rem 0;
}

.usererrorhandler p {
    color: red;
    font-size: 0.8rem;
}

.errorhandler {
    padding: 0.5rem;
    border: solid red 1px;
    border-radius: 3px;
    margin: 0.2rem 0;
}

.errorhandler p {
    color: red;
    font-size: 0.8rem;
}

.changebox-enter-active {
    animation: fade 0.3s ease-in;
}

@media screen and (max-width: 500px) {

    main {
        padding: 0.5rem;
    }

    .title {
        margin: 0;
    }

    .title h1 {
        font-size: 15vw;
    }

    .userinfo h1,
    .userpass h1 {
        font-size: 10vw;
    }

}

</style>