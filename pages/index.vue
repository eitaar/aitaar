
<template>
  <background />
  
  <!-- Header with logo/branding -->
  <header class="absolute top-0 w-full p-6 z-20" role="banner">
    <div class="flex items-center justify-center">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" 
             role="img" aria-label="AItaar AI logo">
          <span class="text-white font-bold text-lg">AI</span>
        </div>
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AItaar
        </h1>
      </div>
    </div>
  </header>

  <!-- Welcome message -->
  <div v-if="!isChatting" class="absolute w-full top-[40%] -translate-y-1/2 px-6">
    <div class="text-center space-y-4">
      <h2 class="text-white text-[4vmin] md:text-5xl font-bold font-Roboto mb-2 animate-fade-in">
        What can I help with?
      </h2>
      <p class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-delay">
        Ask me anything and I'll do my best to help you find the answer.
      </p>
    </div>
  </div>

  <!-- Input section -->
  <div class="fixed bottom-0 w-full p-6 z-20" :class="{ 'bottom-6': isChatting }" role="region" aria-label="Message input area">
    <div class="max-w-4xl mx-auto">
      <div class="relative">
        <label for="message-input" class="sr-only">Type your message to AItaar</label>
        <input 
          id="message-input"
          v-model="text" 
          type="text" 
          placeholder="Message AItaar..."
          class="input-field w-full h-14 text-white bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl outline-none pl-6 pr-16 text-lg font-Roboto placeholder-slate-400 transition-all duration-300 focus:border-blue-500/50 focus:bg-slate-700/80 focus:shadow-lg focus:shadow-blue-500/20"
          @keyup.enter="startChat"
          @focus="inputFocused = true"
          @blur="inputFocused = false"
          aria-describedby="send-button-help"
        >
        <button 
          id="send-button"
          @click="startChat"
          :disabled="!text.trim()"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          aria-label="Send message"
          :aria-describedby="text.trim() ? 'send-button-help' : undefined"
        >
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
        <div id="send-button-help" class="sr-only">Press Enter or click the send button to send your message</div>
      </div>
    </div>
  </div>
  
  <!-- Chat area -->
  <div v-if="isChatting" class="chat-area fixed inset-0 pt-20 pb-24 px-6 overflow-hidden" role="main" aria-label="Chat conversation">
    <div class="max-w-4xl mx-auto h-full">
      <div class="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent" 
           role="log" aria-live="polite" aria-label="Chat messages">
        <div class="space-y-6 pb-6">
          <div v-for="(message, index) in messages" :key="index" 
               class="message-container animate-slide-in"
               :style="{ animationDelay: `${index * 100}ms` }"
               role="group"
               :aria-label="`${index % 2 === 0 ? 'Your' : 'AI'} message ${Math.floor(index / 2) + 1}`">
            
            <!-- User message -->
            <div v-if="index % 2 === 0" class="flex justify-end">
              <div class="message user-message max-w-[80%] bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl rounded-br-md shadow-lg" 
                   role="article" aria-label="Your message">
                <p class="whitespace-pre-wrap">{{ message }}</p>
                <div class="text-xs opacity-70 mt-2" role="note" aria-label="Message sent at">{{ formatTime(Date.now()) }}</div>
              </div>
            </div>
            
            <!-- AI message -->
            <div v-else class="flex justify-start">
              <div class="flex space-x-3 max-w-[80%]">
                <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mt-1" 
                     role="img" aria-label="AI assistant avatar">
                  <span class="text-white text-sm font-bold">AI</span>
                </div>
                <div class="message ai-message bg-slate-800/80 backdrop-blur-sm border border-slate-600/30 text-white p-4 rounded-2xl rounded-bl-md shadow-lg" 
                     role="article" aria-label="AI response">
                  <p class="whitespace-pre-wrap">{{ displayMessages[index] }}</p>
                  <div v-if="isTyping && index === messages.length - 1" class="typing-indicator mt-2" aria-label="AI is typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div v-else class="text-xs opacity-70 mt-2" role="note" aria-label="Message received at">{{ formatTime(Date.now()) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";

const text = ref("");
const isChatting = ref(false);
const messages = ref([]);
const displayMessages = ref([]);
const isTyping = ref(false);
const inputFocused = ref(false);

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function typeMessage(message, index) {
  isTyping.value = true;
  const words = message.split(' ');
  let currentText = '';
  
  words.forEach((word, wordIndex) => {
    setTimeout(() => {
      currentText += (wordIndex > 0 ? ' ' : '') + word;
      displayMessages.value[index] = currentText;
      
      if (wordIndex === words.length - 1) {
        isTyping.value = false;
      }
    }, wordIndex * 80);
  });
}

function startChat() {
  if (!text.value.trim()) return;

  const userMessage = text.value;
  messages.value.push(userMessage);
  displayMessages.value.push(userMessage);
  responseToInput(userMessage);
  text.value = "";

  if (!isChatting.value) {
    isChatting.value = true;
    // Smooth transition to chat mode
    nextTick(() => {
      const chatArea = document.querySelector('.chat-area');
      if (chatArea) {
        gsap.fromTo(chatArea, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    });
  }
}

function responseToInput(input) {
  let num = 42;
  if (["Can you say something other than 42?", "Can you say something other than 42"].includes(input)) {
    num = 418;
  } else if (["1+1", "1+1=", "1 + 1", "1 + 1=", "what is 1+1", "what is 1+1=", "what is 1 + 1", "what is 1 + 1="].includes(input)) {
    num = 3;
  }
  
  const response = `the answer for your question "${input}" is ${num}`;
  messages.value.push(response);
  displayMessages.value.push('');
  
  // Add slight delay before typing starts
  setTimeout(() => {
    typeMessage(response, messages.value.length - 1);
  }, 500);
}
</script>
<style>
/* Scrollbar styling */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(71, 85, 105, 0.5);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(71, 85, 105, 0.7);
}

/* Accessibility - Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus states for better accessibility */
*:focus {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}

/* Custom focus for input field */
.input-field:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-delay {
  animation: fade-in 1s ease-out 0.3s both;
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out both;
}

/* Typing indicator */
.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: typing-bounce 1.4s ease-in-out infinite both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing-bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Message styling */
.message {
  position: relative;
  word-wrap: break-word;
  line-height: 1.5;
}

.message::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
}

.user-message::before {
  right: -1px;
}

.ai-message::before {
  left: -1px;
}

/* Input field enhancements */
.input-field {
  transition: all 0.3s ease;
}

.input-field:focus {
  transform: translateY(-1px);
}

/* Message container animations */
.message-container {
  transform: translateY(10px);
  opacity: 0;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .message {
    border: 1px solid currentColor;
  }
  
  .input-field {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>