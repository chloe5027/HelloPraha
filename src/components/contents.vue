<template>
  <div class: content @click="router.push('/stay')">
    안녕 프라하
  </div>
  <div class: content @click="router.push('/tour')">
    프라하의 정석
  </div>
  <div class: content @click="router.push('/hellosevilla')">
    안녕 세비야
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
</script>

<style scoped>
.content {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>