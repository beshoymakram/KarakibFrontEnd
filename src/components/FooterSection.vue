<template>
  <footer class="bg-green-50 border-t border-green-200 py-10 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
      <div class="md:col-span-2">
        <div class="flex items-center gap-2 mb-3">
          <img src="/logos/logo_horizontal.png" alt="Karakib Logo" class="w-32" />
        </div>
        <p class="text-gray-700 text-sm mb-3 leading-relaxed font-semibold">
          Karakib is an eco-friendly platform that rewards recycling and supports a sustainable future.
          <br />
          Join our mission to keep Egypt clean and green.
        </p>
        <p class="text-sm font-semibold text-gray-800">
          Email:
          <span class="font-normal text-gray-700">karakib@gmail.com</span>
        </p>
      </div>

      <div>
        <h3 class="font-semibold text-gray-900 mb-3">Karakib</h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li><RouterLink to="/about" class="hover:text-green-700">About us</RouterLink></li>
          <li><RouterLink to="/about" class="hover:text-green-700">Privacy Policy</RouterLink></li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-gray-900 mb-3">Are You a Collector?</h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li><RouterLink to="/join" class="hover:text-green-700">Join Karakib’s collectors</RouterLink></li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-gray-900 mb-3">Support & Help</h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li><RouterLink :to="{ path: '/about', hash: '#Faq' }" class="hover:text-green-700">FAQ</RouterLink></li>
          <li><RouterLink :to="{ path: '/about', hash: '#inquiry' }" class="hover:text-green-700">Send Inquiry</RouterLink></li>
          <li><RouterLink :to="{ path: '/about', hash: '#terms' }" class="hover:text-green-700">Terms & Conditions</RouterLink></li>
          <li><RouterLink :to="{ path: '/about', hash: '#contact' }" class="hover:text-green-700">Contact Us</RouterLink></li>
        </ul>

      </div>
    </div>

    <div
      class="flex flex-col md:flex-row items-center justify-between mt-10 border-t border-green-200 pt-6 text-sm text-gray-700"
    >
      <p class="mb-4 md:mb-0">
        &copy; {{ currentYear }} Karakib. All rights reserved.
      </p>
      <div class="flex items-center space-x-4">
        <p class="font-semibold">Follow Karakib on social media</p>
        <div class="flex space-x-3 text-green-800 text-xl">
          <a href="#" target="_blank" aria-label="Facebook" class="hover:text-green-600 transition">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
          <a href="#" target="_blank" aria-label="Instagram" class="hover:text-green-600 transition">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
          <a href="#" target="_blank" aria-label="LinkedIn" class="hover:text-green-600 transition">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
          <a href="#" target="_blank" aria-label="Twitter" class="hover:text-green-600 transition">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </a>
          <a href="#" target="_blank" aria-label="WhatsApp" class="hover:text-green-600 transition">
            <font-awesome-icon :icon="['fab', 'whatsapp']" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>


<style scoped>
</style>
