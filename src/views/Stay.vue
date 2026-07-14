<template>
  <div class="stay-page">
    <section class="hero" aria-label="안녕 프라하 숙소 사진">
      <div class="hero-image-wrap">
        <img :src="activeImage.url" class="hero-image" alt="안녕 프라하 숙소 사진" />
        <div class="hero-actions">
          <RouterLink to="/" class="icon-action" aria-label="메인으로 돌아가기" title="메인으로 돌아가기">←</RouterLink>
          <button class="icon-action" type="button" aria-label="페이지 주소 복사" title="페이지 주소 복사" @click="copyPageLink">↗</button>
          <button class="icon-action" :class="{ saved }" type="button" aria-label="관심 숙소 저장" title="관심 숙소 저장" @click="saved = !saved">{{ saved ? '♥' : '♡' }}</button>
        </div>
        <div class="image-count">{{ activeImageIndex + 1 }} / {{ heroImages.length }}</div>
      </div>
      <div v-if="heroImages.length > 1" class="hero-thumbnails" aria-label="숙소 사진 선택">
        <button
          v-for="(image, index) in heroImages"
          :key="image.id"
          class="thumbnail"
          :class="{ active: index === activeImageIndex }"
          type="button"
          :aria-label="`${index + 1}번째 사진 보기`"
          @click="activeImageIndex = index"
        >
          <img :src="image.url" alt="" />
        </button>
      </div>
    </section>

    <div class="promotion-bar">직접예약 고객 혜택: 무료 한식 조식과 카카오톡 빠른 상담</div>

    <main class="stay-layout">
      <div class="stay-content">
        <section class="summary" id="information">
          <p class="eyebrow">PRAGUE STAY</p>
          <div class="summary-heading">
            <div>
              <h1>안녕 프라하</h1>
              <p class="address">Londýnská 77, Vinohrady, Praha 2</p>
            </div>
            <a class="map-link" href="https://maps.app.goo.gl/aiz8WPqFn8mBqjYf8" target="_blank" rel="noreferrer">지도 보기</a>
          </div>
          <p class="lead">프라하 중심과 가까운 위치에서, 여행자와 함께 살아보는 편안한 숙소 경험을 제공합니다.</p>
          <div class="feature-list" aria-label="주요 숙소 특징">
            <span>무료 한식 조식</span>
            <span>무료 Wi-Fi</span>
            <span>중심가 접근성</span>
            <span>카카오톡 상담</span>
          </div>
        </section>

        <nav class="detail-tabs" aria-label="숙소 상세 메뉴">
          <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" type="button" @click="scrollToSection(tab.id)">{{ tab.label }}</button>
        </nav>

        <section class="intro-section section-block">
          <div class="section-heading">
            <p class="eyebrow">ABOUT THE STAY</p>
            <h2>여행지의 하루가 편안해지는 곳</h2>
          </div>
          <div class="intro-copy">
            <p>안녕 프라하는 단순히 머무는 공간을 넘어, 프라하의 일상을 조금 더 가까이 경험할 수 있도록 돕는 숙소입니다. 도보 여행과 대중교통 이동이 편한 위치, 정돈된 공용 공간, 따뜻한 조식으로 여행의 시작과 끝을 편안하게 만듭니다.</p>
            <p>외부 플랫폼에서 보고 오셨다면 이 페이지에서 객실 정보와 직접예약 혜택을 확인한 뒤, 날짜와 인원을 남겨 빠르게 문의할 수 있습니다.</p>
          </div>
        </section>

        <section class="benefit-section" id="benefits">
          <div class="section-heading compact">
            <p class="eyebrow">DIRECT BOOKING BENEFITS</p>
            <h2>직접예약 혜택</h2>
          </div>
          <div class="benefit-grid">
            <article>
              <strong>무료 한식 조식</strong>
              <span>여행의 아침을 따뜻하게 시작하세요.</span>
            </article>
            <article>
              <strong>eSIM 할인 혜택</strong>
              <span>예약 확정 후 쿠폰 링크를 안내합니다.</span>
            </article>
            <article>
              <strong>카카오톡 빠른 상담</strong>
              <span>체크인과 현지 이용 문의를 도와드립니다.</span>
            </article>
          </div>
        </section>

        <section class="section-block rooms-section" id="rooms">
          <div class="section-heading">
            <p class="eyebrow">ROOMS</p>
            <h2>예약 가능한 객실</h2>
            <p>날짜와 인원을 선택한 뒤 객실별 가능 여부를 확인해 주세요.</p>
          </div>

          <div v-if="loading" class="loading-state">객실 정보를 불러오는 중입니다.</div>
          <div v-else class="room-list">
            <article v-for="room in roomCards" :key="room.id" class="room-card">
              <img v-if="room.image" :src="room.image" :alt="`${room.name} 객실 사진`" class="room-image" />
              <div v-else class="room-image placeholder">객실 문의</div>
              <div class="room-body">
                <p class="eyebrow">ROOM</p>
                <h3>{{ room.name }}</h3>
                <p>{{ room.description }}</p>
                <div class="room-actions">
                  <span>가격 및 가능 여부 문의</span>
                  <button type="button" @click="selectRoom(room)">이 객실 문의</button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="section-block review-section" id="reviews">
          <div class="section-heading">
            <p class="eyebrow">REVIEWS</p>
            <h2>여행자 후기</h2>
          </div>
          <div v-if="reviews.length" class="review-grid">
            <article v-for="review in reviews" :key="review.id">
              <div class="review-meta"><strong>{{ review.name || '안녕 프라하 여행자' }}</strong><span>{{ '★'.repeat(Math.max(1, Number(review.rate || 5))) }}</span></div>
              <p>{{ review.content }}</p>
            </article>
          </div>
          <p v-else class="empty-copy">더 많은 이용 후기는 메인 페이지의 후기 메뉴에서 확인할 수 있습니다.</p>
        </section>

        <section class="location-section" id="location">
          <div class="section-heading compact">
            <p class="eyebrow">LOCATION</p>
            <h2>프라하를 걷기 좋은 위치</h2>
          </div>
          <div class="location-grid">
            <p>트램과 지하철, 카페와 식료품점이 가까워 긴 여행에도 편리합니다. 체크인 전후 이동이나 현지 추천이 필요하면 카카오톡으로 문의해 주세요.</p>
            <a href="https://maps.app.goo.gl/aiz8WPqFn8mBqjYf8" target="_blank" rel="noreferrer">Google Maps에서 위치 보기</a>
          </div>
        </section>

        <section class="section-block guide-section" id="guide">
          <div class="section-heading">
            <p class="eyebrow">STAY GUIDE</p>
            <h2>이용 안내</h2>
          </div>
          <details open>
            <summary>체크인과 체크아웃</summary>
            <p>체크인은 15:00부터 22:00까지, 체크아웃은 11:00까지입니다. 늦은 체크인이나 짐 보관은 예약 전 미리 문의해 주세요.</p>
          </details>
          <details>
            <summary>숙소 이용 규칙</summary>
            <p>다른 여행자를 배려해 이른 아침과 늦은 밤에는 소음을 자제해 주세요. 객실 내 금연이며, 인원 변경과 추가 투숙은 사전 확인이 필요합니다.</p>
          </details>
          <details>
            <summary>취소와 변경</summary>
            <p>예약 채널과 선택한 요금 조건에 따라 취소·변경 규정이 달라질 수 있습니다. 직접예약은 예약 확정 전 카카오톡으로 조건을 다시 안내합니다.</p>
          </details>
        </section>
      </div>

      <aside class="booking-panel" aria-label="예약 문의">
        <p class="eyebrow">DIRECT BOOKING</p>
        <h2>예약 가능 여부 확인</h2>
        <label>
          체크인
          <input v-model="checkIn" :min="today" type="date" />
        </label>
        <label>
          체크아웃
          <input v-model="checkOut" :min="checkIn || today" type="date" />
        </label>
        <label>
          인원
          <select v-model="guests">
            <option v-for="count in 8" :key="count" :value="count">성인 {{ count }}명</option>
          </select>
        </label>
        <p v-if="nights" class="booking-note">{{ nights }}박 · 성인 {{ guests }}명</p>
        <p v-if="selectedRoom" class="booking-note selected-room">선택 객실: {{ selectedRoom.name }}</p>
        <a class="primary-action" :href="kakaoLink" target="_blank" rel="noreferrer">카카오톡으로 예약 문의</a>
        <button class="secondary-action" type="button" @click="scrollToSection('rooms')">객실 먼저 보기</button>
        <p class="panel-footnote">예약 확정 전 객실 가능 여부와 이용 조건을 안내드립니다.</p>
      </aside>
    </main>

    <div class="mobile-booking-bar">
      <div><strong>직접예약 문의</strong><span>객실 가능 여부를 빠르게 확인하세요</span></div>
      <a :href="kakaoLink" target="_blank" rel="noreferrer">예약하기</a>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import mainImage from '../assets/image/main.jpeg'

