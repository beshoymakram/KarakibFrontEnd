// chatbot-server.js - RAG Implementation
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// ==================== LOAD KNOWLEDGE BASE ====================
let knowledgeBase;
try {
  const kbPath = path.join(__dirname, 'knowledge-base.json');
  console.log(`📂 Loading knowledge base from: ${kbPath}`);
  const kbData = fs.readFileSync(kbPath, 'utf8');
  knowledgeBase = JSON.parse(kbData);
  console.log("✅ Knowledge base loaded successfully");
  console.log(`   - Waste types: ${knowledgeBase.waste_types.length}`);
  console.log(`   - FAQ categories: ${knowledgeBase.faqs.length}`);
  console.log(`   - Total FAQ questions: ${knowledgeBase.faqs.reduce((sum, cat) => sum + cat.questions.length, 0)}`);
} catch (error) {
  console.error("❌ Failed to load knowledge-base.json:", error.message);
  console.error(`   Tried path: ${path.join(__dirname, 'knowledge-base.json')}`);
  console.error("   Please ensure knowledge-base.json exists in the same folder as chatbot-server.js");
  process.exit(1);
}

// ==================== CORS MIDDLEWARE ====================
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

app.use(express.json({ limit: '10mb' }));

// ==================== FILE UPLOAD SETUP ====================
const uploadsDir = path.join(__dirname, 'uploads');
const upload = multer({ 
  dest: uploadsDir,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// ==================== GEMINI SETUP ====================
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY not found in .env file!");
  console.error("Get your key at: https://makersuite.google.com/app/apikey");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const textModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
const visionModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

console.log("✅ Gemini API configured");

// ==================== RAG: RETRIEVE RELEVANT CONTEXT ====================
function retrieveRelevantContext(query) {
  const lowerQuery = query.toLowerCase();
  let context = {
    relevant: [],
    waste_type: null
  };

  // Detect waste type from query
  knowledgeBase.waste_types.forEach(type => {
    const categoryLower = type.category.toLowerCase();
    if (lowerQuery.includes(categoryLower) || 
        type.accepted_items.some(item => lowerQuery.includes(item.toLowerCase()))) {
      context.waste_type = type;
      context.relevant.push(`WASTE TYPE: ${type.category}`);
      if (type.description) {
        context.relevant.push(`Description: ${type.description}`);
      }
      context.relevant.push(`Accepted items: ${type.accepted_items.join(', ')}`);
      if (type.points_system) {
        context.relevant.push(`Points: ${type.points_system}`);
      }
      if (type.unit) {
        context.relevant.push(`Unit: ${type.unit}`);
      }
      if (type.preparation) {
        context.relevant.push(`Preparation: ${type.preparation}`);
      }
      if (type.diy_suggestions && type.diy_suggestions.single_item) {
        context.relevant.push(`DIY ideas available - ask Koko for suggestions!`);
      }
    }
  });

  // Check for specific keywords
  if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('pay') || lowerQuery.includes('point')) {
    knowledgeBase.waste_types.forEach(type => {
      context.relevant.push(`${type.category}: Points per unit (varies by item, check 'Add Waste' page for specific values)`);
      if (type.points_system) {
        context.relevant.push(`${type.category} points: ${type.points_system}`);
      }
    });
  }

  if (lowerQuery.includes('how') || lowerQuery.includes('process') || lowerQuery.includes('collect')) {
    context.relevant.push("COLLECTION PROCESS:");
    knowledgeBase.collection_process.steps.forEach(step => {
      context.relevant.push(`${step.step}. ${step.title}: ${step.description}`);
    });
  }

  // Service areas and contact info
  if (lowerQuery.includes('area') || lowerQuery.includes('location') || lowerQuery.includes('where') || lowerQuery.includes('serve')) {
    context.relevant.push(`Service areas: ${knowledgeBase.company_info.service_areas.join(', ')}`);
    context.relevant.push(`Operating hours: ${knowledgeBase.company_info.operating_hours}`);
  }
  
  // Contact information
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('support')) {
    context.relevant.push(`Contact email: ${knowledgeBase.company_info.contact.email}`);
    context.relevant.push(`Contact phone: ${knowledgeBase.company_info.contact.phone}`);
    context.relevant.push(`Operating hours: ${knowledgeBase.company_info.operating_hours}`);
  }
  
  // Donation questions
  if (lowerQuery.includes('donat') || lowerQuery.includes('charity') || lowerQuery.includes('cause')) {
    if (knowledgeBase.rewards_program && knowledgeBase.rewards_program.points_system) {
      const donations = knowledgeBase.rewards_program.points_system.redemption?.donations;
      if (donations) {
        context.relevant.push(`Donation options: ${JSON.stringify(donations, null, 2)}`);
      }
    }
    // Add FAQ answers about donations
    knowledgeBase.faqs.forEach(category => {
      if (category.category === "Donations") {
        category.questions.forEach(qa => {
          context.relevant.push(`FAQ - Q: ${qa.question}\nA: ${qa.answer}`);
        });
      }
    });
  }
  
  // Shop/Products questions
  if (lowerQuery.includes('shop') || lowerQuery.includes('buy') || lowerQuery.includes('product') || lowerQuery.includes('merch')) {
    knowledgeBase.faqs.forEach(category => {
      if (category.category === "Shop & Products") {
        category.questions.forEach(qa => {
          context.relevant.push(`FAQ - Q: ${qa.question}\nA: ${qa.answer}`);
        });
      }
    });
  }
  
  // Account/Profile questions
  if (lowerQuery.includes('account') || lowerQuery.includes('profile') || lowerQuery.includes('password') || lowerQuery.includes('sign up') || lowerQuery.includes('register')) {
    knowledgeBase.faqs.forEach(category => {
      if (category.category === "Account & Profile" || category.category === "Getting Started") {
        category.questions.forEach(qa => {
          context.relevant.push(`FAQ - Q: ${qa.question}\nA: ${qa.answer}`);
        });
      }
    });
  }

  // Check FAQs for relevant info - More comprehensive matching
  knowledgeBase.faqs.forEach(category => {
    category.questions.forEach(qa => {
      const qLower = qa.question.toLowerCase();
      const aLower = qa.answer.toLowerCase();
      
      // Match if any question words appear in query, or if query matches question keywords
      const qWords = qLower.split(/\s+/).filter(w => w.length > 2); // Filter out short words
      const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
      
      // Check if significant words from question appear in query
      const hasCommonWords = qWords.some(qWord => lowerQuery.includes(qWord)) || 
                             queryWords.some(qw => qLower.includes(qw));
      
      // Check if answer contains keywords from query
      const answerMatches = queryWords.some(qw => aLower.includes(qw));
      
      if (hasCommonWords || answerMatches) {
        context.relevant.push(`FAQ - Q: ${qa.question}\nA: ${qa.answer}`);
      }
    });
  });

  // Add company basics if no specific match
  if (context.relevant.length === 0) {
    context.relevant.push(`Company: ${knowledgeBase.company_info.name}`);
    context.relevant.push(`Minimum collection: ${knowledgeBase.company_info.minimum_collection}`);
    const wasteCategories = knowledgeBase.waste_types.map(type => type.category).join(", ");
    context.relevant.push(`We accept: ${wasteCategories}`);
  }

  // Add random environmental tip
  const tips = knowledgeBase.environmental_tips.recycling_impact || [];
  if (tips.length > 0) {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    context.relevant.push(`💡 ECO TIP: ${randomTip}`);
  }

  return context;
}

