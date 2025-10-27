<template>
  <footer class="bg-primary border-green-200 py-10 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
      <div class="md:col-span-2">
        <div class="flex items-center gap-2 mb-3">
          <img src="/logos/logo_horizontal.png" alt="Karakib Logo" class="w-32" />
        </div>
        <p class="text-section text-sm mb-3 leading-relaxed font-semibold">
          {{ $t('common.karakibIsEcoFriendlyPlatformFooter') }}
        </p>
        <p class="text-sm font-semibold text-section">
          {{ $t('common.emailLabel') }}
          <span class="font-normal text-section">karakib@gmail.com</span>
        </p>
      </div>

      <div>
        <h3 class="font-semibold text-[#2C702C] mb-3">{{ $t('common.karakib') }}</h3>
        <ul class="space-y-1 text-sm text-section">
          <li>
            <RouterLink to="/about" class="hover:text-green-700">{{ $t('common.aboutUs') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="hover:text-green-700">{{ $t('common.privacyPolicy') }}</RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-[#2C702C] mb-3">{{ $t('common.areYouACollector') }}</h3>
        <ul class="space-y-1 text-sm text-section">
          <li>
            <RouterLink to="/join" class="hover:text-green-700">{{ $t('common.joinKarakibCollectors') }}</RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-[#2C702C] mb-3">{{ $t('common.supportHelp') }}</h3>
        <ul class="space-y-1 text-sm text-section">
          <li>
            <RouterLink :to="{ path: '/about', hash: '#Faq' }" class="hover:text-green-700">{{ $t('common.faq') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ path: '/about', hash: '#inquiry' }" class="hover:text-green-700">{{
              $t('common.sendInquiry') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ path: '/about', hash: '#terms' }" class="hover:text-green-700">{{
              $t('common.termsConditions') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ path: '/about', hash: '#contact' }" class="hover:text-green-700">{{
              $t('common.contactUs') }}</RouterLink>
          </li>
        </ul>

      </div>
    </div>

    <div
      class="flex flex-col md:flex-row items-center justify-between mt-10 border-t border-green-200 pt-6 text-sm text-section">
      <p class="mb-4 md:mb-0">
        &copy; {{ currentYear }} {{ $t('common.karakib') }}. {{ $t('common.allRightsReserved') }}
      </p>
      <div class="flex items-center space-x-4">
        <p class="font-semibold">{{ $t('common.followKarakibOnSocialMedia') }}</p>
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
.text-primary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}

.bg-primary {
  background-color: rgb(235, 255, 235) !important;
}
[data-theme="forest"] .bg-primary {
  background-color: rgb(41, 41, 41)!important;
}
.text-secondary {
  color: #2c702c !important;
}
[data-theme="forest"] .text-secondary {
  color: rgb(9, 228, 75) !important;
}
.text-section {
  color: black !important;
}
[data-theme="forest"] .text-section {
  color: white !important;
}

</style>
