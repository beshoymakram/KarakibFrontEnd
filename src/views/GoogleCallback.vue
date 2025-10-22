<template>
  <div class="min-h-screen flex items-center justify-center bg-[#BFD6BF]">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-[#317C31] mx-auto mb-4"></div>
      <p class="text-xl font-semibold text-[#317C31]">Completing authentication...</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import authService from '@/services/authService';

export default {
  name: 'AuthCallback',

  mounted() {
    this.handleCallback();
  },

  methods: {
    async handleCallback() {
      const token = this.$route.query.token;
      const userString = this.$route.query.user;
      const error = this.$route.query.error;

      if (error) {
        this.$router.push('/login');
        setTimeout(() => {
          this.$toast.error(decodeURIComponent(error));
        }, 100);
        return;
      }

      if (token && userString) {
        try {
          const user = JSON.parse(decodeURIComponent(userString));

          // Use authService to save (consistent with your app)
          authService.saveAuthData(token, user);

          // Update stores
          const authStore = useAuthStore();
          authStore.token = token;
          authStore.user = user;

          const cartStore = useCartStore();
          await cartStore.mergeOnLogin();

          await this.$router.push('/');

          setTimeout(() => {
            this.$toast.success('Successfully logged in with Google!');
          }, 100);
        } catch (err) {
          console.error('Auth callback error:', err);
          this.$toast.error('Authentication failed. Please try again.');
          this.$router.push('/login');
        }
      } else {
        this.$toast.error('Invalid authentication response');
        this.$router.push('/login');
      }
    },
  },
};
</script>