// ==================== SYSTEM PROMPT FOR RAG ====================
const RAG_SYSTEM_PROMPT = `You are Koko 🌱, a friendly recycling assistant for Karakib Waste Collection.

🚨 CRITICAL INSTRUCTIONS:
YOU MUST ONLY USE INFORMATION FROM THE CONTEXT PROVIDED BELOW. DO NOT USE ANY OUTSIDE KNOWLEDGE OR GENERAL INFORMATION.

🎯 YOUR MISSION:
Answer questions using EXCLUSIVELY the provided context from our knowledge base. If the answer is not in the context, explicitly state that.

📋 STRICT RULES:
1. USE ONLY information from the CONTEXT section below - nothing else
2. If information is NOT in the context, say: "I don't have that specific information in my knowledge base, but I can help you with..." and suggest what you CAN help with from the context
3. DO NOT make up prices, points, addresses, or any details not explicitly in the context
4. DO NOT use general recycling knowledge - only use what's in the Karakib knowledge base
5. For small items, suggest DIY ideas ONLY if they appear in the context's DIY suggestions
6. Be friendly, concise, and helpful
7. Use emojis to be engaging 🌿

💬 TONE:
- Warm and encouraging
- Eco-conscious and positive
- Professional but friendly
- Keep answers concise (3-5 sentences) unless explaining a detailed process

🔒 ENFORCEMENT:
Before answering, check: "Is this information in the CONTEXT below?" If NO → say you don't have that info and offer alternatives from the context.`;

