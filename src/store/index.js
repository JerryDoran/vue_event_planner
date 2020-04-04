import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedEvents: [
      // {
      //   imageUrl: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      //   id: '1',
      //   title: 'Vue.js Conference in San Diego',
      //   date: new Date(),
      //   time: null,
      //   location: 'San Diego',
      //   description: 'Awesome Vue.js talks!'
      // },
      // {
      //   imageUrl:
      //     'https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateParis_Heroshutterstock_112137761.jpg',
      //   id: '2',
      //   title: 'Javascript Expo in Paris',
      //   date: new Date(),
      //   time: null,
      //   location: 'Paris',
      //   description: 'Best Javascript conference ever!'
      // }
    ],
    user: null,
    loading: false,
    error: null,
  },

  mutations: {
    setLoadedEvents(state, payload) {
      state.loadedEvents = payload;
    },
    createEvent(state, payload) {
      state.loadedEvents.push(payload);
    },
    updateEvent(state, payload) {
      const event = state.loadedEvents.find((event) => {
        return event.id === payload.id;
      });
      if (payload.title) {
        event.title = payload.title;
      }
      if (payload.description) {
        event.description = payload.description;
      }
      if (payload.date) {
        event.date = payload.date;
      }
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
    },
  },
  actions: {
    // Load events from firestore
    loadEvents({ commit }) {
      commit('setLoading', true);
      const db = firebase.firestore();

      db.collection('events').onSnapshot((snapshot) => {
        const events = [];
        snapshot.docs.forEach((doc) => {
          const eventData = doc.data();
          const event = {
            id: doc.id,
            title: eventData.title,
            description: eventData.description,
            imageUrl: eventData.imageUrl,
            location: eventData.location,
            date: eventData.date,
            time: eventData.time,
            creatorId: eventData.creatorId,
          };
          events.push(event);
        });

        commit('setLoadedEvents', events);
        commit('setLoading', false);
      });
    },
    createEvent({ commit, getters }, payload) {
      const db = firebase.firestore();
      const event = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        creatorId: getters.user.id,
      };
      let imageUrl;
      let id;
      db.collection('events')
        .add(event)
        .then((data) => {
          id = data.id;
          console.log(id);
          return id;
        })
        .then((id) => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase
            .storage()
            .ref('events/' + id + ext)
            .put(payload.image);
        })
        .then((fileData) => {
          console.log(fileData);
          imageUrl = fileData.ref.getDownloadURL().then((url) => {
            return db
              .collection('events')
              .doc(id)
              .update({ imageUrl: url });
          });
        })
        .then(() => {
          commit('createEvent', {
            ...event,
            imageUrl: imageUrl,
            id: id,
          });
        })
        .catch((error) => console.log(error));
    },
    updateEventData({ commit }, payload) {
      commit('setLoading', true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      if (payload.time) {
        updateObj.time = payload.time;
      }
      const db = firebase.firestore();
      db.collection('events')
        .doc(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false);
          commit('updateEvent', payload);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        // .then(function success(userCredentials) {
        .then((userCredentials) => {
          commit('setLoading', false);
          const userData = userCredentials.user;
          const newUser = {
            id: userData.uid,
            registeredEvents: [],
          };

          commit('setUser', newUser);
        })
        .catch((error) => {
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
            registeredEvents: [],
          };
          // console.log(userData);
          commit('setUser', newUser);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
        });
    },
    autoSignIn({ commit }, payload) {
      let registeredEvents = [];
      commit('setUser', { id: payload.uid }, registeredEvents);
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    clearError({ commit }) {
      commit('clearError');
    },
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
      return (eventId) => {
        return state.loadedEvents.find((event) => {
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
    },
  },
  modules: {},
});
