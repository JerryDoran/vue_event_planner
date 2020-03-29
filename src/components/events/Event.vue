<template>
  <v-container>
    <v-row wrap v-if="loading">
      <v-col cols="12" class="text-sm-center">
        <v-progress-circular indeterminate color="primary" :width="5" :size="50"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row wrap v-else>
      <v-col cols="12">
        <v-card dark>
          <v-card-title class="headline">
            {{ event.title }}
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-event-details :event="event"></edit-event-details>
            </template>
          </v-card-title>
          <v-img :src="event.imageUrl"></v-img>
          <v-card-subtitle
            class="subheadline"
          >{{ event.date }} - {{ event.time }} {{ event.location }}</v-card-subtitle>
          <div>
            <edit-event-date :event="event" v-if="userIsCreator"></edit-event-date>
          </div>
          <v-card-text>{{ event.description }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text to>
              <v-icon left>mdi-file-edit-outline</v-icon>Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    event() {
      return this.$store.getters.loadedEvent(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.event.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.subheadline {
  font-size: 18px;
}
</style>