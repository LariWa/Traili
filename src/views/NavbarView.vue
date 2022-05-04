<template>
  <div>
    <v-app-bar class="nav-bar" app color="primary" dark>
      <v-toolbar-title class="nav-bar-title" @click="goToExplore"
        ><img src="../assets/logo.svg" />Traili</v-toolbar-title
      ><v-spacer></v-spacer>
      <v-btn icon @click="goToSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="goToFavourites">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon @click="getLoggedIn">
        <v-icon>mdi-account-circle </v-icon>
      </v-btn>
      
      <div v-if="showDropdown" class="sign-out-dropdown">
        <v-card>
          <v-navigation-drawer permanent expand-on-hover>
            <v-list-item link>
              <v-list-item-content>
                {{ userEmail }}
                <br/>
                <v-btn @click="onLogOutACB">Sign out</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-navigation-drawer>
        </v-card>
      </div>

    </v-app-bar>
  </div>
</template>
<script>


export default {
  name: "NavbarView",
  emits: ["toLogin", "toSearch", "toFav", "onLogOut"],
  data: function () {
    return {
      showDropdown: false,
    }
  },

  computed: {
    userEmail: function() {
      console.log(" userEmail " + this.$store.state.userEmail);
      return this.$store.state.userEmail;
    }
  },

  methods: {
    goToFavourites: function () {
      this.$emit("toFav");
    },
    goToSearch: function () {
      this.$emit("toSearch");
    },
    goToLogin: function () {
      this.$emit("toLogin");
    },   
    getLoggedIn: function () {
      var loggedIn = this.$store.state.loggedIn;

      if (!loggedIn) {
        this.goToLogin();
        
      }
      else {
        this.showDropdown = true;
      }
    },
    onLogOutACB: function () {
      this.$emit("onLogOut");
      this.showDropdown = false;
    },   
    goToExplore: function () {
      this.$emit("toExplore");
    },
  },
};
</script>

<!--<style scoped>
  .sign-out-dropdown{
    
  }

</style>-->
<!--<v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-icon></v-icon>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ userEmail }}
              <br/>
              <v-btn @click="onLogOutACB">Sign out</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>-->

        <!--<v-card>
          <v-btn @click="onLogOutACB">Sign out</v-btn>
          <br/>
          {{ userEmail }}
        </v-card>-->