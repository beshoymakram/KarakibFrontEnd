<template>
  <div class="fixed bottom-5 right-5 z-50">

    <!-- Floating Button -->
    <button
      @click="toggleChat"
      class="bg-green-800 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-green-900 transition"
    >
      <img src="/images/koko.png" alt="koko" class="w-full h-full" />
    </button>

    <!-- Chat Window -->
    <div
      v-if="isOpen"
      :class="[
        'mt-3 w-80 h-[480px] bg-green-100 border-2 border-green-800 rounded-xl flex flex-col shadow-xl animate-fadeIn',
        isFullscreen ? 'fixed inset-0 w-full h-full rounded-none bottom-0 right-0 m-0' : ''
      ]"
    >
      <!-- Header -->
      <div class="bg-green-800 text-white flex justify-between items-center px-4 py-3">
        <span class="font-semibold tracking-wide">&copy; Koko AI Powered Helper</span>
        <button class="hover:text-gray-200" @click="toggleFullscreen">⤢</button>
      </div>

      <!-- Messages -->
      <div ref="chatBody" class="flex-1 overflow-y-auto p-3 space-y-3">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="flex items-start gap-2"
          :class="msg.sender === 'user' ? 'justify-end' : ''"
        >
          <!-- Bot avatar -->
          <img
            v-if="msg.sender === 'bot'"
            src="/images/koko.png"
            class="w-8 h-8 rounded-full"
          />

          <div
            :class="[
              'px-3 py-2 rounded-lg text-sm max-w-[75%]',
              msg.sender === 'bot'
                ? 'bg-green-800 text-white'
                : 'bg-white border border-green-300 dark:text-black'
            ]"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="flex items-center border-t border-green-300 px-3 py-2">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type a message…"
          class="flex-1 px-3 py-2 rounded-lg focus:ring focus:ring-green-300 outline-none dark:text-black"
        />
        <button
          @click="sendMessage"
          class="ml-2 bg-green-800 text-white px-3 py-2 rounded-lg hover:bg-green-900 transition"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatbotWidget",
  data() {
    return {
      isOpen: false,
      isFullscreen: false,
      userInput: "",
      messages: [
        { sender: "bot", text: "Hello! How can I help you today? 🌱" },
      ],
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
    },
    sendMessage() {
      if (!this.userInput.trim()) return;

      this.messages.push({ sender: "user", text: this.userInput });
      this.userInput = "";

      setTimeout(() => {
        this.messages.push({ sender: "bot", text: "Got it!" });
        this.scrollToBottom();
      }, 400);

      this.$nextTick(() => this.scrollToBottom());
    },
    scrollToBottom() {
      const body = this.$refs.chatBody;
      body.scrollTop = body.scrollHeight;
    },
  },
};
</script>

<style>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(.97);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn .2s ease-out;
}
</style>