const kakaoLink = 'https://pf.kakao.com/_mZBin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPMTI0MDI0NTc0Mjg3NDE0AAGnR8mzmS7OkVwa540411W8vA0U8_8ezKcwWpyporOrJqt9_KtLaueC15Zjoq8_aem_D3-t50OGqjW7o4KawhIknw'
const apiOrigin = import.meta.env.VITE_PB_ORIGIN || (window.location.hostname === 'localhost' ? 'https://hellopraha.com' : '')
const today = new Date().toISOString().slice(0, 10)

const tabs = [
  { id: 'information', label: '정보' },
  { id: 'rooms', label: '객실' },
  { id: 'reviews', label: '후기' },
  { id: 'location', label: '위치' },
  { id: 'guide', label: '이용안내' },
  { id: 'benefits', label: '혜택' },
]

const heroImages = ref([{ id: 'fallback', url: mainImage }])
const activeImageIndex = ref(0)
const rooms = ref([])
const reviews = ref([])
const loading = ref(true)
const activeTab = ref('information')
const saved = ref(false)
const selectedRoom = ref(null)
const checkIn = ref('')
const checkOut = ref('')
const guests = ref(2)

const activeImage = computed(() => heroImages.value[activeImageIndex.value] || heroImages.value[0])
const roomCards = computed(() => {
  if (rooms.value.length) {
    return rooms.value.map((room) => ({
      id: room.id,
      name: room.name || '객실 정보',
      description: room.context || '객실 구성과 예약 가능 여부를 문의해 주세요.',
      image: room.img ? fileUrl('rooms', room, room.img) : '',
    }))
  }

  return [
    {
      id: 'couple-room',
      name: '안락한 커플룸',
      description: '더블베드 · 공용욕실',
      image: '',
    },
    {
      id: 'female-dormitory',
      name: '여자 도미토리',
      description: '4인 또는 6인 랜덤 배정 · 여성 전용',
      image: '',
    },
    {
      id: 'family-room-1',
      name: '가족실 1',
      description: '최소 3인 · 최대 4인 · 공용욕실',
      image: '',
    },
    {
      id: 'family-room-2',
      name: '가족실 2',
      description: '최소 4인 · 최대 6인 · 공용욕실',
      image: '',
    },
  ]
})
const nights = computed(() => {
  if (!checkIn.value || !checkOut.value) return 0
  const difference = new Date(checkOut.value) - new Date(checkIn.value)
  return difference > 0 ? Math.round(difference / 86400000) : 0
})

