
<style scoped>
/* .register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.form-group mb-5 flex justify-center w-full flex-col {
  margin-bottom: 15px;
}

.form-group mb-5 flex justify-center w-full flex-col label {
  display: block;
  margin-bottom: 5px;
}

.form-group mb-5 flex justify-center w-full flex-col input,
.form-group mb-5 flex justify-center w-full flex-col select {
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
} */

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
        <img class="h-100 mx-auto" src="/public/images/register.png" alt="Login Banner">
        <h1 class="font-extrabold text-3xl text-main text-shadow-lg">Welcome to Karakib</h1>
        <p class="font-semibold text-xl">Every small act of recycling creates a cleaner tomorrow</p>
      </div>
      <div class="sm:w-1/2 xs:w-full px-4 py-5 sm:p-6 sm:rounded-br-xl sm:rounded-tr-xl xs:rounded-xl bg-white flex justify-center items-center">

  <div class="register-container w-3/5">
    <h1 class="font-extrabold text-3xl text-main text-shadow-lg text-center mb-10">Register</h1>

    <div v-if="authStore.error" class="error-message">
      {{ authStore.error }}
    </div>

    <form @submit.prevent="handleRegister" class="w-full flex flex-col items-center">
      <div class="form-group mb-5 flex justify-center w-full flex-col">
        <label class="pb-2 font-medium" for="name">Name</label>
        <input
        class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-3 py-3 rounded-lg active:border-0"
        placeholder="Full Name"
          id="name"
          v-model="form.name"
          type="text"
          required
        />
      </div>

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
        <label class="pb-2 font-medium" for="phone">Phone</label>
        <input
        class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-3 py-3 rounded-lg active:border-0"
        placeholder="Phone"
          id="phone"
          v-model="form.phone"
          type="tel"
          required
        />
      </div>

      <!-- <div class="form-group mb-5 flex justify-center w-full flex-col">
        <label class="pb-2 font-medium" for="type">Register as</label>
        <select id="type" v-model="form.type" required class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-3 py-3 rounded-lg active:border-0">
          <option value="user">User</option>
          <option value="courier">Courier</option>
        </select>
      </div> -->

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

      <div class="form-group mb-5 flex justify-center w-full flex-col">
        <label class="pb-2 font-medium" for="password_confirmation">Confirm Password</label>
        <input
        class="shadow-[0_10px_20px_5px_rgba(0,0,0,0.1)] border-0 px-3 py-3 rounded-lg active:border-0"
        placeholder="Password Confirmation"
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          required
        />
      </div>

      <button type="submit" :disabled="authStore.loading" class="bg-[#317C31] font-medium cursor-pointer text-white px-3 py-2 rounded-lg my-4 text-center">
        {{ authStore.loading ? 'Loading...' : 'Register' }}
      </button>
    </form>

    <p class="text-center font-medium">
      Already have an account?
      <router-link to="/login" class="text-[#317C31]">Login here</router-link>
    </p>
  </div>
  </div>
    </div>
</div>


</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'RegisterPage',

  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        type: 'user',
        password: '',
        password_confirmation: '',
      },
    };
  },

  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },

  methods: {
    async handleRegister() {
      try {
        await this.authStore.register(this.form);
        this.$router.push('/');
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
  },
};
</script>
