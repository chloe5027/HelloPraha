<!-- <template>
  <Header></Header>
  <Footer></Footer>
</template>

<script setup>
import Header from './components/header.vue'
import Footer from './components/footer.vue'

const route = useRoute()
</script> -->

<template>
  <Header @toggle-contents="toggleContents"/>

  <Contents :open="isContentsOpen" @close="isContentsOpen = false"/>

  <RouterView class="router-view" />
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Contents from "./components/contents.vue";

const isContentsOpen = ref(false)

const toggleContents = () => {
  isContentsOpen.value = !isContentsOpen.value
}
</script>

<style scoped>
.router-view {
  min-height: calc(100vh - 400px);
}
</style>