function fileUrl(collection, record, filename) {
  return `${apiOrigin}/api/files/${collection}/${record.id}/${filename}`
}

function scrollToSection(id) {
  activeTab.value = id
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function selectRoom(room) {
  selectedRoom.value = room
  document.querySelector('.booking-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

async function copyPageLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
  } catch {
    window.prompt('아래 주소를 복사해 주세요.', window.location.href)
  }
}

onMounted(async () => {
  try {
    const [galleryResponse, roomResponse, reviewResponse] = await Promise.all([
      axios.get(`${apiOrigin}/api/collections/gallery/records`, { params: { filter: '(show=true)', sort: 'order', perPage: 12 } }),
      axios.get(`${apiOrigin}/api/collections/rooms/records`, { params: { perPage: 12 } }),
      axios.get(`${apiOrigin}/api/collections/review/records`, { params: { sort: '-created', perPage: 3 } }),
    ])

    const gallery = (galleryResponse.data.items || [])
      .filter((item) => item.img)
      .map((item) => ({ id: item.id, url: fileUrl('gallery', item, item.img) }))

    if (gallery.length) heroImages.value = gallery
    rooms.value = roomResponse.data.items || []
    reviews.value = reviewResponse.data.items || []
  } catch (error) {
    // The direct booking layout remains usable even when a local PocketBase server is unavailable.
    console.warn('PocketBase content could not be loaded.', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.stay-page {
  background: #ffffff;
  color: #17201f;
  padding-bottom: 88px;
}

.hero {
  background: #17201f;
  padding: 16px clamp(16px, 4vw, 56px);
}

.hero-image-wrap {
  aspect-ratio: 16 / 9;
  max-height: 640px;
  overflow: hidden;
  position: relative;
}

.hero-image {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.hero-actions {
  display: flex;
  gap: 8px;
  left: 16px;
  position: absolute;
  top: 16px;
}

.icon-action {
  align-items: center;
  background: rgba(23, 32, 31, 0.78);
  border: 0;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-size: 24px;
  height: 40px;
  justify-content: center;
  line-height: 1;
  text-decoration: none;
  width: 40px;
}

.icon-action.saved { color: #ffcb47; }

.image-count {
  background: rgba(23, 32, 31, 0.78);
  bottom: 16px;
  color: #fff;
  font-size: 13px;
  padding: 8px 10px;
  position: absolute;
  right: 16px;
}

.hero-thumbnails {
  display: flex;
  gap: 8px;
  margin: 10px 0 0;
  overflow-x: auto;
}

.thumbnail {
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  flex: 0 0 74px;
  height: 54px;
  padding: 0;
}

.thumbnail.active { border-color: #ffcb47; }

.thumbnail img { display: block; height: 100%; object-fit: cover; width: 100%; }

.promotion-bar {
  background: #ef5a35;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  padding: 14px clamp(16px, 4vw, 56px);
  text-align: center;
}

.stay-layout {
  display: grid;
  gap: clamp(32px, 5vw, 72px);
  grid-template-columns: minmax(0, 1fr) minmax(280px, 344px);
  margin: 0 auto;
  max-width: 1240px;
  padding: clamp(32px, 5vw, 72px) clamp(16px, 4vw, 56px);
}

.stay-content { min-width: 0; }

.summary { padding-bottom: 32px; }

.eyebrow {
  color: #66716c;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0 0 10px;
}

.summary-heading { align-items: start; display: flex; gap: 20px; justify-content: space-between; }

h1, h2, h3, p { margin-top: 0; }

h1 { font-size: clamp(32px, 4vw, 52px); line-height: 1.1; margin-bottom: 12px; }
h2 { font-size: clamp(24px, 3vw, 34px); line-height: 1.2; margin-bottom: 14px; }
h3 { font-size: 21px; line-height: 1.25; margin-bottom: 10px; }

.address, .lead, .section-heading > p, .room-body > p, .intro-copy p, .review-grid p, .location-grid p, details p {
  color: #4f5b56;
  line-height: 1.7;
}

.address { font-size: 16px; margin-bottom: 18px; }
.lead { font-size: 18px; margin-bottom: 20px; max-width: 680px; }

.map-link { color: #17201f; font-size: 14px; font-weight: 700; text-underline-offset: 4px; white-space: nowrap; }

.feature-list { display: flex; flex-wrap: wrap; gap: 8px; }
.feature-list span { border: 1px solid #d8ded9; color: #314039; font-size: 13px; padding: 7px 9px; }

.detail-tabs {
  border-bottom: 1px solid #d8ded9;
  border-top: 1px solid #d8ded9;
  display: flex;
  gap: 22px;
  overflow-x: auto;
  position: sticky;
  top: 0;
  z-index: 8;
  background: #fff;
}

.detail-tabs button { background: transparent; border: 0; border-bottom: 3px solid transparent; color: #66716c; cursor: pointer; font-size: 14px; font-weight: 700; padding: 17px 0 14px; white-space: nowrap; }
.detail-tabs button.active { border-bottom-color: #17201f; color: #17201f; }

.section-block, .benefit-section, .location-section { padding: 56px 0; scroll-margin-top: 60px; }
.section-block + .section-block, .section-block + .location-section, .location-section + .section-block { border-top: 1px solid #e5e9e6; }

.section-heading { max-width: 720px; }
.section-heading.compact { max-width: 560px; }
.section-heading > p { margin-bottom: 0; }

.intro-copy { display: grid; gap: 16px; max-width: 760px; }
.intro-copy p { font-size: 17px; margin-bottom: 0; }

.benefit-section { background: #17201f; color: #fff; margin-left: calc(clamp(16px, 4vw, 56px) * -1); margin-right: calc(clamp(16px, 4vw, 56px) * -1); padding-left: clamp(16px, 4vw, 56px); padding-right: clamp(16px, 4vw, 56px); }
.benefit-section .eyebrow { color: #ffcb47; }

.benefit-grid { display: grid; gap: 1px; grid-template-columns: repeat(3, 1fr); margin-top: 28px; }
.benefit-grid article { background: #24302c; display: grid; gap: 8px; min-height: 128px; padding: 20px; }
.benefit-grid strong { font-size: 17px; }
.benefit-grid span { color: #d7dfda; font-size: 14px; line-height: 1.55; }

.room-list { display: grid; gap: 16px; }
.room-card { border: 1px solid #d8ded9; display: grid; grid-template-columns: minmax(190px, 0.8fr) 1.2fr; overflow: hidden; }
.room-image { background: #ecf0ed; display: block; height: 100%; min-height: 230px; object-fit: cover; width: 100%; }
.room-image.placeholder { align-items: center; color: #66716c; display: flex; font-size: 14px; justify-content: center; }
.room-body { display: flex; flex-direction: column; padding: 28px; }
.room-body > p { margin-bottom: 26px; }
.room-actions { align-items: center; display: flex; gap: 16px; justify-content: space-between; margin-top: auto; }
.room-actions span { color: #66716c; font-size: 13px; }
.room-actions button, .secondary-action { background: transparent; border: 1px solid #17201f; color: #17201f; cursor: pointer; font: inherit; font-size: 14px; font-weight: 700; padding: 11px 14px; }
.room-actions button:hover, .secondary-action:hover { background: #17201f; color: #fff; }

.loading-state, .empty-copy { color: #66716c; padding: 24px 0; }
.review-grid { display: grid; gap: 14px; grid-template-columns: repeat(2, 1fr); }
.review-grid article { border-top: 2px solid #17201f; padding: 18px 0 0; }
.review-meta { align-items: center; display: flex; justify-content: space-between; margin-bottom: 12px; }
.review-meta span { color: #ef9b31; letter-spacing: 2px; }
.review-grid p { margin-bottom: 0; }

.location-section { background: #f3f6f3; margin-left: calc(clamp(16px, 4vw, 56px) * -1); margin-right: calc(clamp(16px, 4vw, 56px) * -1); padding-left: clamp(16px, 4vw, 56px); padding-right: clamp(16px, 4vw, 56px); }
.location-grid { display: grid; gap: 18px; grid-template-columns: minmax(0, 1fr) auto; margin-top: 22px; }
.location-grid p { margin-bottom: 0; max-width: 600px; }
.location-grid a { align-self: end; color: #17201f; font-size: 14px; font-weight: 700; text-underline-offset: 4px; }

details { border-top: 1px solid #d8ded9; padding: 20px 0; }
details:last-child { border-bottom: 1px solid #d8ded9; }
summary { cursor: pointer; font-size: 17px; font-weight: 700; list-style: none; padding-right: 24px; position: relative; }
summary::after { content: '+'; font-size: 23px; font-weight: 400; position: absolute; right: 0; top: -5px; }
details[open] summary::after { content: '−'; }
details p { margin: 14px 0 0; max-width: 760px; }

.booking-panel { align-self: start; border: 1px solid #d8ded9; display: grid; gap: 16px; padding: 24px; position: sticky; top: 88px; }
.booking-panel h2 { font-size: 24px; margin-bottom: 4px; }
.booking-panel label { color: #4f5b56; display: grid; font-size: 13px; font-weight: 700; gap: 8px; }
.booking-panel input, .booking-panel select { background: #fff; border: 1px solid #c9d0cb; border-radius: 0; color: #17201f; font: inherit; padding: 12px; width: 100%; }
.booking-note { background: #f3f6f3; color: #314039; font-size: 13px; margin: 0; padding: 12px; }
.selected-room { border-left: 3px solid #ef5a35; }
.primary-action { background: #17201f; color: #fff; font-size: 15px; font-weight: 700; padding: 15px; text-align: center; text-decoration: none; }
.primary-action:hover { background: #314039; }
.secondary-action { width: 100%; }
.panel-footnote { color: #66716c; font-size: 12px; line-height: 1.6; margin: 0; }

.mobile-booking-bar { align-items: center; background: #fff; border-top: 1px solid #d8ded9; bottom: 0; display: none; gap: 12px; justify-content: space-between; left: 0; padding: 12px 16px; position: fixed; right: 0; z-index: 12; }
.mobile-booking-bar div { display: grid; gap: 3px; }
.mobile-booking-bar strong { font-size: 14px; }
.mobile-booking-bar span { color: #66716c; font-size: 11px; }
.mobile-booking-bar a { background: #17201f; color: #fff; font-size: 14px; font-weight: 700; padding: 12px 18px; text-decoration: none; }

@media (max-width: 820px) {
  .hero { padding: 0; }
  .hero-image-wrap { aspect-ratio: 4 / 3; }
  .hero-thumbnails { margin: 0; padding: 8px 16px; }
  .stay-layout { display: block; padding-top: 36px; }
  .booking-panel { display: none; }
  .mobile-booking-bar { display: flex; }
  .detail-tabs { margin-left: -16px; margin-right: -16px; padding: 0 16px; }
  .benefit-grid { grid-template-columns: 1fr; }
  .benefit-grid article { min-height: auto; }
  .room-card { grid-template-columns: 1fr; }
  .room-image { height: 230px; min-height: 0; }
  .review-grid { grid-template-columns: 1fr; }
  .location-grid { grid-template-columns: 1fr; }
  .location-grid a { align-self: start; }
}

@media (max-width: 520px) {
  .summary-heading, .room-actions { align-items: start; flex-direction: column; }
  .map-link { margin-top: 2px; }
  .room-actions { gap: 14px; }
}
</style>
