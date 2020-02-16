<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card dark>
          <v-card-title class="headline">{{ event.title }}</v-card-title>
          <v-img :src="event.imageUrl"></v-img>
          <v-card-subtitle class="subheadline">{{ event.date }} - {{ event.location }}</v-card-subtitle>
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
    }
  }
};
</script>

<style scoped>
.subheadline {
  font-size: 18px;
}
</style>