<template>
  <div v-if="open" class="overlay" @click="$emit('close')" />

  <aside class="panel" :class="{ open }">
    <div class: content @click="router.push('/')">Home</div>
    <div class: content @click="router.push('/stay')">안녕 프라하</div>
    <div class: content @click="router.push('/reviews')">안녕 프라하 추천리뷰</div>
    <div class: content @click="router.push('/tour')">프라하의 정석</div>
    <div class: content @click="router.push('/hellosevilla')">안녕 세비야</div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  open: Boolean
})

const emit = defineEmits(['close'])
const router = useRouter()

const go = (path) => {
  router.push(path)
  emit('close')
}
</script>

<style scoped>
.panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--main-bg-color);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  padding: 24px;
  box-shadow: -4px 0 12px rgba(0,0,0,0.15);
}

.panel.open {
  transform: translateX(0);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 999;
}
.content {
  cursor: pointer;
  &:hover {
    
  }
}
</style>