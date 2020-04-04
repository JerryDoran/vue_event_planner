<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="text-center text-sm-right">
          <v-btn large router to="/events" color="primary">Explore Events</v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="text-center text-sm-left">
          <v-btn large router to="/event/new" color="primary">Organize Event</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-sm-center">
          <v-progress-circular indeterminate color="primary" :width="5" :size="50" v-if="loading"></v-progress-circular>
        </v-col>
      </v-row>
      <v-row class="mt-2" v-if="!loading">
        <v-col cols="12">
          <v-carousel class="carousel">
            <v-carousel-item
              v-for="event in events"
              :key="event.id"
              :src="event.imageUrl"
              reverse-transition="fade-transition"
              transition="fade-transition"
              @click="loadEvent(event.id)"
            >
              <div class="title">{{event.title}}</div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <p>Join these world class events</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({}),
  methods: {
    loadEvent(id) {
      this.$router.push('/events/' + id);
    }
  },
  computed: {
    events() {
      return this.$store.getters.featuredEvents;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  components: {}
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 7px;
  border-radius: 10px;
  margin-left: 10px;
}
.carousel:hover {
  cursor: pointer;
}
</style>
