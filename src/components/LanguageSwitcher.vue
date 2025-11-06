<template>
  <div class="language-switcher" ref="langDropdown">
    <!-- Current Language Button -->
    <button @click="dropdownOpen = !dropdownOpen" class=" size-5 sm:size-6 md:size-7  lang-current-btn transition-transform duration-100 hover:scale-120 drop-shadow-green-100 drop-shadow-sm ">
      <img :src="currentLanguage.flag" :alt="currentLanguage.name" class="  size-4 sm:size-5 md:size-6  flag-img" />
      <!-- <span class="lang-code text-[#16af3f]">{{ currentLanguage.code }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="chevron-icon"
        :class="{ 'rotate-180': dropdownOpen }"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>-->
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="dropdownOpen" class="lang-dropdown">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="switchLanguage(lang.locale)"
          class="lang-option"
          :class="{ active: $i18n.locale === lang.locale }"
        >
          <img :src="lang.flag" :alt="lang.name" class="flag-img size-4 sm:size-5 md:size-6" />
          <span class="lang-name text-xs sm:text-sm">{{ lang.name }}</span>
          <svg
            v-if="$i18n.locale === lang.locale"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="check-icon size-4 sm:size-5 md:size-6"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "LanguageSwitcher",
  data() {
    return {
      dropdownOpen: false,
      languages: [
        {
          code: "EN",
          locale: "en",
          name: "English",
          flag: "https://flagcdn.com/w40/gb.png",
        },
        {
          code: "AR",
          locale: "ar",
          name: "العربية",
          flag: "https://flagcdn.com/w40/eg.png",
        },
      ],
    };
  },
  computed: {
    currentLanguage() {
      return this.languages.find((lang) => lang.locale === this.$i18n.locale) || this.languages[0];
    },
  },
  methods: {
    switchLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("locale", lang);

      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

      this.dropdownOpen = false;

      // Reload to apply RTL/LTR changes fully
      window.location.reload();
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.langDropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.lang-current-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  gap: 0.4rem;
  padding: 0.5rem 0rem ;
  /*background: #e0ebe0;*/
  /* border: 1px solid #d1d5db;
  border-radius: 0.5rem; */
  cursor: pointer;
  /* transition: all 0.2s ease; */


  color: #2c702c;

}

/* .lang-current-btn:hover {
  background: #e0ebe0;
  border-color: #2c702c;
} */

.flag-img {
 /*  width: 1.2rem;
  height: 1.2rem; */
  object-fit: cover;
  border-radius: 100%;

  display: block;
}

/* .lang-code {
  font-weight: 400;
  letter-spacing: 0.025em;
  font-size: 1.1rem;
  line-height: 1;
} */

/* .chevron-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
} */

/* .chevron-icon.rotate-180 {
  transform: rotate(180deg);
} */

.lang-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 1rem);
  min-width: 160px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 50;
  border: 1px solid #e5e7eb;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .lang-dropdown {
    right: 0;

    min-width: 140px;
  }
}

/* Medium screen adjustments */
@media (min-width: 768px) and (max-width: 1024px) {
  /* .lang-current-btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
    height: 32px;
  } */

 /* .flag-img {
     width: 1.5rem;
    height: 1.5rem;
  }*/

 /*  .lang-code {
    font-size: 1.25rem;
  } */

  /* .chevron-icon {
    width: 14px;
    height: 14px;
  } */

  .lang-dropdown {
    min-width: 140px;
    right: 2rem;
  }
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
  text-align: left;
  font-size: 0.875rem;
}

.lang-option:hover {
  background: #e0ebe0;
}

.lang-option.active {
  background: #f0f9f0;
}

.lang-option:not(:last-child) {
  border-bottom: 1px solid #f3f4f6;
}

.lang-name {
  flex: 1;
  font-weight: 500;
  color: #374151;
  line-height: 1;
}

.lang-option.active .lang-name {
  color: #2c702c;
  font-weight: 600;
}

.check-icon {
  /* width: 18px;
  height: 18px; */
  color: #2c702c;
  flex-shrink: 0;
}

/* RTL Support */
html[dir="rtl"] .lang-dropdown {
  left: 0;
  right: auto;
}

html[dir="rtl"] .lang-option {
  text-align: right;
}

html[dir="rtl"] .lang-current-btn {
  flex-direction: row-reverse;
}
</style>
