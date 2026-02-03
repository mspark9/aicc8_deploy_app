# AICC8 Task Management API 명세서

## Base URL

```
http://localhost:8000
```

---

## API 엔드포인트 목록

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/get_tasks/:userId` | 사용자의 모든 Task 조회 |
| POST | `/post_task` | 새 Task 생성 |
| PATCH | `/update_completed_task` | Task 완료 상태 업데이트 |
| PUT | `/update_task` | Task 전체 정보 업데이트 |
| DELETE | `/delete_task/:itemId` | Task 삭제 |

---

## 1. Task 조회

### `GET /get_tasks/:userId`

사용자의 모든 Task를 조회합니다.

#### Request

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `userId` | string | URL Path | Yes | 사용자 고유 ID (Google OAuth sub) |

#### Example Request

```http
GET /get_tasks/google-oauth-user-sub-id-12345
```

#### Response

**Status: 200 OK**

```json
[
  {
    "_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "프로젝트 마감",
    "description": "AICC8 프로젝트 최종 제출",
    "date": "2026-02-10",
    "iscompleted": false,
    "isimportant": true,
    "userid": "google-oauth-user-sub-id-12345",
    "created_at": "2026-02-03T10:30:00.000Z"
  },
  {
    "_id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "회의 참석",
    "description": "팀 주간 회의",
    "date": "2026-02-05",
    "iscompleted": true,
    "isimportant": false,
    "userid": "google-oauth-user-sub-id-12345",
    "created_at": "2026-02-01T09:00:00.000Z"
  }
]
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | string (UUID) | Task 고유 식별자 |
| `title` | string | Task 제목 |
| `description` | string | Task 설명 |
| `date` | string (YYYY-MM-DD) | Task 날짜 |
| `iscompleted` | boolean | 완료 여부 |
| `isimportant` | boolean | 중요 여부 |
| `userid` | string | 사용자 ID |
| `created_at` | string (ISO 8601) | 생성 시간 |

#### Error Response

**Status: 500 Internal Server Error**

```json
{
  "error": "에러 메시지"
}
```

---

## 2. Task 생성

### `POST /post_task`

새로운 Task를 생성합니다.

#### Request

**Headers**

```
Content-Type: application/json
```

**Body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Task 제목 |
| `description` | string | Yes | Task 설명 |
| `date` | string | Yes | Task 날짜 (YYYY-MM-DD) |
| `isCompleted` | boolean | Yes | 완료 여부 |
| `isImportant` | boolean | Yes | 중요 여부 |
| `userId` | string | Yes | 사용자 ID |

#### Example Request

```http
POST /post_task
Content-Type: application/json

{
  "title": "새 프로젝트 시작",
  "description": "React 프로젝트 초기 설정",
  "date": "2026-02-05",
  "isCompleted": false,
  "isImportant": true,
  "userId": "google-oauth-user-sub-id-12345"
}
```

#### Response

**Status: 200 OK**

```json
{
  "message": "Task created successfully"
}
```

#### Error Response

**Status: 500 Internal Server Error**

```json
{
  "error": "에러 메시지"
}
```

---

## 3. Task 완료 상태 업데이트

### `PATCH /update_completed_task`

Task의 완료 상태만 업데이트합니다.

#### Request

**Headers**

```
Content-Type: application/json
```

**Body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `itemId` | string (UUID) | Yes | Task 고유 ID |
| `isCompleted` | boolean | Yes | 변경할 완료 상태 |

#### Example Request

```http
PATCH /update_completed_task
Content-Type: application/json

{
  "itemId": "550e8400-e29b-41d4-a716-446655440000",
  "isCompleted": true
}
```

#### Response

**Status: 200 OK**

```json
{
  "message": "Task updated successfully"
}
```

#### Error Response

**Status: 500 Internal Server Error**

```json
{
  "error": "에러 메시지"
}
```

---

## 4. Task 전체 업데이트

### `PUT /update_task`

Task의 모든 정보를 업데이트합니다.

#### Request

**Headers**

```
Content-Type: application/json
```

**Body**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | string (UUID) | Yes | Task 고유 ID |
| `title` | string | Yes | 수정할 제목 |
| `description` | string | Yes | 수정할 설명 |
| `date` | string | Yes | 수정할 날짜 (YYYY-MM-DD) |
| `isCompleted` | boolean | Yes | 수정할 완료 상태 |
| `isImportant` | boolean | Yes | 수정할 중요 상태 |

#### Example Request

```http
PUT /update_task
Content-Type: application/json

{
  "_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "수정된 제목",
  "description": "수정된 설명입니다",
  "date": "2026-02-15",
  "isCompleted": false,
  "isImportant": true
}
```

#### Response

**Status: 200 OK**

```json
{
  "message": "Task updated successfully"
}
```

#### Error Response

**Status: 500 Internal Server Error**

```json
{
  "error": "에러 메시지"
}
```

---

## 5. Task 삭제

### `DELETE /delete_task/:itemId`

Task를 삭제합니다.

#### Request

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `itemId` | string (UUID) | URL Path | Yes | 삭제할 Task ID |

#### Example Request

```http
DELETE /delete_task/550e8400-e29b-41d4-a716-446655440000
```

#### Response

**Status: 200 OK**

```json
{
  "message": "Task deleted successfully"
}
```

#### Error Response

**Status: 500 Internal Server Error**

```json
{
  "error": "에러 메시지"
}
```

---

## 데이터베이스 스키마

### tasks 테이블

```sql
CREATE TABLE tasks (
    _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    iscompleted BOOLEAN DEFAULT false,
    isimportant BOOLEAN DEFAULT false,
    userid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 프론트엔드 API URL 상수

**파일 위치**: `front/src/utils/apiUrls.js`

```javascript
const BASE_URL = "http://localhost:8000";

export const GET_TASKS_API_URL = `${BASE_URL}/get_tasks`;
export const POST_TASK_API_URL = `${BASE_URL}/post_task`;
export const UPDATE_COMPLETED_TASK_API_URL = `${BASE_URL}/update_completed_task`;
export const DELETE_TASK_API_URL = `${BASE_URL}/delete_task`;
export const UPDATE_TASK_API_URL = `${BASE_URL}/update_task`;
```

---

## HTTP 요청 유틸리티 함수

**파일 위치**: `front/src/utils/requests.js`

| 함수명 | HTTP Method | 용도 |
|--------|-------------|------|
| `getRequest(url)` | GET | Task 목록 조회 |
| `postRequest(url, data)` | POST | 새 Task 생성 |
| `patchRequest(url, data)` | PATCH | 완료 상태 업데이트 |
| `putRequest(url, data)` | PUT | Task 전체 업데이트 |
| `deleteRequest(url)` | DELETE | Task 삭제 |

---

## CORS 설정

백엔드에서 CORS가 활성화되어 있어 모든 Origin에서의 요청을 허용합니다.

```javascript
// back/index.js
app.use(cors());
```

---

## 환경 변수 설정

백엔드 데이터베이스 연결을 위해 `.env` 파일에 다음 변수를 설정해야 합니다:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=your_database_name
DB_PASSWORD=your_password
DB_PORT=5432
```
