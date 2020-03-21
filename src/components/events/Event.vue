<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card dark>
          <v-card-title class="headline">
            {{ event.title }}
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-event-details></edit-event-details>
            </template>
          </v-card-title>
          <v-img :src="event.imageUrl"></v-img>
          <v-card-subtitle
            class="subheadline"
          >{{ event.date | date}} - {{ event.time }} {{ event.location }}</v-card-subtitle>
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
    }
  }
};
</script>

<style scoped>
.subheadline {
  font-size: 18px;
}
</style>