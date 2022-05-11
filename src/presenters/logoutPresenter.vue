<template>
  <logOutView
    :showUserInfo="showUserInfo"
    :name="name"
    :email="email"
    :avatarInitials="avatarInitials"
    @setShowUserInfo="setShowUserInfo"
    @onLogOut="logOutACB"
  />
</template>

<script>
import emailToName from "email-to-name";
import logOutView from "@/views/logOutView.vue";
import { getAuth, signOut } from "firebase/auth";
import { mapActions } from "vuex";
export default {
  components: {
    logOutView,
  },
  data() {
    return {
      showUserInfo: false,
    };
  },
  computed: {
    email: function () {
      return this.$store.getters.getEmail;
    },
    name: function () {
      return emailToName.process(this.email);
    },
    avatarInitials: function () {
      return this.name
        .match(/(\b\S)?/g)
        .join("")
        .toUpperCase();
    },
  },
  methods: {
    ...mapActions(["clearData"]),
    logOutACB() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.clearData();
          this.textStatus = "sign out!";
          console.log("sign out");
          this.showLoggedInView = false;
          // this.setSnackbarSettings(true, "You are now logged out!");
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.textStatus = errorMessage;
          console.error("log out error: " + errorMessage);
        });
    },
    setShowUserInfo: function (value) {
      this.showUserInfo = value;
    },
  },
};
</script>
