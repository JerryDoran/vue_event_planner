<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="2">
        <h2 class="grey--text">Add New Event</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-text-field
                name="title"
                label="Title"
                id="title"
                prepend-icon="mdi-folder-outline"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-text-field
                name="location"
                label="Location"
                id="location"
                prepend-icon="mdi-pencil"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                prepend-icon="mdi-image-outline"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="2">
              <img scr />
            </v-col>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-textarea
                name="description"
                label="Description"
                id="description"
                multiline
                prepend-icon="mdi-library-books"
                :rules="[rules.required]"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="2">
              <v-text-field
                name="title"
                label="Title"
                id="title"
                prepend-icon="mdi-folder-outline"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
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
    }
  })
};
</script>

<style scoped>
</style>