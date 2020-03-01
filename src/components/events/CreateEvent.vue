<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="2">
        <h2 class="grey--text">Add New Event</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form @submit.prevent="createEvent">
          <v-row>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                prepend-icon="mdi-folder-outline"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                prepend-icon="mdi-pencil"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                v-model="imageUrl"
                prepend-icon="mdi-image-outline"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" offset-sm="2">
              <v-img :src="imageUrl"></v-img>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                multiline
                prepend-icon="mdi-library-books"
                :rules="[rules.required]"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    name="date"
                    label="Date"
                    id="date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    :rules="[rules.required]"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
            <!-- <v-col cols="12" sm="6" offset-sm="2">
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time"
                    label="Time"
                    prepend-icon="mdi-clock"
                    readonly
                    v-on="on"
                    :rules="[rules.required]"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="modal2" v-model="time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>-->
            <v-col cols="12" sm="6" offset-sm="2">
              <v-text-field
                name="time"
                label="Time"
                id="time"
                v-model="time"
                prepend-icon="mdi-clock"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-col cols="12" sm="6" offset-sm="2">
            <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Event</v-btn>
          </v-col>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: {
      required: value => !!value || 'Required.'
    },
    title: '',
    location: '',
    imageUrl: '',
    description: '',
    date: null,
    time: null,
    menu2: false,
    modal2: false
  }),
  computed: {
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== '' &&
        this.date !== '' &&
        this.time !== ''
      );
    }
  },
  methods: {
    createEvent() {
      if (!this.formIsValid) {
        return;
      }
      const eventData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.date,
        time: this.time
      };
      this.$store.dispatch('createEvent', eventData);
      this.$router.push('/events');
    }
  }
};
</script>

<style scoped>
</style>