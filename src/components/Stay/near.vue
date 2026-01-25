<template>
  <div v-for="f in facilities" :key="f.id" class="container">
    <div class="context">
      <div class="name">
        {{ f.name }}
      </div>
      <div class="explanation">
        {{ f.explanation }}
      </div>
    </div>
    <!-- <div class="img">
      <img v-if="f.imgUrl" :src="f.imgUrl" alt=""/>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const facilities = ref([])
const PB_ORIGIN = 'http://localhost:8090'

function fileUrl(record, filename) {
  return `${PB_ORIGIN}/api/files/facilities/${record.id}/${filename}`
}

onMounted(async () => {
  const res = await axios.get(
    `${PB_ORIGIN}/api/collections/facilities/records`,
    { params: { perPage: 10, sort: 'order' } }
  )

  facilities.value = (res.data.items ?? []).map(f => ({
    ...f,
    imgUrl: f.img ? fileUrl(f, f.img) : null,
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
  display: flex;
  flex-direction: row;
  align-items: flex-end;
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