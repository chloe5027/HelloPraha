<template>
  <div class="title">
    안녕 프라하 시설 소개
  </div>

  <div class="room" v-for="r in rooms" :key="r.id">
    <div class="img-container">
      <img v-if="r.img" class="room-img" :src="fileUrl(r, r.img)" alt="" />
    </div>
    <div v-for="r in rooms" :key="r.id" class="container">
      <div class="name">{{ r.name}}</div>
      <span class="text">{{ r.context }}</span>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  const rooms = ref([])

  const PB_ORIGIN = import.meta.env.VITE_PB_ORIGIN || ''
  
  function fileUrl(record, filename) {
    // /api/files/<collection>/<recordId>/<filename>
    return `${PB_ORIGIN}/api/files/rooms/${record.id}/${filename}`
  }
  
  onMounted(async () => {
    const res = await axios.get('/api/collections/rooms/records', {
      params: {
        perPage: 10,
      },
    })
  
    rooms.value = res.data.items ?? []
  })
</script>

<style scoped>
.title {
  font-size: 14px;
  padding: 8px 0;
  font-weight: 500;
}
.room {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
.container {
  font-size: 12px;
  font-weight: 400px;
}
.img-container {
  width: 160px;
  height: 120px;
  background-color: var(--main-bg-color); /* 이미지 모자랄 때 배경색 */
  overflow: hidden; /* 가로가 160px 넘으면 자르기 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.room-img {
  height: auto;  /* 높이 고정 */
  width: 160px;    /* 비율 유지 */
  display: block;
}
.name {
  font-weight: 500;
}
.text {
  font-size: 10px;
}
</style>