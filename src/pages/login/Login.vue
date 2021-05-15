<template>
    <main>
        <div class="intro">
            <h1> Welcome to Social-Lorem </h1>
            <p> This is a existing project built with React JS and transformed it with Vue JS </p>
        </div>

        <div class="login">
            <form @submit.prevent="loginSubmit" method="post">
                <h1> Login </h1>
                <input type="text" placeholder="Email" name="email" v-model="email">
                <input type="password" placeholder="Password" name="password" v-model="password">
                <button> Login </button>
                <router-link to="/register"> Dont have an account? Register now. </router-link>
            </form>
            <!-- <router-link to="/register"> Dont have an account? Register now. </router-link> -->
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        loginSubmit() {
            console.log(this.email, this.password)
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
    margin: 0rem 1rem;
}

.intro h1 {
    font-size: 2.5rem;
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
    margin-bottom: 1rem;
}

input {
    padding: 0.5rem;
    margin-top: -1.5px;
}

button {
    margin-top: 1rem;
    background-color: black;
    color: white;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    transition-duration: 0.5s;
}

button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
}

a {
    margin-top: 0.5rem;
}

</style>