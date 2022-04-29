<template>
  <div>
    <navbar-app />
    <div class="container w-50 mt-5">
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavbarApp from "@/components/Navbar.vue";
export default {
  components: {
    NavbarApp,
  },
};
</script>

<style scoped>
</style>

