<template>
  <div>
    <v-btn icon @click="setShowUserInfoACB(true)">
      <v-icon>mdi-account-circle </v-icon>
    </v-btn>
    <v-navigation-drawer
      absolute
      temporary
      style="height: auto; top: 64px"
      :value="showUserInfo"
      @input="setShowUserInfoACB"
      right
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar color="#033">
            <span class="white--text text-h5">{{ avatarInitials }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <div class="text-center">
        <v-btn @click="onLogOutACB">Sign out</v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  props: {
    showUserInfo: Boolean,
    name: String,
    email: String,
    avatarInitials: String,
  },
  emits: ["showLoggedInView", "onLogOut"],
  methods: {
    setShowUserInfoACB: function (value) {
      this.$emit("setShowUserInfo", value);
    },
    onLogOutACB: function () {
      this.$emit("onLogOut");
    },
  },
};
</script>
