# Hello Praha

프라하 한인민박 Hello Praha의 소개 및 숙소 정보 웹사이트입니다.

## 기술 구성

- Vue 3 + Vite
- Vue Router
- Axios
- PocketBase API 및 관리자 페이지

## 시작하기

### 필요한 도구

- Node.js LTS
- Git

### 로컬 실행

```bash
npm install
npm run dev
```

기본 개발 서버 주소는 `http://localhost:8000`입니다.

### 배포용 빌드

```bash
npm run build
```

## 콘텐츠 관리

코드 수정 없이 관리자 페이지에서 관리하는 데이터입니다.

- 후기: `review`
- 객실: `rooms`
- 갤러리: `gallery`
- 이벤트: `events`
- 주변 시설: `facilities`
- 오시는 길: `route`

관리자 페이지는 `https://hellopraha.com/admin/`입니다. 고객 정보, 결제 키, 관리자 비밀번호는 저장소에 올리지 않습니다.

## 공동 작업 규칙

1. `main`은 운영 기준 브랜치로 유지합니다.
2. 새 작업은 `feature/작업명` 브랜치에서 시작합니다.
3. 작업 단위마다 이해하기 쉬운 커밋 메시지를 남깁니다.
4. 완료된 작업은 Pull Request로 검토한 뒤 `main`에 병합합니다.
5. 작업 시작 전 `git pull`, 작업 종료 전 `git status`를 확인합니다.

## 현재 작업

숙소 플랫폼형 상세 UI 개편은 `feature/accommodation-platform-ui` 브랜치에서 진행합니다.

현재 상태와 인수인계 정보는 [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md)에서 확인할 수 있습니다.
