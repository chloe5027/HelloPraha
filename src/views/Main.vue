<template>

  <div class="main-header">
    <img class="main-header-img" src = "../assets/image/header-left.png" alt=""/>
    <img class="main-header-img" src = "../assets/image/header-right.png" alt=""/>
  </div>
  <div class="main">
    <div class="main-title">
      Hello Praha
    </div>
    <img class="main-img" src = "../assets/image/main.jpeg" alt=""/>
  </div>


  <div class="menu-block">
    <div class="menu-intro">
      About Us
    </div>
    <div class="menu">
      <img class="menu-img"/>
      <div class="menu-text">
        <div class="menu-title" @click="router.push('/stay')">안녕 프라하</div>
        <div class="menu-info">
          프라하에 있는 정말 멋진 숙소고요<br>
          한 번 와보세요<br>
          오세요 오세요 안녕프라하로 오세요
        </div>
      </div>
    </div>

    <hr class="line"/>
    <div class="menu-title" @click="router.push('/reviews')">안녕 프라하 추천리뷰</div>
    <Review/>
    <div class="more" @click="router.push('/reviews')">더 많은 리뷰 보기</div>

    <hr class="line"/>
    <div class="menu">
      <img class="menu-img"/>
      <div class="menu-text">
        <div class="menu-title" @click="router.push('/tour')">프라하의 정석</div>
        <div class="menu-info">
          프라하에 처음 오신 당신?<br>
          사실 처음이 아니더라도 이것만 참고한다면 기깔나는 여행을 즐기실 수 있습니다.
        </div>
      </div>
    </div>
    <hr class="line"/>
    <div class="menu">
      <img class="menu-img"/>
      <div class="menu-text">
        <div class="menu-title"  @click="router.push('/hellosevilla')">안녕 세비야</div>
        <div class="menu-info">
          세비야에도 안녕어쩌구가 있다는 사실!!<br>
          모르셨죠?? 알고 계셨다고요? 그럼 스페인 갈 때 가보세요
        </div>
      </div>
    </div>
  </div>

</template>


<script setup>
  import Review from '../components/review.vue'

  import { useRouter } from 'vue-router'
  const router = useRouter()
</script>


<style scoped>

.main-header {
  display: flex;
  width: 100%;
}
.main-header-img {
  flex: 1 1 0;
  min-width: 0;
  height: auto;
  display: block;
  padding: 32px 0 0 0;
}
.main {
  padding: 32px 16px 16px 16px;
  font-family: 'NewYorker';
  font-weight: 300;
  background-color: var(--main-color);
  display: flex;
  flex-direction: column;
  align-items: left;
}
.main-title {
  font-size: 52px;
  line-height: 0.85;
  margin: 0 0 0 4px;
}
.main-img {
  display: flex;
  width: 100%;
}

.menu-intro{
  font-size: 20px;
  font-weight: 500;
  padding: 0 0 12px 0;
}
.menu-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 20px;
  padding: 32px;
}
.menu {
  display: flex;
  flex-direction: row;
  min-height: 100px;
  gap: 4px;
}
.menu-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.menu-title {
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
  font-weight: 500;
  font-size: 16px;
}
.menu-info {
  font-size: 12px;
}
.more {
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }
}
.line {
  background-color: var(--main-text-color);
  color: var(--main-text-color);
  width: 100%;
}

</style>