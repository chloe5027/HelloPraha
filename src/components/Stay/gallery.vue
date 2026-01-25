<template>
  <div class="title">
    안녕 프라하와 프라하의 순간들
  </div>
  <div class="grid">
    <div v-for="img in images" :key="img.id" class="item">
      <img :src="img.url" alt="" />
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import axios from 'axios'
  
  const images = ref([])
  
  const PB_ORIGIN = 'http://localhost:8090'

  const fileUrl = (record, filename) => {
    return `${PB_ORIGIN}/api/files/gallery/${record.id}/${filename}`
  }
  
  onMounted(async () => {
    const res = await axios.get(
      `${PB_ORIGIN}/api/collections/gallery/records`,
      {
        params: {
          filter: '(show=true)',
          sort: 'order',
          perPage: 50,
        },
      }
    )

    // ✅ 여기 중요: images에 실제로 넣어줘야 함
    images.value = (res.data.items || []).map(r => ({
      id: r.id,
      url: fileUrl(r, r.img),
    }))
  })
</script>

<style scoped>
.title {
  font-size: 14px;
  padding: 8px 0;
  font-weight: 500;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.item {
  aspect-ratio: 1 / 1;
  overflow: hidden;
}
.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>