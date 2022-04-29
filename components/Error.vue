<template>
  <div class="text-center mt-5">
    <h1 class="text-danger">{{ error }}</h1>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  props: ["error", "message"],
};
</script>

<style scoped>
</style>