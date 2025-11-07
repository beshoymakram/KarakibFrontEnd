<template>
  <div class="relative" ref="dropdownRef">
    <!-- Bell Icon Button -->
    <button @click="toggleDropdown" class="hidden md:block relative py-2 rounded-lg    transition-transform duration-100 hover:scale-120  "
      aria-label="Notifications">
      <!-- Bell Icon SVG -->
      <svg class="w-5 h-5 m:w-6 sm:h-6 md:w-7 md:h-7 text-primary  cursor-pointer hover:scale-110" fill="none"
        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
        </path>
      </svg>

      <!-- Unread Indicator Dot -->
      <span v-if="hasUnread"
        class="absolute top-1.5 right-1.2 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#2C702C] rounded-full border border-white"></span>
    </button>

    <!-- Dropdown Panel -->
    <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div v-if="isOpen" class=" hidden md:block absolute -right-39 sm:-right-2 mt-2  w-82 xl:w-85  bg-white rounded-xl shadow-lg border border-gray-200 z-50">
        <!-- Header -->
        <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-text-base lg:text-lg font-semibold text-gray-800">Notifications</h3>
          <button v-if="hasUnread" @click="markAllAsRead"
            class="text-sm text-[#2C702C] hover:text-[#235a23] font-medium transition-colors duration-200">
            Mark all read
          </button>
        </div>

        <!-- Notifications List -->
        <div class="max-h-80 overflow-y-auto">
          <div v-if="notifications.length === 0" class="px-4 py-8 text-center text-gray-500">
            <svg class="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
            <p>No notifications</p>
          </div>

          <div v-else>
            <div v-for="notification in notifications" :key="notification.id" @click="markAsRead(notification.id)"
              class="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-[#EAF2EA] transition-colors duration-200 cursor-pointer"
              :class="{ 'bg-[#F5F9F5]': !notification.read }">
              <div class="flex items-start gap-3">
                <!-- Icon -->
                <div class="shrink-0  w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center"
                  :class="notification.iconBg">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path :d="notification.iconPath"></path>
                  </svg>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <h4 class="text-sm font-semibold text-gray-800 truncate">
                      {{ $t(`common.${notification.content}`) }}
                    </h4>
                    <span v-if="!notification.read" class="shrink-0 w-2 h-2 bg-[#2C702C] rounded-full mt-1"></span>
                  </div>
                  <span class="text-xs text-gray-500 mt-1 inline-block">
                    {{ notification.created_at_for_humans }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 py-2 border-t border-gray-200 text-center">
          <router-link to="/profile/notifications"
            class="text-xs lg:text-sm text-[#2C702C] hover:text-[#235a23] font-medium transition-colors duration-200">
            View all notifications
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import profileService from '@/services/profileService';

export default {
  name: 'NotificationDropdown',

  data() {
    return {
      isOpen: false,
      notifications: [],
      notificationss: [
        {
          id: 1,
          title: 'New comment on your post',
          description: 'John Doe commented: "Great work! This looks amazing."',
          timestamp: '2h ago',
          read: false,
          iconPath: 'M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z',
          iconBg: 'bg-blue-500'
        },
        {
          id: 2,
          title: 'Task assigned to you',
          description: 'You have been assigned to "Update Dashboard UI" task.',
          timestamp: '4h ago',
          read: false,
          iconPath: 'M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z',
          iconBg: 'bg-[#2C702C]'
        },
        {
          id: 3,
          title: 'Meeting reminder',
          description: 'Team sync meeting starts in 30 minutes.',
          timestamp: '5h ago',
          read: true,
          iconPath: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z',
          iconBg: 'bg-purple-500'
        },
        {
          id: 4,
          title: 'Project milestone reached',
          description: 'Congratulations! Your project reached 100 commits.',
          timestamp: '1d ago',
          read: true,
          iconPath: 'M2 6a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z',
          iconBg: 'bg-yellow-500'
        },
        {
          id: 5,
          title: 'New follower',
          description: 'Sarah Smith started following you.',
          timestamp: '2d ago',
          read: true,
          iconPath: 'M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z',
          iconBg: 'bg-pink-500'
        },
        {
          id: 6,
          title: 'System update',
          description: 'A new version is available. Update now to get the latest features.',
          timestamp: '3d ago',
          read: true,
          iconPath: 'M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z',
          iconBg: 'bg-indigo-500'
        }
      ]
    };
  },

  computed: {
    hasUnread() {
      return this.notifications.some(n => !n.read);
    }
  },

  methods: {
    async fetchNotifications() {
      try {
        const response = await profileService.getNotifications();
        this.notifications = response.data.notifications || response.data;
      } catch (error) {
        this.$toast.error(error?.response?.data.message || 'Failed to fetch notifications.');
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    async markAsRead(id) {
      await profileService.markNotificationAsRead(id);
      this.fetchNotifications();
    },

    async markAllAsRead() {
      await profileService.markNotificationsAsRead();
      this.fetchNotifications();
    },

    handleClickOutside(event) {
      if (this.$refs.dropdownRef && !this.$refs.dropdownRef.contains(event.target)) {
        this.isOpen = false;
      }
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.fetchNotifications();
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>
<style scoped>
.text-primary {
  color: #2c702c !important;
}

[data-theme="forest"] .text-primary {
  color: #16af3f !important;
}
</style>
