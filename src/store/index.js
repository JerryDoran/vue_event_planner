import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedEvents: [
      {
        imageUrl: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        id: '1',
        title: 'Vue.js Conference in San Diego',
        date: new Date(),
        time: null,
        location: 'San Diego',
        description: 'Awesome Vue.js talks!'
      },
      {
        imageUrl:
          'https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateParis_Heroshutterstock_112137761.jpg',
        id: '2',
        title: 'Javascript Expo in Paris',
        date: new Date(),
        time: null,
        location: 'Paris',
        description: 'Best Javascript conference ever!'
      }
    ],
    user: null,
    loading: false,
    error: null
  },

  mutations: {
    setLoadedEvents(state, payload) {
      state.loadedEvents = payload;
    },
    createEvent(state, payload) {
      state.loadedEvents.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      // payload should be 'true' or 'false'
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    // Load events from firestore
    loadEvents({ commit }) {
      commit('setLoading', true);
      const db = firebase.firestore();

      db.collection('events').onSnapshot(snapshot => {
        const events = [];
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const eventData = change.doc.data();
            const event = {
              id: change.doc.id,
              title: eventData.title,
              description: eventData.description,
              imageUrl: eventData.imageUrl,
              date: eventData.date
            };
            events.push(event);
          }
        });
        commit('setLoadedEvents', events);
        commit('setLoading', false);
      });
    },
    createEvent({ commit }, payload) {
      const db = firebase.firestore();
      const event = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        time: payload.time
      };
      // commit('createEvent', event);

      db.collection('events')
        .add(event)
        .then(data => {
          const id = data.id;
          console.log(id);
          commit('createEvent', {
            ...event,
            id: id
          });
        })
        .catch(error => console.log(error));
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        // .then(function success(userCredentials) {
        .then(userCredentials => {
          commit('setLoading', false);
          const userData = userCredentials.user;
          const newUser = {
            id: userData.uid,
            registeredEvents: []
          };
          console.log(newUser.id);
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(function success(userCredentials) {
          commit('setLoading', false);
          const userData = userCredentials.user;
          const newUser = {
            id: userData.uid,
            registeredEvents: []
          };
          // console.log(userData);
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    clearError({ commit }) {
      commit('clearError');
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
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  },
  modules: {}
});
