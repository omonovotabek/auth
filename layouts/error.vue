<template>
  <div>
    <div v-if="notPage"><app-error :error="notPage" /></div>
    <div v-if="badRequest"><app-error :error="badRequest" :message="error" /></div>
    <div v-if="serverError"><app-error :error="serverError" /></div>
    <div v-if="networkError"><app-error :error="networkError" /></div>
  </div>
</template>

<script>
import AppError from "@/components/Error.vue";
export default {
  layout: "empty",
  components: { AppError },
  data() {
    return {
      error:'',
      notPage: "",
      badRequest: "",
      serverError: "",
      networkError: "",
    };
  },

   created() {
    const path = this.$route.path;
    const error = this.$route.query;
    if (path === "/serverError") {
      this.serverError = "Server Error 500";
    } 
    else if (error) {
      this.badRequest = "badRequest";
      this.error = error.message
      this.$router.push('/badRequest')
    }
     else if (path === "/") {
      this.networkError = "Network Error Please check your internet connection.";
    } else {
      this.notPage = "Not Page";
    }
  
  },
};
</script>