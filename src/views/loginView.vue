<template>
  <div class="text-center">
    <v-dialog :value="showLogInPopUp" @input="updateShowLogIn" width="500">
      <template v-slot:activator="{ attrs }">
        <v-btn icon v-bind="attrs" @click="updateShowLogIn(true)">
          <v-icon>mdi-account-circle </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Login/SignUp
          <v-spacer></v-spacer>
          <v-btn icon @click="updateShowLogIn(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              type="text "
              label="Email"
              :value="email"
              :rules="emailRules"
              required
              @change="onEmailChangeACB"
            ></v-text-field>
            <v-text-field
              type="password"
              label="Password"
              :value="password"
              :counter="6"
              :rules="passwordRules"
              required
              @change="onPswChangeACB"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <div v-if="errorAlert">
          <v-alert type="error">
            {{ errorAlert }}
          </v-alert>
        </div>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="onLoginACB">Login</v-btn>
          <v-btn @click="onCreateACB">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showLogInPopUp: Boolean,
    email: String,
    emailRules: Array,
    password: String,
    passwordRules: Array,
    errorAlert: String,
  },
  emits: [
    "emailTextChanged",
    "pswTextChanged",
    "onCreate",
    "onLogin",
    "onQuit",
    "setShowLogIn",
  ],
  methods: {
    updateShowLogIn(value) {
      this.$emit("setShowLogIn", value);
    },
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
    onQuitACB: function () {
      this.$emit("onQuit");
    },
  },
};
</script>
