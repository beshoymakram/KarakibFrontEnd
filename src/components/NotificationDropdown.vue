<template>
  <div class="relative" ref="dropdownRef">
    <!-- Bell Icon Button -->
    <button
      @click="toggleDropdown"
      class="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2C702C] focus:ring-opacity-50"
      aria-label="Notifications"
    >
      <i class="fas fa-bell text-gray-700 text-xl"></i>

      <!-- Unread Indicator Dot -->
      <span
        v-if="hasUnread"
        class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#2C702C] rounded-full border-2 border-white"
      ></span>
    </button>

    <!-- Dropdown Panel -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
      >
        <!-- Header -->
        <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">Notifications</h3>
          <button
            v-if="hasUnread"
            @click="markAllAsRead"
            class="text-sm text-[#2C702C] hover:text-[#235a23] font-medium transition-colors duration-200"
          >
            Mark all read
          </button>
        </div>

        <!-- Notifications List -->
        <div class="max-h-80 overflow-y-auto">
          <div v-if="notifications.length === 0" class="px-4 py-8 text-center text-gray-500">
            <i class="fas fa-bell-slash text-3xl mb-2"></i>
            <p>No notifications</p>
          </div>

          <div v-else>
            <div
              v-for="notification in notifications"
              :key="notification.id"
              @click="markAsRead(notification.id)"
              class="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-[#EAF2EA] transition-colors duration-200 cursor-pointer"
              :class="{ 'bg-[#F5F9F5]': !notification.read }"
            >
              <div class="flex items-start gap-3">
                <!-- Icon -->
                <div
                  class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  :class="notification.iconBg"
                >
                  <i :class="notification.icon" class="text-white"></i>
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <h4 class="text-sm font-semibold text-gray-800 truncate">
                      {{ notification.title }}
                    </h4>
                    <span
                      v-if="!notification.read"
                      class="shrink-0 w-2 h-2 bg-[#2C702C] rounded-full mt-1"
                    ></span>
                  </div>
                  <p class="text-sm text-gray-600 mt-0.5 line-clamp-2">
                    {{ notification.description }}
                  </p>
                  <span class="text-xs text-gray-500 mt-1 inline-block">
                    {{ notification.timestamp }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 py-3 border-t border-gray-200 text-center">
          <button
            class="text-sm text-[#2C702C] hover:text-[#235a23] font-medium transition-colors duration-200"
          >
            View all notifications
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// State
const isOpen = ref(false);
const dropdownRef = ref(null);

// Sample notifications data
const notifications = ref([
  {
    id: 1,
    title: 'New comment on your post',
    description: 'John Doe commented: "Great work! This looks amazing."',
    timestamp: '2h ago',
    read: false,
    icon: 'fas fa-comment',
    iconBg: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Task assigned to you',
    description: 'You have been assigned to "Update Dashboard UI" task.',
    timestamp: '4h ago',
    read: false,
    icon: 'fas fa-tasks',
    iconBg: 'bg-[#2C702C]'
  },
  {
    id: 3,
    title: 'Meeting reminder',
    description: 'Team sync meeting starts in 30 minutes.',
    timestamp: '5h ago',
    read: true,
    icon: 'fas fa-calendar',
    iconBg: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Project milestone reached',
    description: 'Congratulations! Your project reached 100 commits.',
    timestamp: '1d ago',
    read: true,
    icon: 'fas fa-trophy',
    iconBg: 'bg-yellow-500'
  },
  {
    id: 5,
    title: 'New follower',
    description: 'Sarah Smith started following you.',
    timestamp: '2d ago',
    read: true,
    icon: 'fas fa-user-plus',
    iconBg: 'bg-pink-500'
  },
  {
    id: 6,
    title: 'System update',
    description: 'A new version is available. Update now to get the latest features.',
    timestamp: '3d ago',
    read: true,
    icon: 'fas fa-download',
    iconBg: 'bg-indigo-500'
  }
]);

// Computed
const hasUnread = computed(() => {
  return notifications.value.some(n => !n.read);
});

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach(n => {
    n.read = true;
  });
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
