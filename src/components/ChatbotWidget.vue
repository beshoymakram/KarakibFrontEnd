<template>
  <div
    class="fixed z-50"
    :style="buttonPosition"
  >
    <!-- Tooltip (shows before opening chatbot) -->
    <div
      v-if="!isOpen && showTooltip"
      class="absolute bottom-10 md:bottom-14 right-0 bg-[#D4E7D4] border-2 border-[#2C702C] rounded-xl shadow-lg p-3 mb-2 w-76 animate-fadeIn"
    >
      <button
        @click="showTooltip = false"
        class="absolute top-1.5 right-1.5 text-gray-500 hover:text-gray-700 text-xs md:text-sm leading-none w-5 h-5 flex items-center justify-center"
      >
        ✕
      </button>
      <div class="pr-5">

<h4 class="font-bold text-[#2C702C] text-sm md:text-base mb-1.5">
  🌱 {{ $t('chatbot.tooltipTitle') }}
</h4>
<p class="text-[0.67rem] md:text-xs text-gray-700 leading-snug">
  {{ $t('chatbot.tooltipDescription') }}
</p>

      </div>
    </div>

    <!-- Floating Button (always visible) -->
    <button
      @mousedown="startDrag"
      @touchstart="startDrag"
      @click="handleClick"
      class="bg-[#2C702C] text-white rounded-full w-10 h-10 md:w-14 md:h-14 shadow-lg flex items-center justify-center hover:bg-[#265C26] transition relative z-50 cursor-move touch-none select-none"
      :class="{ 'opacity-80': isDragging }"
    >
      <img src="/images/koko.png" :alt="$t('chatbot.kokoAlt')" class="w-full h-full rounded-full pointer-events-none" />
    </button>

    <!-- Chat Window -->
    <div
      v-if="isOpen"
      :class="[
        'absolute right-0 md:right-8 bottom-4 md:bottom-6 bg-green-50 border-2 border-[#2C702C] rounded-2xl flex shadow-xl animate-fadeIn overflow-hidden backdrop-blur-md',
       isFullscreen
      ? 'w-[90vw] h-[90vh] md:w-[85vw] md:h-[88vh] lg:w-[80vw] lg:h-[85vh] xl:w-[75vw] xl:h-[85vh]'
      : 'w-[90vw] h-[70vh] sm:w-[70vw] sm:h-[65vh] md:w-[45vw] md:h-[70vh] lg:w-[34vw] lg:h-[80vh] '
  ]"
    >
      <!-- Left Sidebar  -->
      <div v-if="isFullscreen" class="hidden md:flex w-[26vw] lg:w-[20vw] bg-[#EAF2EA] border-r border-green-200 flex-col"
    >
      <div class="bg-[#235723] text-white px-4 py-3 flex items-center justify-between h-12 md:h-14">
        <span class="font-semibold text-sm tracking-wide">{{ $t('chatbot.chatHistory') }}</span>
      </div>

        <!-- New Chat Button -->
        <div class="px-3 py-2 border-b border-green-200">
          <button
            @click="startNewChat"
            class="w-full  bg-[#E0EBE0] text-[#2C702C] md:text-base font-medium px-3 py-2 rounded-md transition flex items-center justify-center gap-2"
            :title="$t('chatbot.startNewChat')"
          >
            <img src="../../public/images/icons8-add-to-chat-50.png" alt="" class="size-5 md:size-6">
            <span>{{ $t('chatbot.newChat') }}</span>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100">
          <div
            v-for="chat in chatList"
            :key="chat.id"
            @click="loadChat(chat.id)"
            :class="[
              'px-4 py-3 border-b border-green-100 cursor-pointer transition-colors hover:bg-[#BFD6BF] group flex flex-col gap-1',
              currentChatId === chat.id ? 'bg-[#BFD6BF] border-l-4 border-l-[#2C702C]' : ''
            ]"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-sm md:text-base font-semibold text-gray-800 truncate">
                  {{ getChatTitle(chat) }}
                </p>
                <p class="text-xs text-gray-500 ">
                  {{ formatDate(chat.createdAt) }}
                </p>
              </div>
              <button
                 @click.stop="deleteChat(chat.id)"
                 class="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs p-1.5 rounded transition
                 opacity-0 group-hover:opacity-100"
                 :title="$t('chatbot.deleteChat')"
                >
                  🗑️
              </button>
            </div>
          </div>

          <div v-if="chatList.length === 0" class="p-4 text-center text-gray-400 text-sm">
            {{ $t('chatbot.noChatHistory') }}
          </div>
        </div>
      </div>

      <!-- Right Side - Main Chat Area -->
      <div class="flex-1 flex flex-col bg-[#BFD6BF] rounded-r-xl overflow-hidden w-full transition-all duration-300">
        <div class="bg-[#2C702C] text-white grid grid-cols-[auto_1fr_auto] items-center px-2 sm:px-3 md:px-5 py-2 h-12 md:h-14 gap-2">
          <!-- Left: Fullscreen Button and Chat History Icon (Mobile Only) -->
          <div class="flex justify-start items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              class="hover:text-green-200 text-base sm:text-lg transition shrink-0"
              @click="toggleFullscreen"
              :title="isFullscreen ? $t('chatbot.minimize') : $t('chatbot.fullscreen')"
            >
              {{ isFullscreen ? '⤡' : '⤢' }}
            </button>
            <button
              v-if="isOpen"
              class="md:hidden hover:opacity-80 transition shrink-0 flex items-center justify-center"
              @click="showMobileChatHistory = true"
              :title="$t('chatbot.chatHistory')"
            >
              <img src="/images/fluent_chat-history-20-filled.svg" :alt="$t('chatbot.chatHistory')" class="w-4 h-4 sm:w-5 sm:h-5 filter brightness-0 invert" />
            </button>
          </div>
          
          <!-- Center: Title -->
          <span class="font-semibold tracking-wide text-[10px] sm:text-xs md:text-sm lg:text-base text-center whitespace-nowrap min-w-0">{{ $t('chatbot.kokoAIHelper') }}</span>

          <!-- Right: Close Button -->
          <div class="flex justify-end">
            <button
              class="hover:text-green-200 text-base sm:text-lg transition"
              @click="toggleChat"
              :title="$t('common.close')"
            >
              ✕
            </button>
          </div>

        </div>

        <!-- Messages Area Container (relative positioning for overlay) -->
        <div class="flex-1 relative min-h-0">
          <!-- Mobile Chat History Overlay (inside chatbot, covers messages area) -->
          <div
            v-if="showMobileChatHistory"
            class="md:hidden absolute inset-0 bg-[#EAF2EA] z-10 flex flex-col"
          >
            <!-- Sticky Header with Close Button -->
            <div class="bg-[#235723] text-white px-4 py-3 flex items-center justify-between h-12 shrink-0">
              <span class="font-semibold text-sm tracking-wide">{{ $t('chatbot.chatHistory') }}</span>
              <button
                @click="showMobileChatHistory = false"
                class="hover:text-green-200 text-lg transition shrink-0"
                :title="$t('common.close')"
              >
                ✕
              </button>
            </div>

            <!-- New Chat Button -->
            <div class="px-3 py-2 border-b border-green-200 shrink-0 bg-[#EAF2EA]">
              <button
                @click="startNewChatFromMobile"
                class="w-full bg-[#E0EBE0] text-[#2C702C] text-sm font-medium px-3 py-2 rounded-md transition flex items-center justify-center gap-2"
                :title="$t('chatbot.startNewChat')"
              >
                <img src="../../public/images/icons8-add-to-chat-50.png" alt="" class="size-5">
                <span>{{ $t('chatbot.newChat') }}</span>
              </button>
            </div>

            <!-- Scrollable Chat History List -->
            <div class="flex-1 overflow-y-auto min-h-0 chat-history-scroll">
              <div
                v-for="chat in chatList"
                :key="chat.id"
                @click="loadChatFromMobile(chat.id)"
                :class="[
                  'px-4 py-3 border-b border-green-100 cursor-pointer transition-colors hover:bg-[#BFD6BF] group flex flex-col gap-1',
                  currentChatId === chat.id ? 'bg-[#BFD6BF] border-l-4 border-l-[#2C702C]' : ''
                ]"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-800 truncate">
                      {{ getChatTitle(chat) }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ formatDate(chat.createdAt) }}
                    </p>
                  </div>
                  <button
                    @click.stop="deleteChat(chat.id)"
                    class="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs p-1.5 rounded transition opacity-0 group-hover:opacity-100"
                    :title="$t('chatbot.deleteChat')"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div v-if="chatList.length === 0" class="p-4 text-center text-gray-400 text-sm">
                {{ $t('chatbot.noChatHistory') }}
              </div>
            </div>
          </div>

          <!-- Messages -->
          <div 
            ref="chatBody" 
            class="absolute inset-0 overflow-y-auto p-2 sm:p-3 md:p-5 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100"
            :class="{ 'hidden md:block': showMobileChatHistory }"
          >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="['flex items-start gap-2 sm:gap-3', msg.sender === 'user' ? 'justify-end' : '']"
          >
