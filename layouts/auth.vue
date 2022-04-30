<template>
  <div>
    <alert-app :message="message || messs" :alert="alert"/>
    <navbar-app />
    <div class="container w-50 mt-5">
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavbarApp from "@/components/Navbar.vue";
import AlertApp from "@/components/Alert.vue";
export default {
  name:"auth",
  components: {
    NavbarApp,
    AlertApp,
  },
  data() {
    return {
      message: "",
      alert:""
    };
  },
  computed:{
    messs(){
    const data = this.$store.getters["auth/dataObj"];
    const { message } = this.$route.query;
    if(message === "created"){
       this.message = data.message;
       this.alert = "alert-success"
       setTimeout(() => {
         this.message = "";
         this.alert = ""
    }, 2000);
    }
    }
  },
  created() {
    const data = this.$store.getters["auth/dataObj"];
    const { message } = this.$route.query;
    if (message === "logout"){
      this.message = "Bы успешно вышли из систему";
      this.alert = "alert-info"
    }       
    if (message === "session"){
       this.message = "Время сессии истекло, пожалуйста зайдите заного";
       this.alert = "alert-warning"
    }      
    if(!message && !data.message){
       this.message = 'Для начала войдите в систему'
       this.alert = "alert-info"
    }
    // this.$router.push('/auth/login')
    setTimeout(() => {
      this.message = "";
      this.alert = ""
    }, 2000);
  },
};
</script>

<style scoped>
</style>

