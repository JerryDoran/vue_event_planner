<template>
  <v-dialog width="350px" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn fab small color="primary" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row wrap>
          <v-col cols="12">
            <v-card-title>Edit Event</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row wrap>
          <v-col cols="12">
            <v-card-text>
              <v-text-field name="title" label="Title" id="title" v-model="editedTitle"></v-text-field>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                multiline
                v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="saveChanges">Save</v-btn>
            </v-card-actions>
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
      dialog: false,
      editedTitle: this.event.title,
      editedDescription: this.event.description
    };
  },
  methods: {
    saveChanges() {
      if (
        this.editedTitle.trim() === '' ||
        this.editedDescription.trim() === ''
      )
        return;
      this.dialog = false;
      this.$store.dispatch('updateEventData', {
        id: this.event.id,
        title: this.editedTitle,
        description: this.editedDescription
      });
    }
  }
};
</script>

<style scoped>
</style>