<!-- 리뷰 상세화면 -->

<template>
  <div class="title">
    안녕 프라하 추천리뷰
  </div>

  <div v-for="r in reviews" :key="r.id" class="container">
    <div class="stars">
      {{ '★'.repeat(r.rate || 0) }}{{ '☆'.repeat(5 - (r.rate || 0)) }}{{ r.rate }}
    </div>

    <div class="name-date">{{ r.name?.slice(0, 10)}} {{ r.date?.slice(0, 10) }}</div>

    <div class="content">
      <span class="text">{{ displayContent(r) }}</span>
      <div v-if="isTruncated(r)" class="see-more" @click="toggleExpanded(r.id)">
        {{ isExpanded(r.id) ? '접기':'더보기' }}
      </div>
    </div>

    <img
      v-if="r.img"
      class="review-img"
      :src="fileUrl(r, r.img)"
      alt=""
    />
  </div>

</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import { Navigation } from 'swiper/modules'
  
  const modules = [Navigation]
  const reviews = ref([])
  
  // PocketBase 서버 주소 (로컬)
  // ⚠️ 나중에 EC2/도메인 붙이면 여기만 바꾸면 됨
  const PB_ORIGIN = ''
  
  function fileUrl(record, filename) {
    // /api/files/<collection>/<recordId>/<filename>
    return `${PB_ORIGIN}/api/files/review/${record.id}/${filename}`
  }
  
  onMounted(async () => {
    const res = await axios.get('/collections/review/records', {
      params: {
        perPage: 10,
      },
    })
  
    reviews.value = res.data.items ?? []
  })
  
  const LIMIT = 150
  const expanded = ref(new Set())
  
  const isExpanded = (id) => expanded.value.has(id)
  
  const toggleExpanded = (id) => {
    const next = new Set(expanded.value)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    expanded.value = next
  }
  
  const displayContent = (r) => {
    const text = r?.content ?? ''
    if (isExpanded(r.id) || text.length <= LIMIT) return text
    return text.slice(0, LIMIT) + '…'
  }
  
  const isTruncated = (r) => (r?.content?.length ?? 0) > LIMIT
  
  </script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: 500;
  padding: 32px 32px 8px 32px;
}
.container {
  font-size: 12px;
  font-weight: 400px;
  padding: 0px 32px 16px 32px;
}
</style>