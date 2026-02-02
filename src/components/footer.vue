<template>
  <div class="footer">
    <div class="footer-title">
      Hello Praha
      <div class="footer-subtitle">안녕, 프라하</div>
    </div>
    <div class="sitemap">
      <div class="logo-container">
        <a href="https://pf.kakao.com/_mZBin?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPMTI0MDI0NTc0Mjg3NDE0AAGnR8mzmS7OkVwa540411W8vA0U8_8ezKcwWpyporOrJqt9_KtLaueC15Zjoq8_aem_D3-t50OGqjW7o4KawhIknw"
        target="_blank" rel="noopener">
          <img class="logo" 
          src = "../assets/image/icon/logo_kakaotalk.png" />
        </a>
      </div>
      <div class="logo-container">
        <a href="https://www.instagram.com/hellopraha2025"
        target="_blank" rel="noopener">
          <img class="logo" 
          src = "../assets/image/icon/logo_instagram.png" />
        </a>
      </div>
      <div class="logo-container">
        <a href="https://www.myrealtrip.com/products/BNB4456"
        target="_blank" rel="noopener">
          <img class="logo" 
          src = "../assets/image/icon/logo_myrealtrip.png" />
        </a>
      </div>
      <div class="logo-container">
        <a href="https://www.theminda.com/m/1.0/grp_minbak/minbak_view.html?minbak_code=16929"
        target="_blank" rel="noopener">
          <img class="logo" 
          src = "../assets/image/icon/logo_minda.png" />
        </a>
      </div>
      <div class="logo-container">
        <a href="https://maps.app.goo.gl/aiz8WPqFn8mBqjYf8"
        target="_blank" rel="noopener">
          <img class="logo" 
          src = "../assets/image/icon/logo_googlemap.png" />
        </a>
      </div>
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
.sitemap {
  display: flex;
  flex-direction: row;
  gap: 12px;
  height: 24px;
}
.logo-container {
  height: 24px;
  width: 24px;
}
.logo {
  height: 100%;
  width: auto;
}

.footer {
  padding: 32px;
  display: flex;
  flex-direction: column;
  background-color: var(--main-color);
  min-height: 300px;
  gap: 8px;
}
.footer-title {
  font-size: 24px;
}
.footer-subtitle {
  font-size: 16px;
}
.footer-info {
  font-size: 12px;
  padding: 64px 0 0 0;
}
</style>