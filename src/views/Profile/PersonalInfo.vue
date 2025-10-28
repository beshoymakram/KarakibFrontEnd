<template>
  <div class="personal-info p-8" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <!-- Profile Image Upload - Centered -->
    <div class="flex justify-center mb-8">
      <div class="relative">
        <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
          <img v-if="newInfo.avatar" :src="newInfo.avatar" alt="Profile" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full bg-[#2C702C] flex items-center justify-center text-white text-3xl font-bold">
            {{ getInitials(newInfo.name) }}
          </div>
        </div>

        <!-- Upload Button -->
        <button @click="$refs.fileInput.click()"
          class="absolute bottom-0 right-0 w-10 h-10 bg-[#2C702C] rounded-full flex items-center justify-center text-white hover:bg-[#1a4d1a] transition-colors shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
        </button>

        <!-- Hidden File Input -->
        <input ref="fileInput" type="file" @change="handleImageUpload" accept="image/*" class="hidden" />
      </div>
    </div>

    <!-- Personal Info Section -->
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-[#2C702C]">{{ $t('common.personalInfo') }}</h2>
        <button @click="editMode = !editMode"
          class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          {{ $t('common.edit') }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-2">{{ $t('common.fullName') }}</label>
          <input v-if="editMode" v-model="newInfo.name" type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C702C] focus:border-transparent" />
          <p v-else class="text-lg font-semibold text-[#2C702C]">{{ newInfo.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-2">{{ $t('common.email') }}</label>
          <input v-if="editMode" v-model="newInfo.email" type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C702C] focus:border-transparent" />
          <p v-else class="text-lg font-semibold text-[#2C702C]">{{ newInfo.email }}</p>
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-2">{{ $t('common.phone') }}</label>
          <input v-if="editMode" v-model="newInfo.phone" type="tel"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C702C] focus:border-transparent" />
          <p v-else class="text-lg font-semibold text-[#2C702C]">{{ newInfo.phone }}</p>
        </div>
      </div>

      <!-- Save/Cancel Buttons -->
      <div v-if="editMode" class="flex justify-end gap-3 mb-6">
        <button @click="cancelEdit" class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          {{ $t('common.Cancel') }}
        </button>
        <button @click="confirmEdit" class="px-6 py-2 bg-[#2C702C] text-white rounded-lg hover:bg-[#1a4d1a]">
          {{ $t('common.Save Changes') }}
        </button>
      </div>

      <!-- Delete Account Button -->
      <div class="flex justify-end pt-6 border-t">
        <button @click="showDeleteModal = true"
          class="flex items-center gap-2 px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          {{ $t('common.deleteAccount') }}
        </button>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <Teleport to="body">
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        @click="showDeleteModal = false">
        <div class="relative p-4 w-full max-w-md" @click.stop>
          <div class="relative bg-white rounded-lg shadow">
            <button @click="showDeleteModal = false" class="absolute top-3 right-3 text-gray-400 hover:text-gray-900">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="p-6 text-center">
              <svg class="mx-auto mb-4 text-red-600 w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500">
                {{ $t('common.areYouSureDeleteAccount') }}
              </h3>
              <button @click="deleteAccount"
                class="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
                {{ $t('common.yesDeleteIt') }}
              </button>
              <button @click="showDeleteModal = false"
                class="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5">
                {{ $t('common.Cancel') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import profileService from '@/services/profileService';
import { useAuthStore } from '@/stores/auth';
import { nextTick } from 'vue';

export default {
  name: 'PersonalInfo',

  data() {
    return {
      editMode: false,
      showDeleteModal: false,
      imageFile: null, // Store actual File object
      profileImage: null,
      newInfo: {
        name: '',
        email: '',
        phone: '',
        avatar: null
      },
      originalInfo: {}
    }
  },

  computed: {
    auth() {
      return useAuthStore();
    }
  },

  methods: {
    getInitials(name) {
      if (!name) return 'U';
      const names = name.trim().split(' ');
      if (names.length === 1) return names[0].charAt(0).toUpperCase();
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newInfo.avatar = e.target.result;
        };
        reader.readAsDataURL(file);

        this.confirmEdit();
      }
    },

    cancelEdit() {
      this.newInfo = { ...this.originalInfo };
      this.imageFile = null;
      this.editMode = false;
    },

    async confirmEdit() {
      try {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', this.newInfo.name);
        formData.append('email', this.newInfo.email);
        formData.append('phone', this.newInfo.phone);

        console.log(formData)
        if (this.imageFile) {
          formData.append('avatar', this.imageFile);
        }
        const response = await profileService.updateMyAccount(formData);

        this.auth.user = {
          ...this.auth.user,
          ...response.data.user
        };
        localStorage.setItem('user', JSON.stringify(this.auth.user));

        this.originalInfo = { ...this.newInfo };
        this.imageFile = null;
        this.editMode = false;

        nextTick(() => {
          this.$toast.success(response.data.message);
        });
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async deleteAccount() {
      try {
        const response = await profileService.deleteMyAccount();
        nextTick(() => {
          this.$toast.success(response.data.message);
          this.auth.logout();
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        });
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
      this.showDeleteModal = false;
    },

    loadUserData() {
      if (this.auth.user) {
        this.newInfo = {
          name: this.auth.user.name || '',
          email: this.auth.user.email || '',
          phone: this.auth.user.phone || '',
          avatar: this.auth.user.avatar_url || this.auth.user.avatar || null
        };
        this.originalInfo = { ...this.newInfo };
      }
    }
  },

  mounted() {
    // this.newInfo = { ...this.auth.user }
    this.loadUserData();

  }
}
</script>
