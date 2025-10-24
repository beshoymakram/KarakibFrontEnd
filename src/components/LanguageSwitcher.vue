<template>
  <div class="language-switcher" ref="langDropdown">
    <!-- Current Language Button -->
    <button @click="dropdownOpen = !dropdownOpen" class="lang-current-btn">
      <img :src="currentLanguage.flag" :alt="currentLanguage.name" class="flag-img" />
      <span class="lang-code">{{ currentLanguage.code }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="chevron-icon"
        :class="{ 'rotate-180': dropdownOpen }">
        <path fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div v-if="dropdownOpen" class="lang-dropdown">
        <button v-for="lang in languages" :key="lang.code" @click="switchLanguage(lang.locale)" class="lang-option"
          :class="{ 'active': $i18n.locale === lang.locale }">
          <img :src="lang.flag" :alt="lang.name" class="flag-img" />
          <span class="lang-name">{{ lang.name }}</span>
          <svg v-if="$i18n.locale === lang.locale" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            fill="currentColor" class="check-icon">
            <path fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      dropdownOpen: false,
      languages: [
        {
          code: 'EN',
          locale: 'en',
          name: 'English',
          flag: 'https://flagcdn.com/w40/gb.png'
        },
        {
          code: 'AR',
          locale: 'ar',
          name: 'العربية',
          flag: 'https://flagcdn.com/w40/eg.png'
        }
      ]
    }
  },
  computed: {
    currentLanguage() {
      return this.languages.find(lang => lang.locale === this.$i18n.locale) || this.languages[0]
    }
  },
  methods: {
    switchLanguage(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('locale', lang)

      document.documentElement.setAttribute('lang', lang)
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')

      this.dropdownOpen = false

      // Reload to apply RTL/LTR changes fully
      window.location.reload()
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.langDropdown
      if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
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
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2C702C;
  height: 38px;
}

.lang-current-btn:hover {
  background: #E0EBE0;
  border-color: #2C702C;
}

.flag-img {
  width: 24px;
  height: 18px;
  object-fit: cover;
  border-radius: 2px;
  display: block;
}

.lang-code {
  font-weight: 600;
  letter-spacing: 0.025em;
  font-size: 0.875rem;
  line-height: 1;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.chevron-icon.rotate-180 {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
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
    right: auto;
    left: 0;
    min-width: 140px;
  }
}

/* Medium screen adjustments */
@media (min-width: 768px) and (max-width: 1024px) {
  .lang-current-btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
    height: 32px;
  }

  .flag-img {
    width: 20px;
    height: 15px;
  }

  .lang-code {
    font-size: 0.75rem;
  }

  .chevron-icon {
    width: 14px;
    height: 14px;
  }

  .lang-dropdown {
    min-width: 140px;
    right: 0;
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
  background: #E0EBE0;
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
  color: #2C702C;
  font-weight: 600;
}

.check-icon {
  width: 18px;
  height: 18px;
  color: #2C702C;
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
