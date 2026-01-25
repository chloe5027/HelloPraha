<template>
  <div class="context">
    주소: 77, Londýnská 424, 4층, Vinohrady, 120 00 Praha
  </div>
  <div v-for="r in route" :key="r.id" class="route">
    <div class="title">
      {{ r.title }}
    </div>
    <div class="context">
      {{ r.context }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const route = ref([])

const PB_ORIGIN = 'http://localhost:8090'

function fileUrl(record, filename) {
  // /api/files/<collection>/<recordId>/<filename>
  return `${PB_ORIGIN}/api/files/route/${record.id}/${filename}`
}

onMounted(async () => {
  const res = await axios.get('/collections/route/records', {
    params: {
      perPage: 10,
      sort: 'order',
    },
  })

  route.value = res.data.items ?? []
})
</script>

<style scoped>
.route {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.title {
  font-size: 14px;
  padding: 8px 0 0 0;
  font-weight: 500;
}
.context {
  font-size: 12px;
}
</style>