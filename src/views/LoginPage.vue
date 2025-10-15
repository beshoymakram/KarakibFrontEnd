
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
  <div class="login-container" v-if="!authStore.isAuthenticated">
    <h2>Login</h2>

    <div v-if="authStore.error" class="error-message">
      {{ authStore.error }}
    </div>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
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
