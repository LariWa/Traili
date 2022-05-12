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
import { signout } from "../firebaseModel";
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
        signout();
    },
    setShowUserInfo: function (value) {
      this.showUserInfo = value;
    },
  },
};
</script>
