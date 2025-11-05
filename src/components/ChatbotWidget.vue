<template>
  <div class="fixed bottom-5 right-5 z-50">
    <!-- Tooltip (shows before opening chatbot) -->
    <div
      v-if="!isOpen && showTooltip"
      class="absolute bottom-16 right-0 bg-[#D4E7D4] border-2 border-[#2C702C] rounded-lg shadow-lg p-3 mb-2 w-[320px] animate-fadeIn"
    >
      <button
        @click="showTooltip = false"
        class="absolute top-1 right-1 text-gray-500 hover:text-gray-700 text-sm leading-none w-5 h-5 flex items-center justify-center"
      >
        ✕
      </button>
      <div class="pr-6">
        <h4 class="font-bold text-[#2C702C] text-sm mb-1.5">🌱 Koko AI Powered Helper</h4>
        <p class="text-xs text-gray-700 leading-snug">
          Get instant help with waste sorting, recycling tips, DIY ideas, and collection scheduling. Upload images or ask questions!
        </p>
      </div>
    </div>

    <!-- Floating Button (always visible) -->
    <button
      @click="toggleChat"
      class="bg-[#2C702C] text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-[#265C26] transition relative z-50"
    >
      <img src="/images/koko.png" alt="koko" class="w-full h-full rounded-full" />
    </button>

    <!-- Chat Window -->
    <div
      v-if="isOpen"
      :class="[
        'absolute bottom-16 right-0 bg-green-50 border-2 border-[#2C702C] rounded-xl flex shadow-xl animate-fadeIn overflow-hidden',
        isFullscreen ? 'w-[900px] h-[600px]' : 'w-[400px] h-[600px]'
      ]"
    >
      <!-- Left Sidebar - Chat History (only visible in fullscreen) -->
      <div v-if="isFullscreen" class="w-64 bg-[#EAF2EA] border-r border-green-200 flex flex-col">
        <div class="bg-[#235723] text-white px-4 py-3 flex items-center justify-between h-13">
          <span class="font-semibold text-sm">Chat History</span>
        </div>

        <!-- New Chat Button -->
        <div class="px-3 py-2 border-b border-green-200">
          <button
            @click="startNewChat"
            class="w-full bg-[#E0EBE0] hover:bg-[#265C26] text-[#2C702C] text-sm px-3 py-2 rounded-md transition flex items-center justify-center gap-2"
            title="Start New Chat"
          >
            <img src="../../public/images/icons8-add-to-chat-50.png" alt="" class="size-6">
            <span>New Chat</span>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div
            v-for="chat in chatList"
            :key="chat.id"
            @click="loadChat(chat.id)"
            :class="[
              'px-4 py-3 border-b border-green-100 cursor-pointer transition-colors hover:bg-[#BFD6BF] group',
              currentChatId === chat.id ? 'bg-[#BFD6BF] border-l-4 border-l-[#2C702C]' : ''
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

          <div v-if="chatList.length === 0" class="p-4 text-center text-gray-400 text-sm">
            No chat history yet.<br />Start a new conversation!
          </div>
        </div>
      </div>

      <!-- Right Side - Main Chat Area -->
      <div class="flex-1 flex flex-col bg-[#BFD6BF]">
        <div class="bg-[#2C702C] text-white flex justify-between items-center px-4 py-3">
          <span class="font-semibold tracking-wide block text-center w-full">Koko AI Helper</span>
          <div class="flex items-center gap-2">
            <button 
              class="hover:text-green-200 text-xl" 
              @click="toggleFullscreen" 
              :title="isFullscreen ? 'Minimize' : 'Fullscreen'"
            >
              {{ isFullscreen ? '⤡' : '⤢' }}
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

          <div v-if="isLoading" class="flex items-start gap-2">
            <img src="/images/koko.png" class="w-8 h-8 rounded-full" alt="Koko" />
            <div class="bg-[#2C702C] text-white px-3 py-2 rounded-lg text-sm">
              <span class="animate-pulse">{{ loadingText }}</span>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-green-300 px-3 py-2 bg-[#E0EBE0] rounded-b-xl">
          <div v-if="imagePreview" class="mb-2 relative inline-block">
            <img :src="imagePreview" class="max-w-[100px] rounded border-2 border-[#2C702C]" alt="preview" />
            <button
              @click="clearImage"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 font-bold"
            >
              ✕
            </button>
          </div>

          <div class="flex items-center gap-2 w-full">
            <label
              class="cursor-pointer bg-[#2C702C] text-white px-3 py-2 rounded-lg hover:bg-[#265C26] transition flex items-center justify-center flex-shrink-0"
              title="Upload waste image for DIY ideas"
            >
              <img src="../../public/images/icons8-camera-64.png" alt="" class="size-6">
              <input
                type="file"
                ref="fileInput"
                @change="handleImageUpload"
                accept="image/*"
                class="hidden"
                :disabled="isLoading"
              />
            </label>

            <input
              v-model="userInput"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Ask about recycling"
              :disabled="isLoading"
              class="flex-1 min-w-0 px-3 py-2 rounded-lg border border-green-300 focus:ring-2 focus:ring-[#2C702C] outline-none text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            />

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
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';

export default {
  name: "ChatbotWidget",
  
  data() {
    return {
      isOpen: false,
      isFullscreen: false,
      showTooltip: true,
      userInput: "",
      messages: [],
      chatHistory: [],
      chatList: [],
      currentChatId: null,
      isLoading: false,
      loadingText: "Thinking...",
      selectedImage: null,
      imagePreview: null,
      storageKey: "karakib_chat_history",
      
      // RAG data
      knowledgeBase: null,
      
      // Gemini AI
      genAI: null,
      textModel: null,
      visionModel: null,
      
      // Auth store reference
      authStore: null,
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
    }
  },

  methods: {
    async initializeGemini() {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        console.error("❌ GEMINI_API_KEY not found in .env file!");
        this.$toast?.error("Chatbot configuration error. Please contact support.");
        return;
      }

      this.genAI = new GoogleGenerativeAI(apiKey);
      this.textModel = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      this.visionModel = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      console.log("✅ Gemini API configured");
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
        console.error("Error details:", error.message);
        this.$toast?.error("Failed to load chatbot knowledge base. Some features may not work correctly.");
      }
    },

    retrieveRelevantContext(query) {
      if (!this.knowledgeBase) return { relevant: [], waste_type: null };

      const lowerQuery = query.toLowerCase();
      let context = { relevant: [], waste_type: null };

      // Extract meaningful words from query (filter out common words)
      const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'can', 'could', 'should', 'may', 'might', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'how', 'when', 'where', 'why', 'who']);
      const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));

      // Detect waste type - more comprehensive matching
      this.knowledgeBase.waste_types?.forEach(type => {
        const categoryLower = type.category.toLowerCase();
        const matchesCategory = lowerQuery.includes(categoryLower) || 
                                queryWords.some(qw => categoryLower.includes(qw) || qw.includes(categoryLower));
        const matchesItems = type.accepted_items?.some(item => {
          const itemLower = item.toLowerCase();
          return lowerQuery.includes(itemLower) || 
                 queryWords.some(qw => itemLower.includes(qw) || qw.includes(itemLower));
        });
        
        if (matchesCategory || matchesItems) {
          context.waste_type = type;
          context.relevant.push(`WASTE TYPE: ${type.category}`);
          if (type.description) context.relevant.push(`Description: ${type.description}`);
          context.relevant.push(`Accepted items: ${type.accepted_items.join(', ')}`);
          if (type.points_system) context.relevant.push(`Points: ${type.points_system}`);
          if (type.unit) context.relevant.push(`Unit: ${type.unit}`);
          if (type.preparation) context.relevant.push(`Preparation: ${type.preparation}`);
          if (type.diy_suggestions?.single_item) {
            context.relevant.push(`DIY ideas available for single items: ${type.diy_suggestions.single_item.join('; ')}`);
          }
        }
      });

      // Check for pricing/points keywords
      if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('point') || 
          lowerQuery.includes('earn') || lowerQuery.includes('reward') || lowerQuery.includes('redeem')) {
        this.knowledgeBase.waste_types?.forEach(type => {
          if (type.points_system) {
            context.relevant.push(`${type.category} points: ${type.points_system}`);
          }
        });
        // Add points system info from rewards_program
        if (this.knowledgeBase.rewards_program?.points_system) {
          const pointsInfo = this.knowledgeBase.rewards_program.points_system;
          if (pointsInfo.earning) {
            context.relevant.push(`Points earning: ${JSON.stringify(pointsInfo.earning, null, 2)}`);
          }
          if (pointsInfo.redemption) {
            context.relevant.push(`Points redemption: ${JSON.stringify(pointsInfo.redemption, null, 2)}`);
          }
        }
      }

      // Collection process - more keywords
      if (lowerQuery.includes('how') || lowerQuery.includes('process') || lowerQuery.includes('collect') ||
          lowerQuery.includes('request') || lowerQuery.includes('pickup') || lowerQuery.includes('schedule') ||
          lowerQuery.includes('order') || lowerQuery.includes('submit')) {
        context.relevant.push("COLLECTION PROCESS:");
        this.knowledgeBase.collection_process?.steps?.forEach(step => {
          context.relevant.push(`${step.step}. ${step.title}: ${step.description}`);
          if (step.details) {
            step.details.forEach(detail => context.relevant.push(`  - ${detail}`));
          }
          if (step.features) {
            step.features.forEach(feature => context.relevant.push(`  - ${feature}`));
          }
        });
      }

      // Service areas - more keywords
      if (lowerQuery.includes('area') || lowerQuery.includes('location') || lowerQuery.includes('where') ||
          lowerQuery.includes('serve') || lowerQuery.includes('available') || lowerQuery.includes('city')) {
        context.relevant.push(`Service areas: ${this.knowledgeBase.company_info?.service_areas?.join(', ')}`);
        context.relevant.push(`Operating hours: ${this.knowledgeBase.company_info?.operating_hours}`);
        context.relevant.push(`Languages: ${this.knowledgeBase.company_info?.languages?.join(', ')}`);
      }

      // Contact info - more keywords
      if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') ||
          lowerQuery.includes('support') || lowerQuery.includes('help') || lowerQuery.includes('reach')) {
        context.relevant.push(`Contact email: ${this.knowledgeBase.company_info?.contact?.email}`);
        context.relevant.push(`Contact phone: ${this.knowledgeBase.company_info?.contact?.phone}`);
        context.relevant.push(`Operating hours: ${this.knowledgeBase.company_info?.operating_hours}`);
        if (this.knowledgeBase.company_info?.contact?.social_media) {
          const social = this.knowledgeBase.company_info.contact.social_media;
          context.relevant.push(`Social media: Facebook ${social.facebook}, Instagram ${social.instagram}, Twitter ${social.twitter}`);
        }
      }

      // Donation questions
      if (lowerQuery.includes('donat') || lowerQuery.includes('charity') || lowerQuery.includes('cause') ||
          lowerQuery.includes('give') || lowerQuery.includes('contribute')) {
        this.knowledgeBase.faqs?.forEach(category => {
          if (category.category === "Donations") {
            category.questions?.forEach(qa => {
              context.relevant.push(`FAQ - Q: ${qa.question}\nA: ${qa.answer}`);
            });
          }
        });
        if (this.knowledgeBase.rewards_program?.points_system?.redemption?.donations) {
          const donations = this.knowledgeBase.rewards_program.points_system.redemption.donations;
          context.relevant.push(`Donation options: ${JSON.stringify(donations, null, 2)}`);
        }
      }

      // Shop/Products questions
      if (lowerQuery.includes('shop') || lowerQuery.includes('buy') || lowerQuery.includes('product') ||
          lowerQuery.includes('merch') || lowerQuery.includes('store') || lowerQuery.includes('purchase')) {
        this.knowledgeBase.faqs?.forEach(category => {
          if (category.category === "Shop & Products") {
            category.questions?.forEach(qa => {
              context.relevant.push(`FAQ - Q: ${qa.question}\nA: ${qa.answer}`);
            });
          }
        });
      }

      // Account/Profile questions
      if (lowerQuery.includes('account') || lowerQuery.includes('profile') || lowerQuery.includes('password') ||
          lowerQuery.includes('sign up') || lowerQuery.includes('register') || lowerQuery.includes('login') ||
          lowerQuery.includes('address') || lowerQuery.includes('update')) {
        this.knowledgeBase.faqs?.forEach(category => {
          if (category.category === "Account & Profile" || category.category === "Getting Started" || 
              category.category === "Addresses & Pickup") {
            category.questions?.forEach(qa => {
              context.relevant.push(`FAQ - Q: ${qa.question}\nA: ${qa.answer}`);
            });
          }
        });
      }

      // Comprehensive FAQs matching - check both question and answer
      this.knowledgeBase.faqs?.forEach(category => {
        category.questions?.forEach(qa => {
          const qLower = qa.question.toLowerCase();
          const aLower = qa.answer.toLowerCase();
          
          // Check if query words appear in question or answer
          const matchesQuestion = queryWords.some(qw => qLower.includes(qw)) || 
                                 queryWords.some(qw => qLower.split(' ').some(qWord => qWord.includes(qw) || qw.includes(qWord)));
          const matchesAnswer = queryWords.some(qw => aLower.includes(qw)) ||
                               queryWords.some(qw => aLower.split(' ').some(aWord => aWord.includes(qw) || qw.includes(aWord)));
          
          // Also check if question keywords appear in query
          const questionWords = qLower.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
          const matchesQuestionKeywords = questionWords.some(qWord => lowerQuery.includes(qWord));
          
          if (matchesQuestion || matchesAnswer || matchesQuestionKeywords) {
            context.relevant.push(`FAQ - Q: ${qa.question}\nA: ${qa.answer}`);
          }
        });
      });

      // Always include company basics for context (at the beginning)
      const baseInfo = [
        `Company: ${this.knowledgeBase.company_info?.name}`,
        `Description: ${this.knowledgeBase.company_info?.description}`,
        `Mission: ${this.knowledgeBase.company_info?.mission}`
      ];
      context.relevant = [...baseInfo, ...context.relevant];

      // Add company details if we don't have much context
      if (context.relevant.length < 5) {
        context.relevant.push(`Minimum collection: ${this.knowledgeBase.company_info?.minimum_collection}`);
        context.relevant.push(`Service areas: ${this.knowledgeBase.company_info?.service_areas?.join(', ')}`);
        context.relevant.push(`Operating hours: ${this.knowledgeBase.company_info?.operating_hours}`);
        const wasteCategories = this.knowledgeBase.waste_types?.map(type => type.category).join(", ");
        if (wasteCategories) {
          context.relevant.push(`We accept: ${wasteCategories}`);
        }
      }

      // Always add eco tip if available
      const tips = this.knowledgeBase.environmental_tips?.recycling_impact || [];
      if (tips.length > 0) {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        context.relevant.push(`💡 ECO TIP: ${randomTip}`);
      }

      return context;
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
Answer questions using EXCLUSIVELY the provided context from our knowledge base. If the answer is not in the context, gracefully redirect to what you CAN help with.

