<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card dark>
          <v-card-title class="headline">{{ event.title }}</v-card-title>
          <v-img :src="event.imageUrl"></v-img>
          <v-card-subtitle class="subheadline">{{ event.date }}</v-card-subtitle>
          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum vestibulum sapien, at tempus ligula malesuada eget. Sed sollicitudin molestie auctor. Sed non ante enim. Etiam dictum libero vel mi cursus consequat. Duis nec venenatis risus, sed ornare lorem. Duis blandit odio neque, sit amet venenatis libero tristique ac.</v-card-text>
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