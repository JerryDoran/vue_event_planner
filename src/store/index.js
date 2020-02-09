import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedEvents: [
      {
        imageUrl: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        id: '1',
        title: 'Vue.js Conference in San Diego',
        date: '2020-02-25'
      },
      {
        imageUrl:
          'https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateParis_Heroshutterstock_112137761.jpg',
        id: '2',
        title: 'Javascript Expo in Paris',
        date: '2020-02-10'
      }
    ]
  },
  user: {
    id: `123`,
    registeredEvents: ['1']
  },
  mutations: {},
  actions: {},
  getters: {
    loadedEvents(state) {
      return state.loadedEvents.sort((eventA, eventB) => {
        return eventA.date > eventB.date;
      });
    },
    featuredEvents(state, getters) {
      return getters.loadedEvents.slice(0, 5);
    },
    loadedEvent(state) {
      return eventId => {
        return state.loadedEvents.find(event => {
          return event.id === eventId;
        });
      };
    }
  },
  modules: {}
});
