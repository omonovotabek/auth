<template>
  <div>
    <alert-app :message="message" :alert="alert" />
    <div class="w-100 d-flex">
      <nav class="d-flex" style="width: 18%">
        <aside class="w-100">
          <aside-app />
        </aside>
        <span></span>
      </nav>
      <main style="width: 75%" class="container">
        <nuxt />
      </main>
    </div>
  </div>
</template>


<script>
import AsideApp from "@/components/Aside.vue";
import AlertApp from "@/components/Alert.vue";
export default {
  components: {
    AsideApp,
    AlertApp,
  },
  data() {
    return {
      message: "",
      alert:""
    };
  },
  created(){
    const data = this.$store.getters["auth/dataObj"];
       this.message = data.message;
       this.alert = "alert-success"
       setTimeout(() => {
         this.message = "";
         this.alert = ""
    }, 2000);

  },

};
</script>

<style scoped>
span {
  background-color: rgb(119, 119, 119);
  width: 2px;
  height: 100vh;
}
</style>
