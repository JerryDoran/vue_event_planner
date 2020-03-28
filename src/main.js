import Vue from 'vue';
import App from './App.vue';
import * as firebase from 'firebase';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import DateFilter from './filters/date';
import Alert from './components/shared/Alert';
import EditEventDetailsDialog from './components/events/edit/EditEventDetailsDialog.vue';
import EditEventDateDialog from './components/events/edit/EditEventDateDialog.vue';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', Alert);
Vue.component('edit-event-details', EditEventDetailsDialog);
Vue.component('edit-event-date', EditEventDateDialog);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDZDI6QmPU--SUiSEMYGYeKzu9zyAIP0Ao',
      authDomain: 'event-planner-bc9c2.firebaseapp.com',
      databaseURL: 'https://event-planner-bc9c2.firebaseio.com',
      projectId: 'event-planner-bc9c2',
      storageBucket: 'event-planner-bc9c2.appspot.com'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });

    this.$store.dispatch('loadEvents');
  }
}).$mount('#app');
