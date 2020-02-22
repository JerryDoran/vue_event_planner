import Vue from 'vue';
import App from './App.vue';
import * as firebase from 'firebase';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import DateFilter from './filters/date';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);

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
  }
}).$mount('#app');
