<template>
  <v-dialog width="350px" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn small color="primary" v-on="on" class="ml-4 btn">Edit Date</v-btn>
    </template>
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
      <v-btn text color="primary" @click="saveChanges">OK</v-btn>
    </v-date-picker>
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
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      this.date = `${month}/${day}/${year}`;
    },
    saveChanges() {
      // const newDate = new Date(this.event.date);
      // const newDay = new Date(this.date).getUTCDate();
      // const newMonth = new Date(this.date).getUTCMonth();
      // const newYear = new Date(this.date).getUTCFullYear();

      // newDate.setUTCDate(newDay);
      // newDate.setUTCMonth(newMonth);
      // newDate.setUTCFullYear(newYear);

      this.$store.dispatch('updateEventData', {
        id: this.event.id,
        date: this.date
      });
    }
  },
  created() {
    this.editableDate = new Date(this.event.date);
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