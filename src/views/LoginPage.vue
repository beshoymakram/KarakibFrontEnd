
<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  background-color: #f44336;
  color: white;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}
</style>


<template>
  <div class="bg-[#BFD6BF]">
    <div class="overflow-hidden w-11/12 flex flex-wrap p-4 mx-auto dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
      <div class="sm:w-1/2 xs:w-full px-4 py-5 sm:p-6 sm:rounded-bl-xl sm:rounded-tl-xl xs:rounded-xl bg-[#EAF2EA] text-center text-main">
        <img class="h-100 mx-auto" src="/public/images/login.png" alt="Login Banner">
        <h1 class="font-extrabold text-3xl text-main text-shadow-lg">Welcome to Karakib</h1>
        <p class="font-semibold text-xl">Every small act of recycling creates a cleaner tomorrow</p>
      </div>
      <div class="sm:w-1/2 xs:w-full px-4 py-5 sm:p-6 sm:rounded-br-xl sm:rounded-tr-xl xs:rounded-xl bg-white">
              <div class="login-container" v-if="!authStore.isAuthenticated">
        <h1 class="font-extrabold text-3xl text-main text-shadow-lg text-center">Login</h1>

            <div v-if="authStore.error" class="error-message">
              {{ authStore.error }}
            </div>

            <form @submit.prevent="handleLogin">
              <div class="form-group mb-25">
                <label for="email">Email</label>
                <input
                class="shadow-xl border-0"
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                />
              </div>

              <div class="form-group mb-25">
                <label for="password">Password</label>
                <input
                class="shadow-xl border-0"
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                />
              </div>

              <button type="submit" :disabled="authStore.loading">
                {{ authStore.loading ? 'Loading...' : 'Login' }}
              </button>
            </form>

            <p>
              Don't have an account?
              <router-link to="/register">Register here</router-link>
            </p>
          </div>
      </div>
  </div>
</div>


</template>

<script>
import { useAuthStore } from '@/stores/auth';

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

  methods: {
    async handleLogin() {
      try {
        await this.authStore.login(this.form);
        this.$router.push('/');
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  },
};
</script>
