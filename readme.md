# AICC8 Task Management Application - 기능 리스트

## 프로젝트 개요

Google OAuth 인증 기반의 개인 Task(할일) 관리 웹 애플리케이션입니다.

- **Frontend**: React 19 + Redux Toolkit + Tailwind CSS
- **Backend**: Node.js + Express 5
- **Database**: PostgreSQL
- **Authentication**: Google OAuth 2.0

---

## 1. 인증 기능 (Authentication)

### 1.1 Google OAuth 로그인
- Google 계정을 통한 소셜 로그인
- JWT 토큰 디코딩을 통한 사용자 정보 추출
- 로그인 상태 localStorage 저장으로 세션 유지

### 1.2 로그아웃
- 로그아웃 시 localStorage 및 Redux 상태 초기화
- 로그인 화면으로 리다이렉트

---

## 2. Task CRUD 기능

### 2.1 Task 생성 (Create)
- 새 Task 추가 버튼 클릭 시 Modal 열림
- 입력 필드:
  - Title (제목) - 필수
  - Description (설명) - 필수
  - Date (날짜) - 필수
  - Important (중요 표시) - 선택
- UUID를 통한 고유 ID 자동 생성
- 생성 성공 시 Toast 알림

### 2.2 Task 조회 (Read)
- 사용자별 Task 목록 조회
- 생성일 기준 내림차순 정렬 (최신순)
- 로딩 중 Skeleton UI 표시

### 2.3 Task 수정 (Update)
- **완료 상태 토글**: 체크박스 클릭으로 빠른 상태 변경 (PATCH)
- **전체 수정**: Modal을 통한 모든 필드 수정 (PUT)
  - Title, Description, Date 수정
  - 완료/중요 상태 변경
- 수정 성공 시 Toast 알림

### 2.4 Task 삭제 (Delete)
- 삭제 버튼 클릭으로 Task 삭제
- 삭제 성공 시 Toast 알림

---

## 3. 필터링 및 페이지 기능

### 3.1 Home (전체 보기)
- 경로: `/home`
- 모든 Task 표시

### 3.2 Completed (완료됨)
- 경로: `/completed`
- 완료된 Task만 필터링하여 표시 (`isCompleted === true`)

### 3.3 Proceeding (진행중)
- 경로: `/proceeding`
- 미완료 Task만 필터링하여 표시 (`isCompleted === false`)

### 3.4 Important (중요)
- 경로: `/important`
- 중요 표시된 Task만 필터링하여 표시 (`isImportant === true`)

---

## 4. UI/UX 기능

### 4.1 네비게이션 사이드바
- 왼쪽 고정 네비게이션 메뉴
- 아이콘과 텍스트로 구성된 메뉴 항목
- 현재 페이지 하이라이트

### 4.2 Modal 시스템
- 3가지 Modal 타입:
  - `create`: 새 Task 생성
  - `update`: Task 수정
  - `details`: Task 상세 보기
- 배경 클릭 또는 닫기 버튼으로 Modal 닫기

### 4.3 Toast 알림
- 작업 성공/실패 시 화면 하단 알림 표시
- react-toastify 라이브러리 사용

### 4.4 로딩 스켈레톤
- 데이터 로딩 중 플레이스홀더 UI 표시
- 사용자 경험 향상

### 4.5 다크 테마
- 전체 애플리케이션 다크 모드 (#212121 배경)
- 그라데이션 로고 스타일

---

## 5. 상태 관리 (Redux)

### 5.1 Auth Slice
- 인증 데이터 관리
- 로그인/로그아웃 액션

### 5.2 Modal Slice
- Modal 열기/닫기 상태
- Modal 타입 및 Task 데이터 관리

### 5.3 API Slice
- API 응답 데이터 저장
- Async Thunk를 통한 비동기 API 호출

---

## 6. 데이터 모델

### Task 스키마
| 필드 | 타입 | 설명 |
|------|------|------|
| `_id` | UUID | 고유 식별자 |
| `title` | VARCHAR | Task 제목 |
| `description` | TEXT | Task 설명 |
| `date` | DATE | 날짜 |
| `iscompleted` | BOOLEAN | 완료 여부 |
| `isimportant` | BOOLEAN | 중요 여부 |
| `userid` | VARCHAR | 사용자 ID (Google sub) |
| `created_at` | TIMESTAMP | 생성 시간 |

---

## 7. 프로젝트 구조

```
aicc8_deploy_app/
├── back/                          # Backend (Node.js/Express)
│   ├── controllers/               # 비즈니스 로직
│   │   ├── getControllers.js
│   │   ├── postTaskController.js
│   │   ├── updateTaskController.js
│   │   └── deleteTaskController.js
│   ├── routes/                    # API 라우트 정의
│   │   ├── getRoutes.js
│   │   ├── postRoutes.js
│   │   ├── updateRoutes.js
│   │   └── deleteRoutes.js
│   ├── database/
│   │   └── database.js            # PostgreSQL 연결
│   └── index.js                   # Express 서버 진입점
│
└── front/                         # Frontend (React)
    └── src/
        ├── components/
        │   ├── Common/            # 공통 컴포넌트
        │   │   ├── Navbar.jsx
        │   │   ├── ItemPanel.jsx
        │   │   ├── Item.jsx
        │   │   ├── AddItem.jsx
        │   │   ├── Modal.jsx
        │   │   ├── PageTitle.jsx
        │   │   └── LoadingSkeleton.jsx
        │   ├── Home/
        │   ├── Completed/
        │   ├── Proceeding/
        │   └── Important/
        ├── redux/
        │   ├── store.js
        │   └── slices/
        │       ├── authSlice.js
        │       ├── modalSlice.js
        │       └── apiSlice.js
        ├── utils/
        │   ├── requests.js        # HTTP 요청 함수
        │   ├── apiUrls.js         # API URL 상수
        │   └── naviLists.jsx      # 네비게이션 메뉴 데이터
        └── App.jsx                # 메인 앱 컴포넌트
```

---

## 8. 기술 스택

### Frontend
- React 19.2.0
- React Router DOM 7.13.0
- Redux Toolkit 2.11.2
- Tailwind CSS 3.4.19
- Vite 7.2.4
- react-toastify (Toast 알림)
- react-loading-skeleton (로딩 UI)
- react-icons (아이콘)
- @react-oauth/google (Google OAuth)
- jwt-decode (JWT 디코딩)

### Backend
- Node.js
- Express 5.2.1
- PostgreSQL (pg 8.17.2)
- cors 2.8.6
- dotenv 17.2.3
- uuid 13.0.0
