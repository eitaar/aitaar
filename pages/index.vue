<template>
  <background />
  <div v-if="!isChatting" class="absolute w-full top-[40%] -translate-y-1/2">
    <h1 class="text-white text-[3.5vmin] font-bold text-center font-Roboto">What can I help with?</h1>
  </div>
  <input v-model="text" type="text" placeholder="Message AItaar"
    class=" TEXT_INPUT font-Roboto absolute w-[40%] h-[5vmin] text-white bg-slate-700 rounded-full outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pl-[2vmin]"
    @keyup.enter="startChat">
  <div v-if="isChatting" class="TEXT_AREA absolute w-[40%] h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

  </div>
</template>
<script setup>
import { gsap } from "gsap";
const text = ref("");
const isChatting = ref(false);
function startChat() {
  console.log(text.value);
  responseToInput(text.value);

  text.value = "";
  isChatting.value = true;
  gsap.to(".TEXT_INPUT", { y: "45vh", duration: 0.6, ease: "power2.inOut" });
}

function responseToInput(input) {
  console.log(input);
  document.getElementsByClassName("TEXT_AREA").appendChild("<p>Hello</p>");
}
</script>