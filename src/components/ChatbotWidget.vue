<template>
  <div class="fixed bottom-5 right-5 z-50">
    <!-- Floating Button -->
    <button
      @click="toggleChat"
      class="bg-[#2C702C] text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-[#265C26] transition"
    >
      <img src="/images/koko.png" alt="koko" class="w-full h-full rounded-full" />
    </button>

    <!-- Chat Window -->
    <div
      v-if="isOpen"
      :class="[
        'mt-3 bg-green-50 border-2 border-[#2C702C] rounded-xl flex shadow-xl animate-fadeIn overflow-hidden',
        isFullscreen ? 'fixed inset-0 w-full h-full rounded-none bottom-0 right-0 m-0' : 'w-[800px] h-[600px]'
      ]"
    >
      <!-- Left Sidebar - Chat History -->
      <div class="w-64 bg-white border-r border-green-200 flex flex-col">
        <!-- Sidebar Header -->
        <div class="bg-[#2C702C] text-white px-4 py-3 flex items-center justify-between">
          <span class="font-semibold text-sm">💬 Chat History</span>
          <button
            @click="startNewChat"
            class="bg-[#265C26] hover:bg-[#1a4d1a] text-white text-xs px-3 py-1 rounded-md transition flex items-center gap-1"
            title="Start New Chat"
          >
            <img src="../../public/images/icons8-plus-50.png" alt="" class="size-4"> New
          </button>
        </div>

        <!-- Chat List -->
        <div class="flex-1 overflow-y-auto">
          <div
            v-for="chat in chatList"
            :key="chat.id"
            @click="loadChat(chat.id)"
            :class="[
              'px-4 py-3 border-b border-green-100 cursor-pointer transition-colors hover:bg-green-50 group',
              currentChatId === chat.id ? 'bg-[#EAF2EA] border-l-4 border-l-[#2C702C]' : ''
            ]"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate">
                  {{ getChatTitle(chat) }}
                </p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ formatDate(chat.createdAt) }}
                </p>
              </div>
              <button
                @click.stop="deleteChat(chat.id)"
                class="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs p-1.5 rounded transition opacity-0 group-hover:opacity-100"
                title="Delete Chat"
              >
                🗑️
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="chatList.length === 0" class="p-4 text-center text-gray-400 text-sm">
            No chat history yet.<br />
            Start a new conversation!
          </div>
        </div>
      </div>

      <!-- Right Side - Main Chat Area -->
      <div class="flex-1 flex flex-col bg-green-50">
        <!-- Header -->
        <div class="bg-[#2C702C] text-white flex justify-between items-center px-4 py-3">
          <span class="font-semibold tracking-wide">🌱 Koko AI Helper</span>
          <div class="flex items-center gap-2">
            <button
              v-if="currentChatId"
  @click="startNewChat"
  class="flex items-center gap-1 hover:text-green-200 text-sm px-2 py-1 rounded transition"
  title="Start New Chat"
>
  <img src="../../public/images/icons8-plus-50.png" alt="" class="size-4">
  <span>New Chat</span>
