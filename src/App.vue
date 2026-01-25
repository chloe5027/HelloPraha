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
  <Header />
  <RouterView class="router-view" />
  <Footer />
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<style scoped>
.router-view {
  min-height: calc(100vh - 400px);
}
</style>