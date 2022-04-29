<template>
  <div>
    <b-alert 
    class="sticky" 
    :variant="alert" 
    :show="Boolean(message)"
    >{{ message }}</b-alert
    >
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <form @submit.prevent="onSubmit">
        <div class="card">
          <div class="card-body">
            <p class="mb-2 display-3">Войти в система</p>
            <ValidationProvider
              rules="required|min:3|email"
              v-slot="{ errors, valid }"
            >
              <label for="email" class="mt-3">Email</label>
              <b-form-input
                @keydown.space.prevent
                @keyup="emailCheck"
                :state="errors[0] || setErrorEmail ? false : valid ? true : null"
                id="email"
                v-model="form.email"
              />
              <b-form-invalid-feedback>
                {{
                  errors[0] ? errors[0].replace("{field}", "") : setErrorEmail
                }}
              </b-form-invalid-feedback>
            </ValidationProvider>

            <ValidationProvider
              rules="required|min:3|max:10"
              v-slot="{ errors, valid }"
            >
              <label for="password" class="mt-3">Парол</label>
              <b-form-input
                type="password"
                @keydown.space.prevent
                @keyup="passwordCheck"
                :state="errors[0] || setErrorPassword ? false : valid ? true : null"
                id="password"
                v-model="form.password"
              />
              <b-form-invalid-feedback>
                {{
                  errors[0] ? errors[0].replace("{field}", "") : setErrorPassword
                }}
              </b-form-invalid-feedback>
            </ValidationProvider>
          </div>
          <div class="card-footer">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="invalid || Boolean(setErrorEmail || setErrorPassword)"
            >
              Создать
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      alert:"",
      setErrorEmail: "",
      setErrorPassword: "",
      submitError: "",
      submitFormEmail: "",
      submitFormPassword: "",
      form: {
        email: "",
        password: "",
      },
      message: "",
    };
  },
  async mounted() {
    const { message } = this.$route.query;
    const data = await this.$store.getters["auth/dataObj"];
    if (data.message){
      this.message = data.message;
      this.alert = "success"
    } 
    else {
      this.message = "Для начала войдите в систему";
      this.alert = "info"
    }
    if (message === "logout"){
      this.message = "Вы успешно вышли из систему";
      this.alert = "success"
    } 
    if (message === "session"){
      this.message = "Время сессии истекло, пожалуйста зайдите заного";
      this.alert = "warning"
    }      
    setTimeout(() => {
      this.message = "";
    }, 2000);
  },
  methods: {
    emailCheck() {
      if (this.submitFormEmail === this.form.email)
        this.setErrorEmail = this.submitError;
      if (this.setErrorEmail && !(this.submitFormEmail === this.form.email))
        this.setErrorEmail = "";
    },
    passwordCheck() {
      if (this.submitFormPassword === this.form.password)
        this.setErrorPassword = this.submitError;
      if (this.setErrorPassword && !(this.submitFormPassword === this.form.password))
        this.setErrorPassword = "";
    },
    async onSubmit() {
      const formData = {
        email: this.form.email,
        password: this.form.password,
      };
      const data = await this.$store.dispatch("auth/login", formData);
      if (data.type === "error-1") {
        this.submitFormPassword = "";
        this.submitError = "";
        this.setErrorEmail = data.message;
        this.submitError = data.message;
        this.submitFormEmail = this.form.email;
      }
      if (data.type === "error-2") {
        this.submitFormEmail = "";
        this.submitError = "";
        this.setErrorPassword = data.message;
        this.submitError = data.message;
        this.submitFormPassword = this.form.password;
      }
      if (data.type === "success") this.$router.push("/");
    },
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