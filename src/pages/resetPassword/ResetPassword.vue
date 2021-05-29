<template>
    <main>
        <form @submit.prevent method="post">
            <h1> Reset my password </h1>
            <input type="email" name="" placeholder="Email" >
            <button> Reset Password </button>
        </form>
    </main>
</template>

<style scoped>

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

</style>