<template>
    <form @submit.prevent >
        <input @keyup="search" ref="search" type="text" placeholder="Search Something (Case-Sensitive)" name="" > 
        
        <div class="searchresults">
            <transition-group name="userresults" >
                <div class="eachuser" @click="clear(user.username)" v-for="user in searchResults" :key="user._id" >
                    <h3> {{ user.firstName }} {{ user.lastName }} </h3>
                    <p> @{{ user.username }} </p>
                </div>
            </transition-group>
        </div>

    </form>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            searchResults: [],
            ifNoUsers: false
        }
    },
    methods: {
        async search() {
            const {data} = await axios.post('https://loremshare-ts-gql-api.herokuapp.com/graphql', {
                query: `query getUserByUserName($username: String) {
                    getUserByUsername(username: $username) {
                        _id
                        firstName
                        lastName
                        username
                    }
                }`,
                variables: {
                    username: this.$refs.search.value
                }
            }, {
                headers: {
                    'authorization': `Bearer ${this.$store.state.user.token}`
                }
            })

            this.searchResults = data.data.getUserByUsername

        },
        clear(username) {
            this.$refs.search.value = ""
            this.searchResults = []
            this.$router.push({name: 'oneuser', params: {username: username}})
        }
    }
}
</script>

<style scoped>

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

form {
    display: flex;
    justify-content: flex-start;
    padding: 1rem 0rem 1rem 1rem;
    background-color: black;
    /* border-bottom: solid white 2px; */
    position: relative;
}

input {
    background-color: white;
    border-radius: 25px;
    border: black solid 1px;
    outline: none;
    padding: 0.5rem 1rem;
    width: 30%;
}

button {
    cursor: pointer;
    margin: auto;
    margin-left: 0.5rem;
    background: none;
    outline: none;
    border: none;
}

a {
    color: black;
    text-decoration: none;
}

p {
    font-size: 0.8rem;
}

.searchresults {
    position: absolute;
    top: 50px;
    width: 30%;
    background-color: whitesmoke;
    border-radius: 3px;
}

.eachuser {
    padding: 0.5rem;
    margin: 0.2rem;
    transition-property: background-color;
    transition-duration: 0.2s;
    cursor: pointer;
}

.eachuser:hover {
    background-color: rgba(0, 0, 0, 0.2);
}

.userresults-enter-active {
    animation: fade 0.5s ease-in;
}

.userresults-leave-active {
    animation: fade 0.5s ease-in reverse;
}

@media screen and (max-width: 900px) {

    input {
        width: 40%
    }

}

@media screen and (max-width: 750px) {

    form {
        justify-content: center;
        padding: 1rem 0rem;
    }

    input {
        width: 95%;
    }

    .searchresults {
        width: 95%;
    }

}

</style>