// ==================== TEXT CHAT WITH RAG ====================
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log("💬 Chat:", message.substring(0, 60) + "...");

    // STEP 1: RETRIEVE relevant context from knowledge base
    const retrievedContext = retrieveRelevantContext(message);
    
    console.log("📚 Retrieved context:", retrievedContext.relevant.length, "items");
    if (retrievedContext.relevant.length > 0) {
      console.log("   First context item:", retrievedContext.relevant[0].substring(0, 80) + "...");
    } else {
      console.warn("⚠️  WARNING: No context retrieved! Using fallback information.");
    }

    // STEP 2: Build prompt with retrieved context
    const contextText = retrievedContext.relevant.length > 0 
      ? retrievedContext.relevant.join('\n')
      : `Company: ${knowledgeBase.company_info.name}\nDescription: ${knowledgeBase.company_info.description}\nContact: ${knowledgeBase.company_info.contact.email}`;
    
    let prompt = `${RAG_SYSTEM_PROMPT}

=== CONTEXT FROM KNOWLEDGE BASE (USE ONLY THIS INFORMATION) ===
${contextText}
=== END CONTEXT ===

⚠️ REMINDER: Answer ONLY using the information in the CONTEXT above. If the answer isn't there, say so explicitly.

`;

    // Add conversation history with context extraction
    const recentHistory = history.slice(-20); // Keep more history for better context
    if (recentHistory.length > 0) {
      prompt += "\n=== CONVERSATION HISTORY (IMPORTANT - USE THIS FOR CONTEXT) ===\n";
      recentHistory.forEach(msg => {
        prompt += `${msg.role === "ai" ? "Koko" : "User"}: ${msg.content}\n`;
      });
      prompt += "=== END HISTORY ===\n\n";
      
      // Extract context from recent conversation
      const conversationText = recentHistory.map(msg => msg.content).join(' ');
      const historyContext = retrieveRelevantContext(conversationText);
      if (historyContext.relevant.length > 0) {
        prompt += `\n=== CONTEXT FROM RECENT CONVERSATION ===\n`;
        // Add unique context items not already in main context
        const existingContext = new Set(retrievedContext.relevant);
        historyContext.relevant.forEach(item => {
          if (!existingContext.has(item)) {
            retrievedContext.relevant.push(item);
            prompt += `${item}\n`;
          }
        });
        prompt += `=== END CONVERSATION CONTEXT ===\n\n`;
      }
    }

    // Add current question with explicit context reminder
    prompt += `User: ${message}\n\n⚠️ IMPORTANT: If the user's question refers to something mentioned in the CONVERSATION HISTORY above (like "it", "that item", "plastic chair", etc.), use the history to understand what they're referring to!\n\nKoko:`;

    // STEP 3: GENERATE response using Gemini
    const result = await textModel.generateContent(prompt);
    const response = result.response.text();
    
    console.log("✅ Response generated (length:", response.length, "chars)");
    console.log("   Response preview:", response.substring(0, 100) + "...");
    
    res.json({ response });

  } catch (error) {
    console.error("❌ Chat error:", error.message);
    
    let errorMessage = "Sorry, I'm having trouble right now. Please try again! 🌿";
    
    if (error.message?.includes('API_KEY')) {
      errorMessage = "API key issue. Please check configuration.";
    } else if (error.message?.includes('quota') || error.message?.includes('429')) {
      errorMessage = "Too many requests! Please wait a moment. ⏰";
    }

    res.status(500).json({ error: errorMessage });
  }
});

