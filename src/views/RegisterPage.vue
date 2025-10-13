
<style scoped>
.register-container {
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

.form-group input,
.form-group select {
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
  <div class="register-container">
    <h2>Register</h2>

    <div v-if="authStore.error" class="error-message">
      {{ authStore.error }}
    </div>

    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
        />
      </div>

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
        <label for="phone">Phone:</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          required
        />
      </div>

      <div class="form-group">
        <label for="type">Register as:</label>
        <select id="type" v-model="form.type" required>
          <option value="user">User</option>
          <option value="courier">Courier</option>
        </select>
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

      <div class="form-group">
        <label for="password_confirmation">Confirm Password:</label>
        <input
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          required
        />
      </div>

      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'Loading...' : 'Register' }}
      </button>
    </form>

    <p>
      Already have an account?
      <router-link to="/login">Login here</router-link>
    </p>
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
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
  },
};
</script>
