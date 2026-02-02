<template>
  <div class="footer">
    <div class="footer-title">
      Hello Praha
      <div class="footer-subtitle">안녕, 프라하</div>
    </div>
    <div class="logo">

    </div>
    <div class="footer-info">
      77, Londýnská 424, Vinohrady, 120 00 Praha, Czechia <br>
      © 2026 Hello Praha. All rights reserved.<br><br>
      이 사이트는 스마트폰 디스플레이에 최적화되어 있습니다<br><br>
      사이트 관련 오류 및 문의 <br>
      kimrahee5027@gmail.com
    </div>
</div>
</template>

<style scoped>
.logo {
  display: flex;
  flex-direction: row;
}

.footer {
  padding: 32px 32px;
  display: flex;
  flex-direction: column;
  background-color: var(--main-color);
  min-height: 300px;
  gap: 64px;
}
.footer-title {
  font-size: 24px;
}
.footer-subtitle {
  font-size: 16px;
}
.footer-info {
  font-size: 12px;
}
</style>