// ==================== IMAGE ANALYSIS WITH RAG ====================
app.post("/api/vision", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const userPrompt = req.body.prompt || "What can I do with this?";
    console.log("🖼️  Image:", req.file.originalname);

    // Read image
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = req.file.mimetype;

    // Build vision prompt with knowledge base
    const visionPrompt = `You are Koko 🌱, analyzing a waste item image.

=== KNOWLEDGE BASE INFO ===
${JSON.stringify(knowledgeBase.waste_types, null, 2)}

Minimum collection: ${knowledgeBase.company_info.minimum_collection}
=== END KNOWLEDGE BASE ===

📸 USER QUESTION: "${userPrompt}"

Analyze the image and provide:

1. **What is it?** 🔍
   - Identify the waste item and material

2. **Quantity Check** ⚖️
   - Is this a single small item or bulk waste (1kg+)?

3. **Recommendation** 💡
   - If SINGLE SMALL ITEM: Give 3-5 DIY recycling ideas from knowledge base
   - If BULK (1kg+): Explain they can schedule collection with price per kg

4. **Eco Tip** 🌍
   - Share one environmental fact about this material

Use information from the knowledge base above. Be friendly and practical! 🌱`;

    // Call Gemini Vision
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const result = await visionModel.generateContent([visionPrompt, imagePart]);
    const description = result.response.text();

    // Clean up
    fs.unlinkSync(req.file.path);

    console.log("✅ Image analyzed");
    res.json({ description });

  } catch (error) {
    console.error("❌ Vision error:", error.message);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    let errorMessage = "Sorry, couldn't analyze that image. Try again! 📷";
    
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      errorMessage = "Too many requests! Please wait a moment. ⏰";
    }

    res.status(500).json({ error: errorMessage });
  }
});

// ==================== HEALTH CHECK ====================
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    gemini: !!process.env.GEMINI_API_KEY,
    knowledge_base_loaded: !!knowledgeBase,
    knowledge_base_path: path.join(__dirname, 'knowledge-base.json'),
    knowledge_base_stats: knowledgeBase ? {
      waste_types: knowledgeBase.waste_types.length,
      faq_categories: knowledgeBase.faqs.length,
      total_faq_questions: knowledgeBase.faqs.reduce((sum, cat) => sum + cat.questions.length, 0),
      company_name: knowledgeBase.company_info.name
    } : null,
    timestamp: new Date().toISOString()
  });
});

// ==================== TEST CONTEXT RETRIEVAL ====================
app.get("/api/test-context", (req, res) => {
  const testQuery = req.query.q || "How do I collect waste?";
  const context = retrieveRelevantContext(testQuery);
  
  res.json({
    query: testQuery,
    context_items_count: context.relevant.length,
    context_items: context.relevant,
    waste_type_found: !!context.waste_type,
    waste_type: context.waste_type?.category || null
  });
});

// ==================== CREATE UPLOADS FOLDER ====================
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✅ Created uploads folder at:", uploadsDir);
}

// ==================== START SERVER ====================
const server = app.listen(PORT, () => {
  console.log("\n" + "=".repeat(55));
  console.log("🌱 Koko RAG Chatbot Server - Ready!");
  console.log("=".repeat(55));
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🔗 Frontend: http://localhost:5173`);
  console.log(`✅ Gemini AI: Connected`);
  console.log(`📚 Knowledge Base: ${knowledgeBase.waste_types.length} waste types loaded`);
  console.log("=".repeat(55) + "\n");
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.error(`Change PORT in .env or kill the process`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});