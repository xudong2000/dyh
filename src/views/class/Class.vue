<template>
  <div id="class"></div>
</template>

<script>
export default {
  name: "Class",
  created() {
    this.$store.dispatch("email/aGetEmailData");
  },
  methods: {},
};
</script>

<style scoped>
#class {
  width: 100%;
  height: auto;
  background-color: #fff;
}
</style>