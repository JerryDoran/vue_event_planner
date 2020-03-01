<template>
  <v-alert
    @input="close"
    :value="true"
    border="left"
    close-text="Close Alert"
    type="error"
    dismissible
  >{{ text }}</v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    close() {
      this.$emit('dismissed');
    }
  }
};
</script>

<style>
</style>