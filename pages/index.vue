<template>
<div>
 <b-alert 
    class="sticky" 
    variant="success" 
    :show="Boolean(message)"
    >{{ message }}
  </b-alert>
  <h1>Hello</h1>
</div> 
</template>

<script>
export default {
  middleware:["authGuard"],
 data() {
    return {
      message: "",
    };
  },
  async mounted() {
    const data = await this.$store.getters["auth/dataObj"];
    this.message = data.message;
    setTimeout(()=> {
     this.message = ""
    },2000)
  },
};
</script>

<style scoped>
.sticky {
  z-index: 10;
  width: 30%;
  position: fixed;
  top: 50px;
}
</style>