📋 STRICT RULES:
1. USE ONLY information from the CONTEXT section below
2. If information is NOT in the context, respond professionally: "I'd be happy to help you with questions about recycling, our waste collection services, accepted materials, the points system, scheduling pickups, or DIY ideas. Could you please rephrase your question, or would you like to know more about any of these topics?"
3. DO NOT make up prices, points, addresses, or any details not in the context
4. DO NOT use general recycling knowledge - only use what's in the Karakib knowledge base
5. Be friendly, concise, and helpful
6. Use emojis to be engaging 🌿
7. ${this.userFirstName ? `When appropriate, address the user as "${this.userFirstName}" to personalize responses` : `Do not use any name since the user is not logged in`}

💬 TONE:
- Warm and encouraging
- Eco-conscious and positive
- Professional but friendly
- Keep answers concise (3-5 sentences) unless explaining a detailed process

🔒 ENFORCEMENT:
Before answering, check: "Is this information in the CONTEXT below?" If NO → politely redirect to topics you can help with from the context.`;
    },

    getWelcomeMessage() {
      return {
        sender: "bot",
        text: `${this.greetingText} I'm Koko, your assistant for **Karakib** 🌱\n\n**I can help you with:**\n• How our collection service works\n• What materials we accept\n• Scheduling a pickup\n• Creative DIY ideas for small waste items\n• General recycling tips\n\nAsk me anything! 💚`
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
        this.$toast?.error("Chatbot not initialized. Please refresh the page.");
        return;
      }

      if (!this.currentChatId) this.startNewChat();

      const messageText = this.userInput.trim() || "What can I do with this waste item?";

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
      this.loadingText = currentImage ? "Analyzing image... 🔍" : "Thinking... 💭";
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
        this.messages.push({
          sender: "bot",
          text: `${errorGreeting}, I encountered an error.\n\nPlease try again! 🌿`,
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

      const retrievedContext = this.retrieveRelevantContext(message);
      
      // Log context retrieval for debugging
      console.log("📚 Context retrieved:", {
        query: message.substring(0, 50),
        context_items: retrievedContext.relevant.length,
        has_waste_type: !!retrievedContext.waste_type
      });
      
      // Build comprehensive context - always include some base info
      const contextText = retrievedContext.relevant.join('\n');
      
      let prompt = `${this.getSystemPrompt()}

=== CONTEXT FROM KNOWLEDGE BASE (USE ONLY THIS INFORMATION) ===
${contextText}
=== END CONTEXT ===

⚠️ REMINDER: Answer ONLY using the information in the CONTEXT above. If the answer is not in the context, use the professional redirect message from the instructions.
`;

      const recentHistory = this.chatHistory.slice(-20);
      if (recentHistory.length > 0) {
        prompt += "\n=== CONVERSATION HISTORY ===\n";
        recentHistory.forEach(msg => {
          const userName = this.userFirstName || "User";
          prompt += `${msg.role === "ai" ? "Koko" : userName}: ${msg.content}\n`;
        });
        prompt += "=== END HISTORY ===\n\n";
      }

      const userName = this.userFirstName || "User";
      prompt += `${userName}: ${message}\n\n⚠️ IMPORTANT: If the user's question refers to something in the conversation history, use that context!\n\nKoko:`;

      const result = await this.textModel.generateContent(prompt);
      return result.response.text();
    },

    async analyzeImage(imageFile, userPrompt) {
      const base64Image = await this.fileToBase64(imageFile);
      
      const userContext = this.userFirstName 
        ? `Analyzing for ${this.userFirstName}.`
        : `Analyzing this waste item.`;
      
      const visionPrompt = `You are Koko 🌱, analyzing a waste item image. ${userContext}

=== KNOWLEDGE BASE INFO ===
${JSON.stringify(this.knowledgeBase?.waste_types, null, 2)}

Minimum collection: ${this.knowledgeBase?.company_info?.minimum_collection}
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

      const imagePart = {
        inlineData: {
          data: base64Image.split(',')[1],
          mimeType: imageFile.type,
        },
      };

      const result = await this.visionModel.generateContent([visionPrompt, imagePart]);
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

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB");
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
          if (this.currentChatId === chatId) {
            this.startNewChat();
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
  },

  beforeUnmount() {
    this.saveCurrentChat();
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
</style>