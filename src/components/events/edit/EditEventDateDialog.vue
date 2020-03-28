<template>
  <v-dialog width="350px" persistent v-model="dialog" :return-value.sync="date">
    <template v-slot:activator="{ on }">
      <v-btn small color="primary" v-on="on" class="ml-4">Edit Date</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row wrap>
          <v-col cols="12">
            <v-card-title>Edit Event Date</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row wrap>
          <v-col cols="12">
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
              <v-btn text color="primary" @click="saveChanges">OK</v-btn>
            </v-date-picker>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['event'],

  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dialog: false,
      editableDate: null,
      menu2: false
    };
  },
  methods: {
    saveChanges() {
      const newDate = new Date(this.event.date);
      const newDay = new Date(this.date).getUTCDate();
      const newMonth = new Date(this.date).getUTCMonth();
      const newYear = new Date(this.date).getUTCFullYear();

      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);

      this.$store.dispatch('updateEventData', {
        id: this.event.id,
        date: newDate
      });
    }
  },
  created() {
    this.editableDate = new Date(this.event.date);
  }
};
</script>

<style scoped>
</style>