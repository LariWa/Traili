<template>

        <v-flex xs12 md7 offset-md1>
            <div class="login">
                <v-row>
                    <v-col>
                        <h3>LOG IN</h3>
                    </v-col>
                    <v-col>
                        
                        
                        <v-snackbar v-model="snackbar"
                                    :timeout="timeout">
                            {{this.textStatus}}

                            <template v-slot:action="{ attrs }">
                                <v-btn color="blue"
                                       text
                                       v-bind="attrs"
                                       @click="snackbar = false">
                                    Close
                                </v-btn>
                            </template>
                        </v-snackbar> 


                    </v-col>
                    <v-col>
                        <v-btn icon @click="onQuitACB">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-form>
                    <v-text-field type="text " placeholder="Email" @change="onEmailChangeACB"></v-text-field>
                    <v-text-field type="password" placeholder="Password" @change="onPswChangeACB"></v-text-field>
                </v-form>
                <v-btn @click="onLoginACB">Login</v-btn>
                <br />
                <v-btn @click="onCreateACB">Create</v-btn>
                <br />
                <v-btn @click="onLogOutACB">Sign out</v-btn>
            </div>
        </v-flex>

</template>

<script>

    export default {
        props: {
            textStatus: String,
        },
        data() {
            return {
                snackbar: false,
                timeout: 2000,
            };
        },
        emits: [
            "emailTextChanged",
            "pswTextChanged",
            "onCreate",
            "onLogin",
            "onQuit",
            "onLogOut",
        ],
        components: {
        },

        methods: {
            onEmailChangeACB: function (text) {
                this.$emit("emailTextChanged", text);
            },
            onPswChangeACB: function (text) {
                this.$emit("pswTextChanged", text);
            },
            onCreateACB: function () {
                this.$emit("onCreate");
                this.snackbar = false;
            },
            onLoginACB: function () {
                this.$emit("onLogin");
            },
            onLogOutACB: function () {
                this.$emit("onLogOut");
            },
            onQuitACB: function () {
                this.$emit("onQuit");
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

<!--ValidateEmail: function (text) {
                var mailformat = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/; //not working

                if (mailformat.test("emailTextChanged", text)){
                    return (true)
                }
                    alert("You have entered an invalid email address!")
                    return (false)
            }
            
            
            /*emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],*/-->