<template>
  <div class="header">
    <div class="header-title" @click="router.push('/')">
      HOME
    </div>
    <div class="contents" @click="$emit('toggle-contents')">
      Contents
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 8px 32px 8px 32px;
  background-color: var(--main-color);
  font-size: 12px;
}
.header-title {
  align-items: left;
  cursor: pointer;
  font-weight: 400;
  &:hover {
    font-weight:500;
  }
}
.contents {
  padding: 0;
  cursor: pointer;
  font-weight: 400;
  &:hover {
    font-weight: 500;
  }
}
</style>