<template>
  <div class="title">
    안녕 프라하
  </div>
  <div class="sitemap">

  </div>
  <div class="menu">
    <div class="contents-bar">
      <div class="contents-title"
      :class="{ active: activeTab === 'rooms' }" @click="activeTab = 'rooms'">
        시설 안내
      </div>
      <div class="contents-title"
      :class="{ active: activeTab === 'gallery' }" @click="activeTab = 'gallery'">
        갤러리
      </div>
      <div class="contents-title"
      :class="{ active: activeTab === 'events' }" @click="activeTab = 'events'">
        안녕 프라하의 이벤트
      </div>
      <div class="contents-title"
      :class="{ active: activeTab === 'near' }" @click="activeTab = 'near'">
        주변 시설
      </div>
      <div class="contents-title"
      :class="{ active: activeTab === 'map' }" @click="activeTab = 'map'">
        찾아오시는 길
      </div>
    </div>
    <hr class="line">
    <div class="contents">
      <Rooms v-if="activeTab === 'rooms'" />
      <Gallery v-if="activeTab === 'gallery'" />
      <Events v-if="activeTab === 'events'" />
      <Near v-if="activeTab === 'near'" />
      <Map v-if="activeTab === 'map'" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  import Rooms from '../components/Stay/rooms.vue'
  import Gallery from '../components/Stay/gallery.vue'
  import Events from '../components/Stay/events.vue'
  import Near from '../components/Stay/near.vue'
  import Map from '../components/Stay/map.vue'

  const activeTab = ref('rooms')
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: 500;
  padding: 32px 32px 0 32px;
  background-color: var(--main-bg-color);
}
.menu {
  padding: 16px 32px 32px 32px;
  background-color: var(--main-bg-color);
}
.contents-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.contents-title {
  font-size: 10px;
  cursor: pointer;
}
.contents-title.active {
  font-weight: 500;
  font-size: 12px;
}
.line {
  background-color: var(--main-text-color);
  color: var(--main-text-color);
  width: 100%;
  margin: 8px 0 4px 0;
}
.contents {
  min-height: 300px;
}
</style>