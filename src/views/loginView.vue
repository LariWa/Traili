<template>
    <v-flex xs12 md7 offset-md1>
        <div class="login">
            <h3>LOG IN</h3>
            <v-form>
                <v-text-field type="text " placeholder="Email" @change="onEmailChangeACB"></v-text-field>
                <v-text-field type="password" placeholder="Password" @change="onPswChangeACB"></v-text-field>
            </v-form>
            <v-btn @click="onLoginACB">Login</v-btn>
            <br />
            <v-btn @click="onCreateACB">Create account</v-btn>
        </div>
    </v-flex>
</template>

<script>

    export default {
        emits: [
            "emailTextChanged",
            "pswTextChanged",
            "onCreate",
            "onLogin",
        ],

        methods: {
            onEmailChangeACB: function (text) {
                this.$emit("emailTextChanged", text);
            },
            onPswChangeACB: function (text) {
                this.$emit("pswTextChanged", text);
            },
            onCreateACB: function () {
                this.$emit("onCreate");
            },
            onLoginACB: function () {
                this.$emit("onLogin");
            },
        },
    }
</script>

<style scoped>
    .login {
        margin-top: 40px;
    }

    input {
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }

    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }

    p {
        margin-top: 40px;
        font-size: 13px;
    }

        p a {
            text-decoration: underline;
            cursor: pointer;
        }
</style>