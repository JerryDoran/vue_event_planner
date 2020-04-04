<template>
  <v-dialog width="350px" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn small text color="white" v-on="on" class="ml-4 btn">Edit Time</v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="time" prepend-icon="mdi-clock" label="Enter time"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
        <v-btn text color="primary" @click="saveChanges">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- </v-row> -->
</template>

               

<script>
export default {
  props: ['event'],

  data() {
    return {
      time: '',
      dialog: false,
      menu2: false
    };
  },

  methods: {
    saveChanges() {
      this.$store.dispatch('updateEventData', {
        id: this.event.id,
        time: this.time
      });
    }
  }
};
</script>

<style scoped>
.btn {
  opacity: 0.5;
  background: grey;
  font-size: 10px;
  padding: 1px 5px !important;
}
</style>