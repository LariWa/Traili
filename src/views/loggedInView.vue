<template>
  <v-navigation-drawer
    absolute
    temporary
    style="height: auto"
    :value="showLoggedInView"
    @input="updateShowLoggedInACB"
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
</template>
<script>
export default {
  props: {
    showLoggedInView: Boolean,
    name: String,
    email: String,
    avatarInitials: String,
  },
  emits: ["showLoggedInView", "onLogOut"],
  methods: {
    updateShowLoggedInACB: function (value) {
      this.$emit("showLoggedInView", value);
    },
    onLogOutACB: function () {
      this.$emit("onLogOut");
    },
  },
};
</script>