<img
  v-if="msg.sender === 'bot'"
  src="/images/koko.png"
  class="w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0"
  :alt="$t('chatbot.kokoAlt')"
/>


            <div
              :class="[
                'px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm max-w-[82%] wrap-break-word leading-relaxed',
          msg.sender === 'bot'
            ? 'bg-[#2C702C] text-white shadow-sm'
            : 'bg-[#E0EBE0] border border-green-300 text-gray-800'
        ]"
            >
              <img
                v-if="msg.image"
                :src="msg.image"
                class="max-w-full rounded mb-2 border border-green-700"
          alt="uploaded waste item"
              />
              <div v-html="formatMessage(msg.text)" class="whitespace-pre-wrap"></div>
            </div>
          </div>

          <div v-if="isLoading" class="flex items-start gap-2 sm:gap-3">
      <img src="/images/koko.png" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full" :alt="$t('chatbot.kokoAlt')" />
      <div class="bg-[#2C702C] text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base">
        <span class="animate-pulse">{{ loadingText }}</span>
      </div>
    </div>
          </div>
        </div>

       <!-- Input Area -->
      <div class="border-t border-green-300 px-2 sm:px-4 py-2 sm:py-3 bg-[#E0EBE0] rounded-b-xl">
        <div v-if="imagePreview" class="mb-2 relative inline-block">
          <img
            :src="imagePreview"
            class="max-w-[100px] rounded border-2 border-[#2C702C]"
            :alt="$t('chatbot.preview')"
          />
          <button
            @click="clearImage"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600 font-bold"
          >
            ✕
          </button>
        </div>

        <div class="flex items-center gap-2 sm:gap-3 w-full">
          <!-- Upload -->
          <label
            class="cursor-pointer bg-[#2C702C] text-white p-2 sm:px-3 sm:py-2 rounded-lg hover:bg-[#265C26] transition flex items-center justify-center shrink-0"
            :title="$t('chatbot.uploadImageTitle')"
          >
            <img src="/images/icons8-camera-64.png" alt="Upload" class="w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="file"
              ref="fileInput"
              @change="handleImageUpload"
              accept="image/*"
              class="hidden"
              :disabled="isLoading"
            />
          </label>

          <!-- Input -->
          <input
            v-model="userInput"
            @keyup.enter="sendMessage"
            type="text"
            :placeholder="$t('chatbot.inputPlaceholder')"
            :disabled="isLoading"
            class="flex-1 min-w-0 px-3 sm:px-4 py-2 rounded-lg border border-green-300 focus:ring-2 focus:ring-[#2C702C] outline-none text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <!-- Send -->
          <button
            @click="sendMessage"
            :disabled="isLoading || (!userInput.trim() && !selectedImage)"
            class="bg-[#2C702C] text-white px-3 sm:px-4 py-1.5  rounded-lg hover:bg-[#265C26] transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0 whitespace-nowrap text-sm sm:text-base"
          >
            {{ $t('chatbot.send') }}
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: "ChatbotWidget",

  data() {
    return {
      isOpen: false,
      isFullscreen: false,
      showTooltip: true,
      showMobileChatHistory: false,
      userInput: "",
      messages: [],
      chatHistory: [],
      chatList: [],
      currentChatId: null,
      isLoading: false,
      loadingText: "",
      selectedImage: null,
      imagePreview: null,
      storageKey: "karakib_chat_history",

      // RAG data
      knowledgeBase: null,

      // Gemini AI
      genAI: null,
      textModel: null,
      visionModel: null,
      textModelCandidates: [],
      visionModelCandidates: [],
      textModelIndex: 0,
      visionModelIndex: 0,

      // Auth store reference
      authStore: null,

      // Dragging state
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      initialButtonX: 0,
      initialButtonY: 0,
      buttonX: null,
      buttonY: null,
      hasMoved: false,
      isTouchDevice: false,
      touchToggleHandled: false,
    };
  },

  async mounted() {
    this.authStore = useAuthStore();

    // Watch for auth state changes (login/logout)
    watch(
      () => this.authStore.user,
      (newUser, oldUser) => {
        // User logged in or out - update greeting if chat is open
        if (newUser?.name !== oldUser?.name && this.currentChatId) {
          this.updateWelcomeMessage();
        }
      },
      { deep: true }
    );

    // Load saved button position
    this.loadButtonPosition();

    // Add global event listeners for dragging
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.endDrag);
    document.addEventListener('touchmove', this.onDrag, { passive: false });
    document.addEventListener('touchend', this.endDrag);

    await this.initializeGemini();
    await this.loadKnowledgeBase();
    this.loadChatList();
  },

  computed: {
    userFirstName() {
      const fullName = this.authStore?.user?.name || "";
      if (!fullName) return ""; // Return empty string when logged out

      // Extract first name (text before first space)
      const firstName = fullName.trim().split(' ')[0];
      return firstName;
    },

    greetingText() {
      // If logged in: "Hello [FirstName]!"
      // If logged out: "Hello!"
      return this.userFirstName ? `Hello ${this.userFirstName}!` : "Hello!";
    },

    buttonPosition() {
      if (this.buttonX !== null && this.buttonY !== null) {
        return {
          bottom: `${this.buttonY}px`,
          right: `${this.buttonX}px`,
        };
      }
      return {
        bottom: '20px',
        right: '20px',
      };
    }
  },

  methods: {
    // Language detection: simple Arabic script check
    isArabicText(text) {
      if (!text) return false;
      return /[\u0600-\u06FF]/.test(text);
    },

    // Language detection: classify as 'ar', 'en', or 'other'
    detectLanguage(text) {
      if (this.isArabicText(text)) return 'ar';
      // Accented Latin letters or Spanish punctuation -> other
      if (/[\u00C0-\u024F¿¡]/.test(text)) return 'other';
      // Heuristic for English (majority basic Latin letters and common words)
      const letters = (text.match(/[A-Za-z]/g) || []).length;
      const nonSpace = (text.replace(/\s/g, '').length) || 1;
      const ratio = letters / nonSpace;
      const words = text.toLowerCase().split(/[^a-z]+/).filter(Boolean);
      const commonEn = new Set(['what','how','where','when','why','who','help','please','can','do','does','is','are','i','you','we','recycle','recycling','collection','request','pickup','points','shop','address','profile','account','cart','order','waste']);
      const enHits = words.filter(w => commonEn.has(w)).length;
      if (ratio > 0.6 || enHits >= 2) return 'en';
      return 'other';
    },

    // Translate known category names to Arabic for Arabic responses
    toArabicCategory(category) {
      const map = {
        'Plastic': 'بلاستيك',
        'Paper & Cardboard': 'ورق وكرتون',
        'Metal': 'معادن',
        'Wood': 'خشب',
        'Clothes': 'ملابس',
        'Cooking Oil': 'زيت طهي',
        'E-Waste': 'نفايات إلكترونية',
        'Home Appliances': 'أجهزة منزلية'
      };
      return map[category] || category;
    },

    // KB-aware context retrieval (uses provided kb object)
    retrieveRelevantContextFromKB(query, kb) {
      if (!kb) return { relevant: [], waste_type: null };

      const lowerQuery = (query || '').toLowerCase();
      let context = { relevant: [], waste_type: null };

      // Extract meaningful words from query (filter out common words)
      const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','is','are','was','were','be','been','have','has','had','do','does','did','will','would','can','could','should','may','might','this','that','these','those','i','you','he','she','it','we','they','what','how','when','where','why','who','ما','ماذا','كيف','أين','متى','من','لماذا','هل','هذه','هذا','ذلك']);
      const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w));

      // Detect waste type - more comprehensive matching
      (kb.waste_types || []).forEach(type => {
        const categoryLower = (type.category || '').toLowerCase();
        const matchesCategory = lowerQuery.includes(categoryLower) ||
          queryWords.some(qw => categoryLower.includes(qw) || qw.includes(categoryLower));
        const matchesItems = (type.accepted_items || []).some(item => {
          const itemLower = (item || '').toLowerCase();
          return lowerQuery.includes(itemLower) || queryWords.some(qw => itemLower.includes(qw) || qw.includes(itemLower));
        });
        if (matchesCategory || matchesItems) {
          context.waste_type = type;
          context.relevant.push(`WASTE TYPE: ${type.category}`);
          if (type.description) context.relevant.push(`Description: ${type.description}`);
          if (type.accepted_items?.length) context.relevant.push(`Accepted items: ${type.accepted_items.join(', ')}`);
          if (type.points_system) context.relevant.push(`Points: ${type.points_system}`);
          if (type.unit) context.relevant.push(`Unit: ${type.unit}`);
          if (type.preparation) context.relevant.push(`Preparation: ${type.preparation}`);
        }
      });

      // Pricing/points
      if (['price','cost','point','earn','reward','redeem','سعر','تكلفة','نقاط','اكسب','أكسب','استبدال'].some(k => lowerQuery.includes(k))) {
        (kb.waste_types || []).forEach(type => {
          if (type.points_system) context.relevant.push(`${type.category} points: ${type.points_system}`);
        });
        if (kb.rewards_program?.points_system) {
          const ps = kb.rewards_program.points_system;
          if (ps.earning) context.relevant.push(`Points earning: ${JSON.stringify(ps.earning, null, 2)}`);
          if (ps.redemption) context.relevant.push(`Points redemption: ${JSON.stringify(ps.redemption, null, 2)}`);
        }
      }

      // Collection process
      if (['how','process','collect','request','pickup','schedule','order','submit','كيف','عملية','تجميع','طلب','استلام','جدولة'].some(k => lowerQuery.includes(k))) {
        context.relevant.push('COLLECTION PROCESS:');
        (kb.collection_process?.steps || []).forEach(step => {
          context.relevant.push(`${step.step}. ${step.title}: ${step.description}`);
        });
      }

      // Service areas/contact
      if (['area','location','where','serve','available','city','منطقة','مدن','أين','تعملون','تغطية'].some(k => lowerQuery.includes(k))) {
        if (kb.company_info?.service_areas) context.relevant.push(`Service areas: ${kb.company_info.service_areas.join(', ')}`);
        if (kb.company_info?.operating_hours) context.relevant.push(`Operating hours: ${kb.company_info.operating_hours}`);
        if (kb.company_info?.languages) context.relevant.push(`Languages: ${Array.isArray(kb.company_info.languages) ? kb.company_info.languages.join(', ') : kb.company_info.languages}`);
      }
      if (['contact','email','phone','support','help','reach','تواصل','بريد','هاتف','دعم','اتصال'].some(k => lowerQuery.includes(k))) {
        if (kb.company_info?.contact?.email) context.relevant.push(`Contact email: ${kb.company_info.contact.email}`);
        if (kb.company_info?.contact?.phone) context.relevant.push(`Contact phone: ${kb.company_info.contact.phone}`);
        if (kb.company_info?.operating_hours) context.relevant.push(`Operating hours: ${kb.company_info.operating_hours}`);
      }

      // FAQs
      (kb.faqs || []).forEach(category => {
        (category.questions || []).forEach(qa => {
          const qLower = (qa.question || '').toLowerCase();
          const aLower = (qa.answer || '').toLowerCase();
          const matchesQuestion = queryWords.some(qw => qLower.includes(qw));
          const matchesAnswer = queryWords.some(qw => aLower.includes(qw));
          if (matchesQuestion || matchesAnswer) {
            context.relevant.push(`FAQ - Q: ${qa.question}\nA: ${qa.answer}`);
          }
        });
      });

      // Base info always
      const baseInfo = [
        `Company: ${kb.company_info?.name}`,
        `Description: ${kb.company_info?.description}`,
        `Mission: ${kb.company_info?.mission}`
      ];
      context.relevant = [...baseInfo, ...context.relevant];

      if (context.relevant.length < 5) {
        if (kb.company_info?.minimum_collection) context.relevant.push(`Minimum collection: ${kb.company_info.minimum_collection}`);
        const cats = (kb.waste_types || []).map(t => t.category).join(', ');
        if (cats) context.relevant.push(`We accept: ${cats}`);
      }

      const tips = kb.environmental_tips?.recycling_impact || [];
      if (tips.length > 0) {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        context.relevant.push(`💡 ECO TIP: ${randomTip}`);
      }

      return context;
    },

    async initializeGemini() {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        console.error("❌ GEMINI_API_KEY not found in .env file!");
        this.$toast?.error("Chatbot configuration error. Please contact support.");
        return;
      }

      this.genAI = new GoogleGenerativeAI(apiKey);
      
      // List of model names to try in order of preference
      // Based on the dropdown showing: Gemini Flash (Latest), Gemini Pro (Latest), etc.
      this.textModelCandidates = [
        "gemini-1.5-flash-latest",  // Matches "Gemini Flash (Latest)" in dropdown
        "gemini-1.5-flash",         // Alternative name
        "gemini-flash-latest",      // Another alias
        "gemini-1.5-pro-latest",    // Matches "Gemini Pro (Latest)" in dropdown
        "gemini-pro-latest",        // Alternative name
        "gemini-pro",               // Fallback to standard name
      ];

      this.visionModelCandidates = [
        "gemini-1.5-flash-latest",  // Flash models support multimodal
        "gemini-1.5-flash",
        "gemini-flash-latest",
        "gemini-1.5-pro-latest",    // Pro models also support vision
        "gemini-pro-latest",
        "gemini-pro-vision",        // Legacy vision model
        "gemini-pro",               // Fallback
      ];

      // Initialize with first model (will auto-fallback if it doesn't work)
      this.textModelIndex = 0;
      this.visionModelIndex = 0;
      this.textModel = this.genAI.getGenerativeModel({ model: this.textModelCandidates[0] });
      this.visionModel = this.genAI.getGenerativeModel({ model: this.visionModelCandidates[0] });

      console.log(`✅ Gemini API initialized. Will try models: ${this.textModelCandidates[0]} (text), ${this.visionModelCandidates[0]} (vision)`);
    },

    // Helper function to retry API calls with exponential backoff and model fallback
    async retryApiCall(apiCall, modelType = 'text', maxRetries = 3, baseDelay = 1000) {
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          return await apiCall();
        } catch (error) {
          // Extract error message from various error formats
          const errorStr = error?.message || error?.toString() || JSON.stringify(error) || '';
          const errorStrLower = errorStr.toLowerCase();
          
          // Check if it's a model not found error (404)
          const isModelNotFound = errorStrLower.includes('404') || 
                                 errorStrLower.includes('not found') || 
                                 errorStrLower.includes('not supported') ||
                                 errorStrLower.includes('is not found for api version');
          
          // If model not found, try next model in the list
          if (isModelNotFound) {
            const candidates = modelType === 'text' ? this.textModelCandidates : this.visionModelCandidates;
            const currentIndex = modelType === 'text' ? this.textModelIndex : this.visionModelIndex;
            
            if (currentIndex < candidates.length - 1) {
              // Try next model
              const nextIndex = currentIndex + 1;
              const nextModelName = candidates[nextIndex];
              console.warn(`⚠️ Model ${candidates[currentIndex]} not available, trying ${nextModelName}...`);
              
              // Update model
              if (modelType === 'text') {
                this.textModelIndex = nextIndex;
                this.textModel = this.genAI.getGenerativeModel({ model: nextModelName });
                console.log(`✅ Switched to text model: ${nextModelName}`);
              } else {
                this.visionModelIndex = nextIndex;
                this.visionModel = this.genAI.getGenerativeModel({ model: nextModelName });
                console.log(`✅ Switched to vision model: ${nextModelName}`);
              }
              
              // Retry with new model (don't count this as a retry attempt)
              try {
                return await apiCall();
              } catch (newError) {
                // If new model also fails, continue to next iteration
                continue;
              }
            } else {
              // No more models to try
              throw new Error(`No working ${modelType} model found. Tried: ${candidates.join(', ')}`);
            }
          }
          
          const isRateLimit = errorStrLower.includes('429') || 
                            errorStrLower.includes('rate limit') ||
                            errorStrLower.includes('quota exceeded') ||
                            errorStrLower.includes('retry');
          
          // Extract retry delay from error if available (e.g., "Please retry in 42.355703629s")
          let retryDelay = baseDelay * Math.pow(2, attempt);
          if (errorStrLower.includes('retry') || errorStrLower.includes('retrydelay')) {
            const retryMatch = errorStr.match(/(\d+(?:\.\d+)?)\s*s/);
            if (retryMatch) {
              retryDelay = Math.min(parseFloat(retryMatch[1]) * 1000 + 1000, 60000); // Max 60 seconds
            }
          }

          // Check for quota limit: 0 (no free tier available)
          const isQuotaZero = errorStrLower.includes('limit: 0') || 
                             (errorStrLower.includes('free_tier') && errorStrLower.includes('limit: 0'));
          
          // Only retry on rate limit errors (not quota: 0) and if we have retries left
          if (isRateLimit && !isQuotaZero && attempt < maxRetries - 1) {
            console.warn(`⚠️ Rate limit hit, retrying in ${(retryDelay / 1000).toFixed(1)}s... (attempt ${attempt + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            continue;
          }
          
          // If it's a quota error (limit: 0) or last attempt, throw the error
          if (isQuotaZero || attempt === maxRetries - 1) {
            throw error;
          }
        }
      }
    },

    async loadKnowledgeBase() {
      try {
        const response = await fetch('/knowledge-base.json');
        if (!response.ok) throw new Error(`Failed to load knowledge base: ${response.status} ${response.statusText}`);

        this.knowledgeBase = await response.json();
        const totalFaqs = this.knowledgeBase.faqs?.reduce((sum, cat) => sum + (cat.questions?.length || 0), 0) || 0;
        console.log("✅ Knowledge base loaded successfully:", {
          waste_types: this.knowledgeBase.waste_types?.length || 0,
          faq_categories: this.knowledgeBase.faqs?.length || 0,
          total_faq_questions: totalFaqs,
          company_name: this.knowledgeBase.company_info?.name || 'Unknown'
        });
      } catch (error) {
      console.error("❌ Failed to load knowledge-base.json:", error);
      this.$toast?.error(this.$t('chatbot.errors.knowledgeBaseFailed'));
    }
    },

    getSystemPrompt() {
      const userContext = this.userFirstName
        ? `The user's first name is "${this.userFirstName}". Address them naturally by their first name when appropriate.`
        : `The user is not logged in, so do not use any name to address them.`;

      return `You are Koko 🌱, a friendly recycling assistant for Karakib Waste Collection.

${userContext}

🚨 CRITICAL INSTRUCTIONS:
YOU MUST ONLY USE INFORMATION FROM THE CONTEXT PROVIDED BELOW. DO NOT USE ANY OUTSIDE KNOWLEDGE.

🎯 YOUR MISSION:
Answer questions using EXCLUSIVELY the provided context from our knowledge base. Reply in the user's language (Arabic or English) based on their message.

📋 STRICT RULES:
1. USE ONLY information from the CONTEXT section below
2. If the user asks a broad/general question (e.g., "what do you know about recycling?"), provide a concise overview from the context (company description, accepted waste types, high-level collection steps, points overview, eco fact)
3. If the user asks for specifics not present in the context, use a professional redirect IN THE USER'S LANGUAGE:
   - EN: "This topic is outside Karakib’s assistant scope. I can help with recycling and our services: accepted materials, requesting collections, points and rewards, donations, DIY ideas, and account support. Please ask about one of these areas."
   - AR: "هذا الموضوع خارج نطاق مساعد كراكِب. يمكنني مساعدتك في كل ما يتعلق بإعادة التدوير وخدماتنا: المواد المقبولة، طلبات التجميع، النقاط والمكافآت، التبرعات، أفكار إعادة الاستخدام، ودعم الحساب. من فضلك اسأل ضمن هذه المجالات."
4. DO NOT make up prices, points, addresses, or any details not in the context
5. DO NOT use general recycling knowledge - only use what's in the Karakib knowledge base
6. Be friendly, concise, and helpful
7. Use emojis to be engaging 🌿
8. ${this.userFirstName ? `When appropriate, address the user as "${this.userFirstName}" to personalize responses` : `Do not use any name since the user is not logged in`}

💬 TONE:
- Warm and encouraging
- Eco-conscious and positive
- Professional but friendly
- Keep answers concise (3-5 sentences) unless explaining a detailed process

🔒 ENFORCEMENT:
Before answering, check: "Is this in the CONTEXT below?" If NO → use the professional redirect in the user's language.`;
    },

  getWelcomeMessage() {
    return {
      sender: "bot",
      text: this.$t('chatbot.welcomeMessage', {
        greeting: this.greetingText,
        hint: `${this.$t('chatbot.bilingualHintEn')} ${this.$t('chatbot.bilingualHintAr')}`
      })
    };
  },

    updateWelcomeMessage() {
      // Update the first message (welcome message) with new greeting
      if (this.messages.length > 0 && this.messages[0].sender === 'bot') {
        this.messages[0] = this.getWelcomeMessage();
        this.saveCurrentChat();
      }
    },

    async sendMessage() {
      if (!this.userInput.trim() && !this.selectedImage) return;
      if (this.isLoading) return;
    if (!this.genAI) {
      this.$toast?.error(this.$t('chatbot.errors.notInitialized'));
      return;
    }

      if (!this.currentChatId) this.startNewChat();

      // Use current locale for default question if no user input
      const defaultQuestion = this.$i18n.locale === 'ar'
        ? "ماذا يمكنني أن أفعل بهذا العنصر؟"
        : "What can I do with this waste item?";
      const messageText = this.userInput.trim() || defaultQuestion;

      this.messages.push({
        sender: "user",
        text: messageText,
        image: this.imagePreview,
      });

      const currentImage = this.selectedImage;
      const currentText = messageText;

      this.userInput = "";
      this.clearImage();
    this.isLoading = true;
    this.loadingText = currentImage
      ? this.$t('chatbot.analyzingImage')
      : this.$t('chatbot.thinkingEmoji');
      this.$nextTick(() => this.scrollToBottom());

      try {
        let response;

        if (currentImage) {
          response = await this.analyzeImage(currentImage, currentText);
        } else {
          response = await this.sendTextChat(currentText);
        }

        this.messages.push({ sender: "bot", text: response });
        this.chatHistory.push(
          { role: "user", content: currentText },
          { role: "ai", content: response }
        );

        if (this.chatHistory.length > 40) {
          this.chatHistory = this.chatHistory.slice(-40);
        }

        this.saveCurrentChat();

      } catch (error) {
        console.error("Chatbot error:", error);
        const errorGreeting = this.userFirstName ? `Sorry ${this.userFirstName}` : "Sorry";
        let errorMessage = `${errorGreeting}, I encountered an error.\n\nPlease try again! 🌿`;
        
        // Extract error message from various error formats
        const errorStr = error?.message || error?.toString() || JSON.stringify(error) || '';
        const errorStrLower = errorStr.toLowerCase();
        
        // Handle specific error types
        if (errorStrLower.includes('quota') || errorStrLower.includes('quota exceeded') || errorStrLower.includes('limit: 0')) {
          const isArabic = this.$i18n.locale === 'ar';
          errorMessage = isArabic
            ? `${errorGreeting}، لقد تم تجاوز الحد المسموح للاستخدام المجاني.\n\nيرجى التحقق من:\n1. تم تفعيل Gemini API في Google Cloud Console\n2. تم تفعيل الفاتورة (حتى للاستخدام المجاني)\n3. الانتظار قليلاً ثم المحاولة مرة أخرى\n\nأو اتصل بالدعم الفني للحصول على المساعدة. 🌿`
            : `${errorGreeting}, the free tier quota has been exceeded.\n\nPlease check:\n1. Gemini API is enabled in Google Cloud Console\n2. Billing is enabled (even for free tier)\n3. Wait a moment and try again\n\nOr contact support for assistance. 🌿`;
        } else if (errorStrLower.includes('404') || errorStrLower.includes('not found') || errorStrLower.includes('not supported')) {
          const isArabic = this.$i18n.locale === 'ar';
          errorMessage = isArabic
            ? `${errorGreeting}، النموذج المحدد غير متاح.\n\nيرجى التحقق من أن Gemini API مفعل بشكل صحيح في Google Cloud Console أو اتصل بالدعم. 🌿`
            : `${errorGreeting}, the specified model is not available.\n\nPlease verify that Gemini API is properly enabled in Google Cloud Console or contact support. 🌿`;
        } else if (errorStrLower.includes('429') || errorStrLower.includes('rate limit') || errorStrLower.includes('retry')) {
          const isArabic = this.$i18n.locale === 'ar';
          errorMessage = isArabic
            ? `${errorGreeting}، تم تجاوز معدل الطلبات المسموح به.\n\nيرجى الانتظار قليلاً ثم المحاولة مرة أخرى. 🌿`
            : `${errorGreeting}, the request rate limit has been exceeded.\n\nPlease wait a moment and try again. 🌿`;
        } else if (errorStrLower.includes('api key') || errorStrLower.includes('authentication') || errorStrLower.includes('invalid api key')) {
          const isArabic = this.$i18n.locale === 'ar';
          errorMessage = isArabic
            ? `${errorGreeting}، هناك مشكلة في مصادقة API.\n\nيرجى التحقق من مفتاح API أو الاتصال بالدعم. 🌿`
            : `${errorGreeting}, there's an API authentication issue.\n\nPlease check the API key or contact support. 🌿`;
        }
        
        this.messages.push({
          sender: "bot",
          text: errorMessage,
        });
      } finally {
        this.isLoading = false;
        this.$nextTick(() => this.scrollToBottom());
      }
    },

    async sendTextChat(message) {
      if (!this.knowledgeBase) {
        console.warn("⚠️ Knowledge base not loaded yet, using fallback");
        return "I'm currently initializing. Please try again in a moment. 🌿";
      }


      const lowerMsg = message.toLowerCase().trim();
      const lang = this.detectLanguage(message);
      const isArabic = lang === 'ar';
      const isEnglish = lang === 'en';
      const userNamePrefix = this.userFirstName ? (isArabic ? `مرحبًا ${this.userFirstName}! ` : `Hi ${this.userFirstName}! `) : '';

      // Unsupported languages fallback (only EN/AR supported)
      if (lang === 'other') {
        return `We currently support assistance in English and Arabic only. Please switch to English or Arabic so I can help you effectively.\nنحن ندعم حاليًا العربية والإنجليزية فقط. يُرجى التحدث بالعربية أو الإنجليزية لكي أساعدك بأفضل شكل.`;
      }

      // Language capability intent (EN/AR)
      const enLangIntent = (
        lowerMsg.includes('do you understand arabic') ||
        lowerMsg.includes('do you speak arabic') ||
        lowerMsg.includes('do you support arabic') ||
        lowerMsg.includes('what languages') ||
        lowerMsg.includes('supported languages') ||
        lowerMsg.includes('do you understand english') ||
        lowerMsg.includes('do you speak english')
      );
      const arLangIntent = (
        lowerMsg.includes('هل') && (lowerMsg.includes('تفهم') || lowerMsg.includes('تتكلم') || lowerMsg.includes('تتحدث')) && (lowerMsg.includes('العربي') || lowerMsg.includes('العربية'))
        || lowerMsg.includes('ما اللغات') || lowerMsg.includes('اللغات المدعومة') || lowerMsg.includes('بتفهم عربي')
      );
      if (enLangIntent || arLangIntent) {
        return isArabic
          ? `${userNamePrefix}نعم — أفهم وأرد بالعربية والإنجليزية. يمكنك السؤال بأي منهما.`
          : `${userNamePrefix}Yes — I understand and reply in English and Arabic. Feel free to use either language.`;
      }

      // EN: Generic language capability question about a specific non-EN/AR language
      if (isEnglish) {
        const m = lowerMsg.match(/do you\s+(speak|understand|support)\s+([a-z]+)/);
        if (m && m[2] && !['english','arabic','ar','en'].includes(m[2])) {
          const askedLang = m[2].charAt(0).toUpperCase() + m[2].slice(1);
          return `${userNamePrefix}I don’t speak ${askedLang}. I currently support English and Arabic.`;
        }
      }

      // Choose KB based on language
      const kb = isArabic && this.knowledgeBase.ar ? this.knowledgeBase.ar : this.knowledgeBase;

      // Arabic: Website name intent
      if (isArabic && (
        (lowerMsg.includes('ما') && lowerMsg.includes('اسم') && (lowerMsg.includes('الموقع') || lowerMsg.includes('الموقع الإلكتروني') || lowerMsg.includes('ويبسايت') || lowerMsg.includes('ويب')))
        || (lowerMsg.includes('اسم الموقع'))
        || (lowerMsg.includes('اسم الويبسايت'))
      )) {
        const siteName = kb.company_info?.name || 'Karakib';
        return `${userNamePrefix}اسم موقعنا هو ${siteName}.`;
      }

      // Arabic: Accepted materials
      if (isArabic && (
        lowerMsg.includes('المواد المقبولة') || (lowerMsg.includes('ايه') && lowerMsg.includes('بتاخدوا')) || lowerMsg.includes('بتستقبلوا') || lowerMsg.includes('بتستلموا') || lowerMsg.includes('أنواع المخلفات')
      )) {
        const categoriesAr = (kb.waste_types || []).map(t => t.category).join('، ');
        return `${userNamePrefix}نقبل الأنواع التالية من المخلفات: ${categoriesAr}. لمزيد من التفاصيل، اسألني عن أي نوع بالتحديد.`;
      }

      // Arabic: Service areas
      if (isArabic && (
        lowerMsg.includes('المناطق') || lowerMsg.includes('المدن') || (lowerMsg.includes('فين') && lowerMsg.includes('تشتغلوا')) || lowerMsg.includes('تغطية') || lowerMsg.includes('تعملون أين')
      )) {
        const areas = kb.company_info?.service_areas?.join('، ') || 'القاهرة، الجيزة، الإسكندرية';
        return `${userNamePrefix}نحن نغطي حاليًا: ${areas}. نعمل على التوسع قريبًا.`;
      }

      // Arabic: Working hours
      if (isArabic && (
        lowerMsg.includes('ساعات العمل') || lowerMsg.includes('مواعيد العمل') || (lowerMsg.includes('امتى') && (lowerMsg.includes('تشتغلوا') || lowerMsg.includes('فاتحين')))
      )) {
        const hours = kb.company_info?.operating_hours || 'من الأحد إلى الخميس، 9 صباحًا حتى 5 مساءً';
        return `${userNamePrefix}ساعات العمل: ${hours}.`;
      }

      // Arabic: Contact info
      if (isArabic && (
        lowerMsg.includes('تواصل') || lowerMsg.includes('الدعم') || lowerMsg.includes('الاتصال') || lowerMsg.includes('الايميل') || lowerMsg.includes('البريد') || lowerMsg.includes('رقم')
      )) {
        const email = kb.company_info?.contact?.email || 'karakib@gmail.com';
        const phone = kb.company_info?.contact?.phone || '19123';
        return `${userNamePrefix}يمكنك التواصل معنا عبر البريد: ${email} أو الهاتف: ${phone}.`;
      }

      // Arabic: Points system / earnings tracking
      if (isArabic && (
        lowerMsg.includes('نقاط') || lowerMsg.includes('أرباحي') || lowerMsg.includes('ارباحي') || (lowerMsg.includes('ازاي') && lowerMsg.includes('اكسب')) || (lowerMsg.includes('كيف') && (lowerMsg.includes('أكسب') || lowerMsg.includes('اكسب')))
      )) {
        return `${userNamePrefix}لمتابعة أرباحك (نقاطك)، اذهب إلى ملفك الشخصي واضغط على 'نقاطي'. سترى رصيد نقاطك الحالي، وسجل النقاط المكتسبة، وجميع الحركات الخاصة بالنقاط.`;
      }

      // Arabic: Donations
      if (isArabic && (
        lowerMsg.includes('تبرع') || lowerMsg.includes('التبرعات') || (lowerMsg.includes('أسباب') && lowerMsg.includes('تبرع'))
      )) {
        return `${userNamePrefix}يمكنك التبرع بنقاطك لعدة مجالات مثل التعليم، إعادة التشجير، والصحة المجتمعية. يمكنك اختيار التبرع أثناء طلب التجميع أو من قسم نقاطي في ملفك.`;
      }

      // Arabic: Shop/products
      if (isArabic && (
        lowerMsg.includes('متجر') || lowerMsg.includes('منتجات') || lowerMsg.includes('تسوق')
      )) {
        return `${userNamePrefix}يمكنك استخدام النقاط لشراء منتجات من متجرنا (منتجات صديقة للبيئة وبضائع بعلامة كراكِب). بعض المنتجات يمكن شراؤها بالمال أيضًا.`;
      }

      // Arabic: Addresses / Account
      if (isArabic && (
        lowerMsg.includes('عنوان') || lowerMsg.includes('عناوين') || lowerMsg.includes('حساب') || lowerMsg.includes('ملفي') || lowerMsg.includes('البروفايل')
      )) {
        return `${userNamePrefix}من ملفك الشخصي، يمكنك إضافة عناوين متعددة، تحديث بياناتك، ومتابعة طلباتك ونقاطك. ستختار عنوان الاستلام عند طلب التجميع.`;
      }

      // Arabic: How to request collection intent
      if (isArabic && (
        lowerMsg.includes('طلب تجميع') || (lowerMsg.includes('كيف') && (lowerMsg.includes('اطلب') || lowerMsg.includes('أطلب') || lowerMsg.includes('طلب')) && (lowerMsg.includes('تجميع') || lowerMsg.includes('استلام') || lowerMsg.includes('جمع')))
      )) {
        const stepsArList = [
          '1. إنشاء حساب — سجّل باستخدام بريدك الإلكتروني أو حساب جوجل، ثم فعّل رقم هاتفك وأضف عنوان التجميع في ملفك.',
          "2. إضافة المخلفات — من صفحة 'أضف مخلفاتك' اختر الأنواع المناسبة وأضف العناصر إلى السلة (سترى النقاط لكل عنصر).",
          '3. مراجعة السلة — راجع العناصر والكميات ويمكنك التعديل قبل المتابعة.',
          "4. طلب التجميع — انتقل للدفع، اختر عنوان الاستلام وطريقة الاستفادة (نقاط أو تبرع) وأضف ملاحظاتك.",
          '5. معالجة الطلب — نراجع طلبك ونعين مندوبًا لك، وستصلك إشعارات بالحالة.',
          '6. استلام المندوب — يصل المندوب، يتحقق من المخلفات ويستلمها (قد تحتاج لمسح QR).',
          '7. إضافة النقاط — تُضاف نقاطك فور إتمام الاستلام ويمكنك استخدامها مباشرة.'
        ].join('\n');
        return `${userNamePrefix}لطلب تجميع المخلفات معنا، اتبع الخطوات التالية:\n${stepsArList}\n\nإن احتجت مساعدة في أي خطوة، أخبرني وسأوضحها لك.`;
      }

      // Handle broad recycling questions with a direct, deterministic answer
      const isGeneralRecycling = (
        lowerMsg === 'what do you know about recycling?' ||
        lowerMsg === 'what do you know about recycling' ||
        lowerMsg === 'what is recycling?' ||
        lowerMsg === 'what is recycling' ||
        lowerMsg.startsWith('tell me about recycling') ||
        (lowerMsg.includes('about recycling') && !lowerMsg.includes('price') && !lowerMsg.includes('points')) ||
        // Arabic variants
        lowerMsg.includes('اعادة التدوير') || lowerMsg.includes('إعادة التدوير') || lowerMsg.includes('ما هي إعادة التدوير') || lowerMsg.includes('عن إعادة التدوير')
      );

      if (isGeneralRecycling) {
        const categoriesRaw = (kb.waste_types || []).map(t => t.category) || [];
        const categoriesEn = categoriesRaw.join(', ');
        const categoriesAr = categoriesRaw.join('، ');
        const steps = kb.collection_process?.steps?.length
          ? 'Create an account → Add waste to your cart → Review → Request collection → Courier pickup → Points credited'
          : '';
        const features = this.knowledgeBase.rewards_program?.features || {};
        const pointsSummaryEn = [features.point_tracking, features.instant_credit, features.flexible_redemption, features.donation_options]
          .filter(Boolean)
          .join(', ');
        const impact = (kb.environmental_tips?.recycling_impact || [])[0] || '';

        if (isArabic) {
          const stepsAr = 'أنشئ حسابًا → أضف المخلفات إلى السلة → راجع → اطلب التجميع → استلام من المندوب → تُضاف النقاط';
          const pointsSummaryAr = 'تتبع النقاط، إضافة فورية، طرق استخدام مرنة، وخيارات التبرع';
          return `${userNamePrefix}إعادة التدوير هي عملية جمع ومعالجة المواد التي قد تُرمى عادةً، وتحويلها إلى منتجات جديدة للحفاظ على الموارد وتقليل المخلفات.\n\nفي كراكِب، نجعل إعادة التدوير سهلة ومجزية:\n- المواد المقبولة: ${categoriesAr || 'أنواع متعددة من مخلفات المنزل'}\n- كيف تعمل الخدمة: ${steps ? stepsAr : 'اطلب تجميعًا واكسب نقاطًا مقابل المخلفات المقبولة'}\n- النقاط والأثر: ${pointsSummaryEn ? pointsSummaryAr : 'اكسب نقاطًا واستخدمها بمرونة، بما في ذلك التبرعات'}\n\n♻️ ${impact || 'كل خطوة تُحدث فرقًا — إعادة التدوير يوفر الطاقة ويقلل الانبعاثات.'}`;
        }

        return `${userNamePrefix}Recycling is the process of collecting and processing materials that would otherwise be thrown away, turning them into new products to save resources and reduce waste.\n\nAt Karakib, we make recycling simple and rewarding:\n- Accepted materials: ${categoriesEn || 'Multiple household waste types'}\n- How it works: ${steps || 'Request a collection and earn points for accepted waste'}\n- Points & impact: ${pointsSummaryEn || 'Earn points and use them flexibly, including donations'}\n\n♻️ ${impact || 'Every action counts—recycling helps conserve energy and reduce emissions.'}`;
      }

      // Retrieve context using language-appropriate KB
      const retrievedContext = this.retrieveRelevantContextFromKB(message, kb);

      // Log context retrieval for debugging
      console.log("📚 Context retrieved:", {
        query: message.substring(0, 50),
        context_items: retrievedContext.relevant.length,
        has_waste_type: !!retrievedContext.waste_type
      });

      // Relevance & out-of-scope
      const relevanceKeywordsEn = ['recycle','recycling','collect','collection','pickup','waste','points','donate','shop','address','profile','account','cart','order','request','courier','product'];
      const relevanceKeywordsAr = ['إعادة','تدوير','تجميع','استلام','مخلفات','نقاط','تبرع','متجر','عنوان','ملف','حساب','سلة','طلب','مندوب','منتج'];
      const hasRelevantKeyword = (isEnglish ? relevanceKeywordsEn : relevanceKeywordsAr).some(k => lowerMsg.includes(k));

      const BASE_CONTEXT_MIN = 5;
      const isOutOfScope = !hasRelevantKeyword && retrievedContext.relevant.length < BASE_CONTEXT_MIN;
      if (isOutOfScope) {
        return isArabic
          ? 'هذا الموضوع خارج نطاق مساعد كراكِب. يمكنني مساعدتك في كل ما يتعلق بإعادة التدوير وخدماتنا: المواد المقبولة، طلبات التجميع، النقاط والمكافآت، التبرعات، أفكار إعادة الاستخدام، ودعم الحساب. من فضلك اسأل ضمن هذه المجالات.'
          : "This topic is outside Karakib’s assistant scope. I can help with recycling and our services: accepted materials, requesting collections, points and rewards, donations, DIY ideas, and account support. Please ask about one of these areas.";
      }

      // Build context
      const contextText = retrievedContext.relevant.join('\n');

      // Language steering
      const languageInstruction = isArabic
        ? 'الرجاء الرد باللغة العربية فقط وبأسلوب مهني وودود. ترجم أي نص وارد من السياق إلى العربية صياغةً طبيعية، ولا تستخدم كلمات إنجليزية على الإطلاق، باستثناء اسم المستخدم إن وُجد.'
        : 'Please respond in English only, with a professional and friendly tone.';

      let prompt = `${this.getSystemPrompt()}\n\nLANGUAGE: ${isArabic ? 'Arabic' : 'English'}\n${languageInstruction}\n
=== CONTEXT FROM KNOWLEDGE BASE (USE ONLY THIS INFORMATION) ===
${contextText}
=== END CONTEXT ===

⚠️ REMINDER: Answer ONLY using the information in the CONTEXT above. If the answer is not in the context, use the professional redirect message from the instructions.
`;

      const recentHistory = this.chatHistory.slice(-20);
      if (recentHistory.length > 0) {
        prompt += "\n=== CONVERSATION HISTORY ===\n";
        recentHistory.forEach(msg => {
          const userName = this.userFirstName || (isArabic ? 'المستخدم' : 'User');
          prompt += `${msg.role === "ai" ? "Koko" : userName}: ${msg.content}\n`;
        });
        prompt += "=== END HISTORY ===\n\n";
      }

      const userName = this.userFirstName || (isArabic ? 'المستخدم' : 'User');
      prompt += `${userName}: ${message}\n\n⚠️ IMPORTANT: If the user's question refers to something in the conversation history, use that context!\n\nKoko:`;

      // Use retry mechanism for API calls (with automatic model fallback)
      const result = await this.retryApiCall(() => this.textModel.generateContent(prompt), 'text');
      return result.response.text();
    },

    async analyzeImage(imageFile, userPrompt) {
      const base64Image = await this.fileToBase64(imageFile);

      // Detect language from user prompt
      const lang = this.detectLanguage(userPrompt);
      const isArabic = lang === 'ar';
      const isEnglish = lang === 'en';

      // Use appropriate knowledge base based on language
      const kb = isArabic && this.knowledgeBase.ar ? this.knowledgeBase.ar : this.knowledgeBase;

      // Handle unsupported languages
      if (lang === 'other') {
        return `We currently support assistance in English and Arabic only. Please switch to English or Arabic so I can help you effectively.\nنحن ندعم حاليًا العربية والإنجليزية فقط. يُرجى التحدث بالعربية أو الإنجليزية لكي أساعدك بأفضل شكل.`;
      }

      const userContext = this.userFirstName
        ? (isArabic ? `تحليل صورة لمستخدم اسمه ${this.userFirstName}.` : `Analyzing for ${this.userFirstName}.`)
        : (isArabic ? `تحليل صورة لهذا العنصر من المخلفات.` : `Analyzing this waste item.`);

      const userNamePrefix = this.userFirstName ? (isArabic ? `مرحبًا ${this.userFirstName}! ` : `Hello ${this.userFirstName}! `) : '';

      // Language-specific instructions
      const languageInstruction = isArabic
        ? '⚠️ مهم جدًا: يجب أن ترد باللغة العربية فقط وبأسلوب مهني وودود. لا تستخدم أي كلمات إنجليزية في الرد، باستثناء اسم المستخدم إن وُجد. ترجم جميع المعلومات من قاعدة المعرفة إلى العربية بشكل طبيعي.'
        : 'Please respond in English only, with a professional and friendly tone.';

      // Build knowledge base context
      const wasteTypesInfo = JSON.stringify(kb?.waste_types || [], null, 2);
      const minCollection = kb?.company_info?.minimum_collection || '';

      // Build prompt based on language
      let visionPrompt;

      if (isArabic) {
        visionPrompt = `أنت كوكو 🌱، مساعد إعادة التدوير الودود لكراكِب. ${userContext}

${this.getSystemPrompt()}

⚠️ تعليمات اللغة: ${languageInstruction}

=== معلومات قاعدة المعرفة ===
${wasteTypesInfo}

الحد الأدنى للتجميع: ${minCollection}
=== نهاية قاعدة المعرفة ===

📸 السؤال من المستخدم: "${userPrompt}"

قم بتحليل الصورة وقدم:

1. **ما هو هذا العنصر؟** 🔍
2. **فحص الكمية** ⚖️ (عنصر واحد أم كمية كبيرة 1 كجم+؟)
3. **التوصية** 💡
   - عنصر واحد: قدم 3-5 أفكار لإعادة الاستخدام (DIY)
   - كمية كبيرة: اشرح عملية التجميع مع التسعير
4. **نصيحة بيئية** 🌍

استخدم المعلومات من قاعدة المعرفة. كن ودودًا وعمليًا! 🌱

⚠️ تذكر: يجب أن ترد باللغة العربية فقط.`;
      } else {
        visionPrompt = `You are Koko 🌱, analyzing a waste item image. ${userContext}

${this.getSystemPrompt()}

⚠️ LANGUAGE INSTRUCTIONS: ${languageInstruction}

=== KNOWLEDGE BASE INFO ===
${wasteTypesInfo}

Minimum collection: ${minCollection}
=== END KNOWLEDGE BASE ===

📸 QUESTION: "${userPrompt}"

Analyze the image and provide:

1. **What is it?** 🔍
2. **Quantity Check** ⚖️ (single item or bulk 1kg+?)
3. **Recommendation** 💡
   - Single item: Give 3-5 DIY ideas
   - Bulk: Explain collection with pricing
4. **Eco Tip** 🌍

Use information from the knowledge base. Be friendly and practical! 🌱`;
      }

      const imagePart = {
        inlineData: {
          data: base64Image.split(',')[1],
          mimeType: imageFile.type,
        },
      };

      // Use retry mechanism for API calls (with automatic model fallback)
      const result = await this.retryApiCall(() => this.visionModel.generateContent([visionPrompt, imagePart]), 'vision');
      return result.response.text();
    },

    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },

  async handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(this.$t('chatbot.errors.invalidImage'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(this.$t('chatbot.errors.imageTooLarge'));
      return;
    }

      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    clearImage() {
      this.selectedImage = null;
      this.imagePreview = null;
      if (this.$refs.fileInput) this.$refs.fileInput.value = "";
    },

    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        if (!this.currentChatId) this.startNewChat();
        this.$nextTick(() => this.scrollToBottom());
      } else {
        // Close mobile chat history when closing chatbot
        this.showMobileChatHistory = false;
      }
    },

    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      this.$nextTick(() => this.scrollToBottom());
    },

    startNewChat() {
      if (this.currentChatId && this.messages.length > 1) {
        this.saveCurrentChat();
      }

      const newChatId = Date.now().toString();
      this.currentChatId = newChatId;

      // Use computed greeting message
      this.messages = [this.getWelcomeMessage()];
      this.chatHistory = [];

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

    loadChatList() {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          this.chatList = JSON.parse(stored);
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

    loadChat(chatId) {
      if (this.currentChatId && this.currentChatId !== chatId && this.messages.length > 1) {
        this.saveCurrentChat();
      }

      const chat = this.chatList.find((c) => c.id === chatId);
      if (chat) {
        this.currentChatId = chatId;
        this.messages = JSON.parse(JSON.stringify(chat.messages));
        this.chatHistory = JSON.parse(JSON.stringify(chat.chatHistory || []));

        const index = this.chatList.findIndex((c) => c.id === chatId);
        if (index > 0) {
          this.chatList.splice(index, 1);
          this.chatList.unshift(chat);
          this.saveChatList();
        }

        this.$nextTick(() => this.scrollToBottom());
      }
    },

    startNewChatFromMobile() {
      this.startNewChat();
      this.showMobileChatHistory = false;
    },

    loadChatFromMobile(chatId) {
      this.loadChat(chatId);
      this.showMobileChatHistory = false;
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
      if (confirm(this.$t('chatbot.confirmDelete'))) {
        const index = this.chatList.findIndex((c) => c.id === chatId);
        if (index !== -1) {
          this.chatList.splice(index, 1);
          this.saveChatList();
          if (this.currentChatId === chatId) {
            this.startNewChat();
            // Close mobile overlay if open so user can see the new chat
            this.showMobileChatHistory = false;
          }
        }
      }
    },

  getChatTitle(chat) {
    const firstUserMessage = chat.messages?.find((m) => m.sender === "user");
    if (firstUserMessage) {
      const title = firstUserMessage.text.substring(0, 30);
      return title.length < firstUserMessage.text.length ? title + "..." : title;
    }
    return chat.title || this.$t('chatbot.newChat');
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return this.$t('chatbot.justNow');
    if (diffMins < 60) return this.$t('chatbot.minutesAgo', { count: diffMins });
    if (diffHours < 24) return this.$t('chatbot.hoursAgo', { count: diffHours });
    if (diffDays < 7) return this.$t('chatbot.daysAgo', { count: diffDays });
    return date.toLocaleDateString(this.$i18n.locale);
  },

    formatMessage(text) {
      if (!text) return "";
      return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/###\s*(.*?)(\n|$)/g, '<strong style="font-size: 1.1em; display: block; margin: 0.5em 0;">$1</strong>')
        .replace(/##\s*(.*?)(\n|$)/g, '<strong style="font-size: 1.15em; display: block; margin: 0.5em 0;">$1</strong>')
        .replace(/\n/g, "<br>");
    },

    scrollToBottom() {
      const body = this.$refs.chatBody;
      if (body) {
        setTimeout(() => {
          body.scrollTop = body.scrollHeight;
        }, 100);
      }
    },

    // Dragging methods
    getEventCoordinates(e) {
      if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    },

    startDrag(e) {
      // Don't prevent default on mousedown to allow text selection elsewhere
      if (e.type === 'touchstart') {
        e.preventDefault();
        this.isTouchDevice = true;
        this.touchToggleHandled = false;
      } else {
        this.isTouchDevice = false;
      }
      this.isDragging = true;
      this.hasMoved = false;

      const coords = this.getEventCoordinates(e);
      this.dragStartX = coords.x;
      this.dragStartY = coords.y;

      // Get current button position and store as initial position
      if (this.buttonX === null || this.buttonY === null) {
        this.buttonX = 20;
        this.buttonY = 20;
      }
      this.initialButtonX = this.buttonX;
      this.initialButtonY = this.buttonY;
    },

    onDrag(e) {
      if (!this.isDragging) return;

      e.preventDefault();
      const coords = this.getEventCoordinates(e);

      // Calculate delta from initial drag start position
const deltaX = coords.x - this.dragStartX;  // positive when dragging right
const deltaY = coords.y - this.dragStartY;  // positive when dragging down
 // Y increases downward, but bottom increases upward

      // Check if user has moved enough to consider it a drag
      const moveThreshold = 0;
      if (Math.abs(deltaX) > moveThreshold || Math.abs(deltaY) > moveThreshold) {
        this.hasMoved = true;
      }

      // Calculate new position based on initial button position + delta
      // For X: moving left (decreasing clientX) should increase right value
      // For Y: moving down (increasing clientY) should decrease bottom value
      const speed = 1.4;
      this.buttonX -= deltaX * speed;
      this.buttonY -= deltaY * speed;


      this.dragStartX = coords.x;
      this.dragStartY = coords.y;

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Button dimensions (use larger size for mobile)
      const buttonSize = window.innerWidth >= 768 ? 56 : 40; // md:w-14 = 56px, w-10 = 40px

      // Constrain to viewport bounds
      const maxX = viewportWidth - buttonSize - 10;
      const maxY = viewportHeight - buttonSize - 10;
      const minX = 10;
      const minY = 10;

      this.buttonX = Math.max(minX, Math.min(maxX, this.buttonX));
      this.buttonY = Math.max(minY, Math.min(maxY, this.buttonY));

    },

    endDrag(e) {
      if (!this.isDragging) return;

      const wasDragging = this.hasMoved;
      this.isDragging = false;

      // Save position to localStorage
      this.saveButtonPosition();

      // If no movement, toggle chat
      if (!wasDragging) {
        if (this.isTouchDevice) {
          // For touch, handle toggle here and mark it as handled
          this.touchToggleHandled = true;
          setTimeout(() => {
            this.toggleChat();
          }, 10);
        } else {
          // For mouse, let the click handler handle it
          // But set a flag to prevent double-toggle
          this.touchToggleHandled = false;
        }
      } else {
        this.touchToggleHandled = true; // Prevent click after drag
      }

      // Reset hasMoved for next interaction
      setTimeout(() => {
        this.hasMoved = false;
        this.touchToggleHandled = false;
      }, 150);
    },

    handleClick(e) {
      // Prevent click handler on touch devices (handled in endDrag)
      if (this.touchToggleHandled) {
        return;
      }
      // Only handle click if we haven't dragged (for mouse clicks)
      if (!this.hasMoved && !this.isDragging) {
        this.toggleChat();
      }
    },

    loadButtonPosition() {
      try {
        const saved = localStorage.getItem('karakib_chatbot_position');
        if (saved) {
          const position = JSON.parse(saved);
          this.buttonX = position.x;
          this.buttonY = position.y;
        }
      } catch (error) {
        console.error('Error loading button position:', error);
      }
    },

    saveButtonPosition() {
      try {
        if (this.buttonX !== null && this.buttonY !== null) {
          localStorage.setItem('karakib_chatbot_position', JSON.stringify({
            x: this.buttonX,
            y: this.buttonY
          }));
        }
      } catch (error) {
        console.error('Error saving button position:', error);
      }
    },
  },

  beforeUnmount() {
    this.saveCurrentChat();
    // Remove global event listeners
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.endDrag);
    document.removeEventListener('touchmove', this.onDrag);
    document.removeEventListener('touchend', this.endDrag);
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; transform: scale(0.97); }
  100% { opacity: 1; transform: scale(1); }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.overflow-y-auto::-webkit-scrollbar { width: 6px; }
.overflow-y-auto::-webkit-scrollbar-track { background: #f1f1f1; }
.overflow-y-auto::-webkit-scrollbar-thumb { background: #2C702C; border-radius: 3px; }
.overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #265C26; }

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #9ec79e;
  border-radius: 9999px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #eaf2ea;
}

/* Hide scrollbar on mobile for chat history */
.chat-history-scroll {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}

.chat-history-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
