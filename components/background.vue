<template>
  <div ref="bg" class="fixed top-0 left-0 w-screen h-screen z-[-1] overflow-hidden">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-gradient-slow"></div>
    
    <!-- Floating orbs for visual interest -->
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
    
    <!-- Subtle grid pattern overlay -->
    <div class="absolute inset-0 opacity-5">
      <div class="grid-pattern"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes gradient-slow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

@keyframes float-reverse {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(15px) rotate(-90deg); }
  66% { transform: translateY(-25px) rotate(-180deg); }
}

.animate-gradient-slow {
  background-size: 200% 200%;
  animation: gradient-slow 8s ease infinite;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(1px);
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  top: 10%;
  left: 10%;
  animation: float 12s ease-in-out infinite;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  top: 60%;
  right: 15%;
  animation: float-reverse 15s ease-in-out infinite;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  bottom: 20%;
  left: 60%;
  animation: float 18s ease-in-out infinite;
}

.grid-pattern {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>