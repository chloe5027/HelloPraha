<template>
  <div class="tour">
    <div class="title">프라하의 정석</div>
    <div class="file"></div>
    <div class="text">더 많은 내용은 안녕 프라하에서 확인하세요</div>
  </div>
</template>

<style scoped>
.tour {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: var(--main-bg-color);
}
.title {
  font-size: 16px;
  font-weight: 500;
}
.text {
  font-size: 12px;
  font-weight: 400;
}
</style>


<!-- <template>
  <div class="title">
    프라하의 정석
  </div>
  <div class="tour">
    <div class="map">
      <img class="map-bg" src = "../assets/image/map.png" alt=""/>
      <div class="map-icons">
      </div>
    </div>
  </div>
  <div class="etc">
    <div class="instruction" @click="toggleAll">
      {{ showAll ? '간략히 보기' : '모두 보기' }}
    </div>
    <div class="full-list" v-if="showAll">
      <tourisms />
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import tourisms from "../components/tourisms.vue";

  const showAll = ref(false);

  function toggleAll() {
    showAll.value = !showAll.value;
  }
</script>

<style scoped>
.title {
  font-size: 32px;
  font-weight: 500;
  padding: 32px 32px 0 32px;
}
.map-bg {
  width: 100%;
}
.map-icons {
  padding: 32px 32px 0 32px;
}
.etc{
  padding: 0 32px 32px 32px;
}
.instruction {
  font-size: 12px;
}
</style> -->