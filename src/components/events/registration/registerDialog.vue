<template>
  <v-dialog persistent v-model="registerDialog">
    <template v-slot:activator="{ on }">
      <v-btn small color="primary" v-on="on" class="ml-4 btn">
        <v-icon left>mdi-file-edit-outline</v-icon>
        {{ userIsRegistered ? 'Unregister' : 'Register' }}
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <!-- <v-card-title v-if="userIsRegistered">Unregister from Event?</v-card-title>
            <v-card-title v-else>Register for Event?</v-card-title>-->
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card-text>You can always change your decision later</v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card-actions>
              <v-btn class="red--text darken-1" text @click="registerDialog=false">Cancel</v-btn>
              <v-btn class="green--text darken-1" text @click="agree">Confirm</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['eventId'],
  data() {
    return {
      registerDialog: false
    };
  },

  methods: {
    agree() {}
  }
};
</script>

<style scoped>
</style>
