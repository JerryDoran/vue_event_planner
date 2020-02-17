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
        date: new Date(),
        location: 'San Diego',
        description: 'Awesome Vue.js talks!'
      },
      {
        imageUrl:
          'https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateParis_Heroshutterstock_112137761.jpg',
        id: '2',
        title: 'Javascript Expo in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'Best Javascript conference ever!'
      }
    ]
  },
  user: {
    id: `123`,
    registeredEvents: ['1']
  },
  mutations: {
    createEvent(state, payload) {
      state.loadedEvents.push(payload);
    }
  },
  actions: {
    createEvent({ commit }, payload) {
      const event = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'dkjfkdjk'
      };
      // Reach out to Firebase and store event
      commit('createEvent', event);
    }
  },
  getters: {
    loadedEvents(state) {
      return state.loadedEvents.sort((eventA, eventB) => {
        // This will return a true or false value
        return eventA.date > eventB.date;
      });
    },
    featuredEvents(state, getters) {
      return getters.loadedEvents.slice(0, 5);
    },
    loadedEvent(state) {
      return eventId => {
        return state.loadedEvents.find(event => {
          // This will return a true or false value
          return event.id === eventId;
        });
      };
    }
  },
  modules: {}
});
