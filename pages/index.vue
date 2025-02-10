
<template>
  <background />
  <div v-if="!isChatting" class="absolute w-full top-[40%] -translate-y-1/2">
    <h1 class="text-white text-[3.5vmin] font-bold text-center font-Roboto">What can I help with?</h1>
  </div>
  <input v-model="text" type="text" placeholder="Message AItaar"
    class="TEXT_INPUT font-Roboto absolute w-[90%] md:w-[40%] h-[5vmin] text-white bg-slate-700 rounded-full outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pl-[2vmin] z-10"
    @keyup.enter="startChat">
  <div v-if="isChatting"
    class="TEXT_AREA absolute w-[90%] md:w-[40%] h-[calc(100vh-20vmin)] top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto">
    <div v-for="(message, index) in messages" :key="index" 
      class="bg-slate-600 p-3 mb-6 rounded-xl text-white w-[80%]"
      :class="index % 2 === 0 ? 'ml-auto' : ''">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
const text = ref("");
const isChatting = ref(false);
const messages = ref([]);

function startChat() {
  if (!text.value.trim()) return;

  messages.value.push(text.value);
  responseToInput(text.value);
  text.value = "";

  if (!isChatting.value) {
    isChatting.value = true;
    gsap.to(".TEXT_INPUT", { y: "45vh", duration: 0.6, ease: "power2.inOut" });
  }
}

function responseToInput(input) {
  messages.value.push(`Response to: ${input}`);
}
</script>
<style>
.TEXT_AREA::-webkit-scrollbar {
  display: none;
}
</style>