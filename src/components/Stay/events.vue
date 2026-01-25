<template>
  <div v-for="e in events" :key="e.id" class="container">
    <div class="context">
      <div class="name">
        {{ e.name }}
      </div>
      <div class="explanation">
        {{ e.explanation }}
      </div>
    </div>
    <div class="img">
      <img v-if="e.imgUrl" :src="e.imgUrl" alt=""/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref([])
const PB_ORIGIN = 'http://localhost:8090'

function fileUrl(record, filename) {
  return `${PB_ORIGIN}/api/files/events/${record.id}/${filename}`
}

onMounted(async () => {
  const res = await axios.get(
    `${PB_ORIGIN}/api/collections/events/records`,
    { params: { perPage: 10, sort: 'order' } }
  )

  events.value = (res.data.items ?? []).map(e => ({
    ...e,
    imgUrl: e.img ? fileUrl(e, e.img) : null,
  }))
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 8px;
}
.context {
  padding: 4px 0 0 0;
}
.img {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.name {
  font-size: 14px;
  font-weight: 500;
}
.explanation {
  font-size: 12px;
}
</style>