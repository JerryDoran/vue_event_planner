<template>
  <div>
    <v-container>
      <v-row v-for="event in events" :key="event.id">
        <v-col cols="12" sm="10" md="8" offset-sm="1" offset-md="2">
          <v-card color="#385F73" dark>
            <v-container fluid>
              <v-row>
                <v-col cols="5" sm="6">
                  <v-img :src="event.imageUrl" height="200px"></v-img>
                </v-col>
                <v-col cols="7" sm="6">
                  <v-card-title class="subheadline">{{ event.title }}</v-card-title>
                  <v-card-subtitle>{{ event.date | date }}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn text :to="'/events/' + event.id">
                      <v-icon left>mdi-arrow-right</v-icon>View Information
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  /* eslint-disable */
  name: 'Events',
  computed: {
    events() {
      return this.$store.getters.loadedEvents;
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
