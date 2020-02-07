<template>
  <v-app>
    <nav>
      <v-app-bar app dark>
        <v-app-bar-nav-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <h1 class="title grey--text">DevEvents</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn text class="btn-nav grey--text">
            <v-icon left>mdi-account</v-icon>View Events
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="sideNav" app class="drawer-color">
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon class="white--text">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">View Events</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: 'App',

  components: {},

  data: () => ({
    sideNav: false
  })
};
</script>

<style scoped>
.drawer-color {
  background: #333 !important;
}
.btn-nav {
  font-size: 11px !important;
}
</style>
