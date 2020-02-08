<template>
  <v-app>
    <nav>
      <v-app-bar app dark>
        <v-app-bar-nav-icon @click="sideNav = !sideNav" class="hidden-sm-and-up nav-item"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" class="link">
            <h1 class="title grey--text nav-item">DevEvents</h1>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            v-for="item in menuItems"
            :key="item.title"
            router
            :to="item.link"
            text
            class="btn-nav grey--text"
          >
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="sideNav" app class="drawer-color">
        <v-list>
          <v-list-item v-for="item in menuItems" :key="item.title" router :to="item.link">
            <v-list-item-icon>
              <v-icon class="white--text">{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">{{item.title}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>

    <!-- Main section -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: 'App',

  components: {},

  data: () => ({
    sideNav: false,
    menuItems: [
      { icon: 'mdi-account-supervisor', title: 'View Events', link: '/events' },
      { icon: 'mdi-calendar', title: 'Organize Event', link: '/event/new' },
      { icon: 'mdi-account', title: 'Profile', link: '/profile' },
      { icon: 'mdi-face', title: 'Sign up', link: '/signup' },
      { icon: 'mdi-lock-open', title: 'Sign in', link: '/signin' }
    ]
  })
};
</script>

<style scoped>
.link {
  text-decoration: none;
}
.nav-item {
  cursor: pointer;
}
.drawer-color {
  background: #333 !important;
}
.btn-nav {
  font-size: 11px !important;
}
</style>
