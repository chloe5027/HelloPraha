<template>
  <Swiper :modules="modules" :navigation="true" class="home-swiper">
    <SwiperSlide v-for="r in reviews" :key="r.id">
      <div class="swiper-container">
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
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
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
      sort: 'order',
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
.home-swiper {
  min-height: 150px;
  width: 100%;
}
.swiper-container {
  display: flex;
  flex-direction: column;
}
.content {
  font-size: 14px;
  line-height: 1;
  padding: 8px 0;
  text-align: center;
}
.stars {
  font-size: 16px;
  display: flex;
  justify-content: center;
}
.see-more {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
}
.review-img {
  max-width: 300px;
  max-height: 200px;
}
.name-date {
  font-size: 14px;
  display: flex;
  justify-content: center;
}
</style>