</button>
            <button class="hover:text-green-200 text-xl" @click="toggleFullscreen" title="Toggle Fullscreen">
              ⤢
            </button>
          </div>
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
              class="w-8 h-8 rounded-full flex-shrink-0"
              alt="Koko"
            />

            <div
              :class="[
                'px-3 py-2 rounded-lg text-sm max-w-[75%] break-words',
                msg.sender === 'bot'
                  ? 'bg-[#2C702C] text-white'
                  : 'bg-white border border-green-300 text-gray-800'
              ]"
            >
              <!-- Image preview for user messages -->
              <img
                v-if="msg.image"
                :src="msg.image"
                class="max-w-full rounded mb-2 border border-green-700"
                alt="uploaded waste item"
              />

              <!-- Message text with formatting -->
              <div v-html="formatMessage(msg.text)" class="whitespace-pre-wrap"></div>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="flex items-start gap-2">
            <img src="/images/koko.png" class="w-8 h-8 rounded-full" alt="Koko" />
            <div class="bg-[#2C702C] text-white px-3 py-2 rounded-lg text-sm">
              <span class="animate-pulse">{{ loadingText }}</span>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-green-300 px-3 py-2 bg-white rounded-b-xl">
          <!-- Image Preview -->
          <div v-if="imagePreview" class="mb-2 relative inline-block">
            <img :src="imagePreview" class="max-w-[100px] rounded border-2 border-[#2C702C]" alt="preview" />
            <button
              @click="clearImage"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 font-bold"
            >
              ✕
            </button>
          </div>

          <!-- Input Row -->
          <div class="flex items-center gap-2 w-full">
            <!-- Image Upload Button -->
            <label
              class="cursor-pointer bg-[#2C702C] text-white px-3 py-2 rounded-lg hover:bg-[#265C26] transition flex items-center justify-center flex-shrink-0"
              title="Upload waste image for DIY ideas"
            >
              <img src="../../public/images/icons8-camera-64.png" alt="" class="size-6"></img>
              <input
                type="file"
                ref="fileInput"
                @change="handleImageUpload"
                accept="image/*"
                class="hidden"
                :disabled="isLoading"
              />
            </label>

            <!-- Text Input -->
            <input
              v-model="userInput"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Ask about recycling or upload image…"
              :disabled="isLoading"
              class="flex-1 min-w-0 px-3 py-2 rounded-lg border border-green-300 focus:ring-2 focus:ring-[#2C702C] outline-none text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            />

            <!-- Send Button -->
            <button
              @click="sendMessage"
              :disabled="isLoading || (!userInput.trim() && !selectedImage)"
              class="bg-[#2C702C] text-white px-4 py-2 rounded-lg hover:bg-[#265C26] transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 whitespace-nowrap"
            >
              Send
            </button>
          </div>
        </div>
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
      messages: [],
      chatHistory: [],
      chatList: [],
      currentChatId: null,
      isLoading: false,
      loadingText: "Thinking...",
      selectedImage: null,
      imagePreview: null,
      apiBaseUrl: "http://localhost:3001/api",
      storageKey: "karakib_chat_history",
    };
  },
  mounted() {
    this.loadChatList();
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        // If no current chat, start a new one
        if (!this.currentChatId) {
          this.startNewChat();
        }
        this.$nextTick(() => this.scrollToBottom());
      }
    },

    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      this.$nextTick(() => this.scrollToBottom());
    },

    loadChatList() {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          this.chatList = JSON.parse(stored);
          // Sort by most recent first
          this.chatList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }
      } catch (error) {
        console.error("Error loading chat list:", error);
        this.chatList = [];
      }
    },

    saveChatList() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.chatList));
      } catch (error) {
        console.error("Error saving chat list:", error);
      }
    },

    startNewChat() {
      // Save current chat if it exists
      if (this.currentChatId && this.messages.length > 1) {
        this.saveCurrentChat();
      }

      // Create new chat
      const newChatId = Date.now().toString();
      this.currentChatId = newChatId;
      this.messages = [
        {
          sender: "bot",
          text: "Hello! I'm Koko, your assistant for **Karakib** - your waste collection service! 🌱\n\n**I can help you with:**\n• How our collection service works\n• What materials we accept\n• Scheduling a pickup\n• Creative DIY ideas for small waste items\n• General recycling tips\n\nAsk me anything! 💚"
        },
      ];
      this.chatHistory = [];

      // Add to chat list
      const newChat = {
        id: newChatId,
        title: "New Chat",
        messages: [...this.messages],
        chatHistory: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.chatList.unshift(newChat);
      this.saveChatList();

      this.$nextTick(() => this.scrollToBottom());
    },

    loadChat(chatId) {
      // Save current chat if changed
      if (this.currentChatId && this.currentChatId !== chatId && this.messages.length > 1) {
        this.saveCurrentChat();
      }

      // Load the selected chat
      const chat = this.chatList.find((c) => c.id === chatId);
      if (chat) {
        this.currentChatId = chatId;
        this.messages = JSON.parse(JSON.stringify(chat.messages));
        this.chatHistory = JSON.parse(JSON.stringify(chat.chatHistory || []));

        // Update position in list (move to top)
        const index = this.chatList.findIndex((c) => c.id === chatId);
        if (index > 0) {
          this.chatList.splice(index, 1);
          this.chatList.unshift(chat);
          this.saveChatList();
        }

        this.$nextTick(() => this.scrollToBottom());
      }
    },

    saveCurrentChat() {
      if (!this.currentChatId) return;

      const chatIndex = this.chatList.findIndex((c) => c.id === this.currentChatId);
      if (chatIndex !== -1) {
        const chat = this.chatList[chatIndex];
        chat.messages = JSON.parse(JSON.stringify(this.messages));
        chat.chatHistory = JSON.parse(JSON.stringify(this.chatHistory));
        chat.updatedAt = new Date().toISOString();
        chat.title = this.getChatTitle(chat);

        this.chatList[chatIndex] = chat;
        this.saveChatList();
      }
    },

    deleteChat(chatId) {
      if (confirm("Are you sure you want to delete this chat?")) {
        const index = this.chatList.findIndex((c) => c.id === chatId);
        if (index !== -1) {
          this.chatList.splice(index, 1);
          this.saveChatList();

          // If deleted chat was current, start a new one
          if (this.currentChatId === chatId) {
            this.startNewChat();
          }
        }
      }
    },

    getChatTitle(chat) {
      // Get title from first user message or use default
      const firstUserMessage = chat.messages?.find((m) => m.sender === "user");
      if (firstUserMessage) {
        const title = firstUserMessage.text.substring(0, 30);
        return title.length < firstUserMessage.text.length ? title + "..." : title;
      }
      return chat.title || "New Chat";
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString();
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (jpg, png, etc.)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      this.selectedImage = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    clearImage() {
      this.selectedImage = null;
      this.imagePreview = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },

    async sendMessage() {
      // Must have either text or image
      if (!this.userInput.trim() && !this.selectedImage) return;
      if (this.isLoading) return;

      // Create chat if doesn't exist
      if (!this.currentChatId) {
        this.startNewChat();
      }

      const messageText = this.userInput.trim() || "What can I do with this waste item?";

      // Add user message to chat
      this.messages.push({
        sender: "user",
        text: messageText,
        image: this.imagePreview,
      });

      // Save current state
      const currentImage = this.selectedImage;
      const currentText = messageText;

      // Clear inputs
      this.userInput = "";
      this.clearImage();

      this.isLoading = true;
      this.loadingText = currentImage ? "Analyzing image... 🔍" : "Thinking... 💭";
      this.$nextTick(() => this.scrollToBottom());

      try {
        let response;

        if (currentImage) {
          // Image analysis
          response = await this.analyzeImage(currentImage, currentText);
        } else {
          // Text-only chat - pass full conversation history
          response = await this.sendTextChat(currentText);
        }

        // Add bot response
        this.messages.push({
          sender: "bot",
          text: response,
        });

        // Update conversation history (for context in future messages)
        this.chatHistory.push({ role: "user", content: currentText }, { role: "ai", content: response });

        // Keep reasonable history size (last 20 exchanges = 40 messages)
        if (this.chatHistory.length > 40) {
          this.chatHistory = this.chatHistory.slice(-40);
        }

        // Auto-save chat after each exchange
        this.saveCurrentChat();

      } catch (error) {
        console.error("Chatbot error:", error);
        this.messages.push({
          sender: "bot",
          text: `Sorry, I encountered an error: ${error.message}\n\nPlease try again! 🌿`,
        });
      } finally {
        this.isLoading = false;
        this.$nextTick(() => this.scrollToBottom());
      }
    },

    async sendTextChat(message) {
      const response = await fetch(`${this.apiBaseUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: this.chatHistory, // Send full conversation history
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Network error" }));
        throw new Error(error.error || "Failed to get response from chatbot");
      }

      const data = await response.json();
      return data.response;
    },

    async analyzeImage(imageFile, prompt) {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("prompt", prompt);

      const response = await fetch(`${this.apiBaseUrl}/vision`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Network error" }));
        throw new Error(error.error || "Failed to analyze image");
      }

      const data = await response.json();
      return data.description;
    },

    formatMessage(text) {
      if (!text) return "";

      // Convert markdown-style formatting to HTML
      return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **bold**
        .replace(/\*(.*?)\*/g, "<em>$1</em>") // *italic*
        .replace(/###\s*(.*?)(\n|$)/g, '<strong style="font-size: 1.1em; display: block; margin: 0.5em 0;">$1</strong>') // ### headings
        .replace(/##\s*(.*?)(\n|$)/g, '<strong style="font-size: 1.15em; display: block; margin: 0.5em 0;">$1</strong>') // ## headings
        .replace(/\n/g, "<br>"); // line breaks
    },

    scrollToBottom() {
      const body = this.$refs.chatBody;
      if (body) {
        setTimeout(() => {
          body.scrollTop = body.scrollHeight;
        }, 100);
      }
    },
  },
  beforeUnmount() {
    // Save current chat before component unmounts
    this.saveCurrentChat();
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.97);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Custom scrollbar for chat list */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #2C702C;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #265C26;
}
</style>
