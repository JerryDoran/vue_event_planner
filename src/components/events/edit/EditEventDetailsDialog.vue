<template>
  <v-dialog width="350px" persistent>
    <template v-slot:activator="{ on }">
      <v-btn fab small color="primary" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style scoped>
</style>