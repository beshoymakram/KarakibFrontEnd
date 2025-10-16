
<style scoped>
.error-message {
  background-color: #f44336;
  color: white;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}
</style>


<template>
  <div class="bg-[#BFD6BF] py-8">
    <div class="overflow-hidden w-11/12 flex flex-wrap p-4 mx-auto dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
      <div class="sm:w-1/2 xs:w-full px-4 py-5 sm:p-6 sm:rounded-bl-xl sm:rounded-tl-xl xs:rounded-xl bg-[#EAF2EA] text-center text-main flex flex-col items-center justify-center">
        <img class="h-100 mx-auto" src="/public/images/login.png" alt="Login Banner">
        <h1 class="font-extrabold text-3xl text-main text-shadow-lg">Welcome to Karakib</h1>
        <p class="font-semibold text-xl">Every small act of recycling creates a cleaner tomorrow</p>
      </div>
      <div class="sm:w-1/2 xs:w-full px-4 py-5 sm:p-6 sm:rounded-br-xl sm:rounded-tr-xl xs:rounded-xl bg-white flex justify-center items-center">
              <div class="login-container w-3/5" v-if="!authStore.isAuthenticated">
        <h1 class="font-extrabold text-3xl text-main text-shadow-lg text-center mb-10">Login</h1>
            <form @submit.prevent="handleLogin" class="w-full flex flex-col items-center">
              <div class="form-group mb-5 flex justify-center w-full flex-col">
                <label class="pb-2 font-medium" for="email">Email</label>
                <input
                class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-3 py-3 rounded-lg active:border-0"
                placeholder="email@gmail.com"
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                />
              </div>

              <div class="form-group mb-5 flex justify-center w-full flex-col">
                <label class="pb-2 font-medium" for="password">Password</label>
                <input
                class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-3 py-3 rounded-lg active:border-0"
                placeholder="Password"
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                />
              </div>

              <button type="submit" :disabled="authStore.loading" class="bg-[#317C31] font-medium cursor-pointer text-white px-3 py-2 rounded-lg my-4 text-center">
                {{ authStore.loading ? 'Loading...' : 'Login' }}
              </button>
            </form>

            <p class="text-center font-medium">
              Don't have an account?
              <router-link to="/register" class="text-[#317C31]">Register here</router-link>
            </p>
          </div>
      </div>
  </div>
</div>


</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { nextTick } from 'vue';

export default {
  name: 'LoginView',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },

  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },

    mounted() {
    this.authStore.error = null;
  },

  methods: {
    async handleLogin() {
      try {
        await this.authStore.login(this.form);

        await this.$router.push('/');
        nextTick(()=>{
          this.$toast.success('Logged in successfully!');
        })
      } catch (error) {
        // console.error('Login error:', error);
        this.$toast.error(this.authStore.error)
        setTimeout(() => {
        this.authStore.error = null;
      }, 5000);
      }
    },
  },
};
</script>
