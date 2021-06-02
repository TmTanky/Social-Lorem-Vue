<template>
    <main>

        <p> <strong> Note: </strong> This feature will only work with legitimate email. <br>
        This will send you a code to your email. (If you can't find the email check the <strong>SPAM</strong>) </p>

        <div v-if="isLoading" class="isloading" >
            <beat-loader :loading="isLoading" color="black" size="15px"></beat-loader>
        </div>

        <transition-group name="resetmain" mode="out-in" >
            <form v-if="!codeReceived && !resetStage && !isLoading" @submit.prevent="submitReset" method="post">
                <h1> Reset my password </h1>
                <input type="email" v-model="email" name="email" placeholder="Email" >
                <button :disabled="isEmpty" type="submit" > Reset Password </button>
            </form>

            <form v-else-if="codeReceived && !resetStage && !isLoading" @submit.prevent="submitCode" method="post">
                <h1> Input Code </h1>
                <input type="text" v-model="theReceivedCode" placeholder="Code" name="code">
                <button type="submit"> Submit </button>
            </form>

            <form v-else-if="resetStage" @submit.prevent="resetPassword" method="post">
                <h1> New Password </h1>
                <input class="newpass" type="password" placeholder="New Password" v-model="newPass" name="newPass">
                <input type="password" placeholder="Confirm Password" v-model="confirmPass" name="confirmPass">
                <button type="submit"> Reset </button>
            </form>
        </transition-group>
        
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
            email: "",
            isEmpty: false,
            codeReceived: false,
            resetStage: false,
            theReceivedCode: "",
            code: "",
            newPass: "",
            confirmPass: "",
            userID: "",
            isLoading: false
        }
    },
    methods: {
        async submitReset() {

            this.isLoading = true

            const {data} = await axios.post('https://loremshare-ts-gql-api.herokuapp.com/graphql', {
                query: `mutation sendEmail($email: String!) {
                    sendEmail(email: $email) {
                        code
                        userID
                    }
                }`,
                variables: {
                    email: this.email
                }
            }, {
                headers: {
                    'reset': 'true'
                }
            })

            this.code = data.data.sendEmail.code
            this.userID = data.data.sendEmail.userID
            this.codeReceived = true
            this.isLoading = false
        },
        submitCode() {
            if (this.theReceivedCode === "") {
                return alert('Code must be provided')
            }

            if (this.theReceivedCode !== this.code) {
                return alert('Invalid Code, Please try again')
            }

            if (this.theReceivedCode === this.code) {
                return this.resetStage = true
            }
        },
        async resetPassword() {
            if (this.newPass !== this.confirmPass) {
                return alert('Password must match.')
            }

            if (this.newPass.length < 5) {
                return alert('Password must be 5 characters long')
            }

            const {data} = await axios.post('https://loremshare-ts-gql-api.herokuapp.com/graphql', {
                query: `mutation changePassword($userID: ID!, $newPass: String!) {
                    changePassword(userID: $userID, newPass: $newPass)
                }`,
                variables: {
                    userID: this.userID,
                    newPass: this.newPass
                }
            }, {
                headers: {
                    'confirm': 'true'
                }
            })

            alert(`${data.data.changePassword}`)
            this.resetStage = false
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
                return this.$router.push('/')
            }, 3000)

        }
    },
    watch: {
        isEmpty() {
            if (this.email === "") {
                return true
            } 

            return false
        }
    }
}
</script>

<style scoped>

.resetmain-enter-active {
    animation: fade 0.3s ease-in;
}

p {
    text-align: center;
    margin-top: 3rem;
}

main {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
}

main form {
    background-color: whitesmoke;
    width: 30%;
    border: black solid 2px;
    border-radius: 5px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
}

h1 {
    margin-bottom: 1rem;
}

input {
    padding: 0.5rem;
}

input.newpass {
    margin-bottom: 0.3rem;
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

@media screen and (max-width: 850px) {

    main form {
        width: 50%;
    }

}

@media screen and (max-width: 550px) {

    main form {
        width: 90%;
    }

}

</style>