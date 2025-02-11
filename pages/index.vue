
<template>
  <background />
  <div v-if="!isChatting" class="absolute w-full top-[40%] -translate-y-1/2">
    <h1 class="text-white text-[3.5vmin] font-bold text-center font-Roboto">What can I help with?</h1>
  </div>
  <input v-model="text" type="text" placeholder="Message AItaar"
    class="TEXT_INPUT font-Roboto absolute w-[40%] h-[5vmin] text-white bg-slate-700 rounded-full outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pl-[2vmin] z-10"
    @keyup.enter="startChat">
  
  <div v-if="isChatting"
    class="TEXT_AREA absolute w-[40%] h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto mt-[2vmin]">
    <div v-for="(message, index) in messages" :key="index" class=" p-3 mb-6 rounded-xl text-white w-[45%] break-words"
      :class="{ 'ml-auto bg-slate-600': index % 2 === 0, 'mr-auto bg-sky-700': index % 2 === 1 }">
      <p class="whitespace-pre-wrap">{{ displayMessages[index] }}</p>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
const text = ref("");
const isChatting = ref(false);
const messages = ref([]);
const displayMessages = ref([]);

function typeMessage(message,index) {
  const words = message.split(' ');
  let currentText = '';
  
  words.forEach((word, wordIndex) => {
    setTimeout(() => {
      currentText += (wordIndex > 0 ? ' ' : '') + word;
      displayMessages.value[index] = currentText;
    }, wordIndex * 200);
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
    gsap.to(".TEXT_INPUT", { y: "45vh", duration: 0.4, ease: "power2.inOut" });
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
  typeMessage(response, messages.value.length - 1);
}
</script>
<style>
.TEXT_AREA::-webkit-scrollbar {
  display: none;
}
</style>