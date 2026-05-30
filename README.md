# Quarkus Java Web Project

> 학번: 20230968  
> 이름: 기경민


---

## 프로젝트 주요 기능

- LoL 메인 페이지, 챔피언 페이지, 다운로드 페이지 구성
- Bootstrap 기반 네비게이션 바, 카드, 모달 UI 구현
- 챔피언 검색 기능 및 JS 이벤트 처리
- MySQL 데이터베이스 연동
- Panache Entity 기반 사용자/챔피언 데이터 관리
- 회원가입 및 중복 검사
- SHA-256 비밀번호 해시 처리
- 로그인/로그아웃 및 세션 관리
- 로그인 실패 메시지 표시
- 프로필 페이지 및 프로필 이미지 업로드
- 업로드 파일 확장자/용량 검사 및 오류 메시지 처리

---

## 사용 기술

- Java 25
- Quarkus 3.32.2
- RESTEasy Reactive
- Hibernate ORM with Panache
- MySQL JDBC
- Bootstrap 5
- HTML / CSS / JavaScript

---

## 주차별 진행 내용

### 2 · 3주차

- Quarkus 프로젝트 환경 구축
- 기본 HTML 구조 학습
- LoL 메인 화면 초안 제작
- 정적 리소스 경로 및 이미지 출력 확인

### 4주차

- Bootstrap 네비게이션 바 구성
- LoL 로고 삽입
- 메뉴 가운데 정렬 적용
- 챔피언 카드 UI 구성 시작

### 5주차

- 다운로드 페이지 구성
- `download.css` 분리
- LoL 실행 파일 다운로드 링크 구성
- Aatrox 챔피언 모달 페이지 추가

### 6주차

- 챔피언 목록 화면 확장
- Bootstrap JS 연동
- 검색 기능 구현 준비
- 모달 및 JS 구조 정리 진행

### 7주차

- 챔피언 검색 기능 추가
- `search.js`, `search.css` 작성
- 챔피언 데이터 정의 추가
- Jax, Jinx, Mel, Yunara, Zaahen 등 챔피언 모달 추가
- README 화면 캡처 정리

### 8주차

- 별도 커밋 기록 없음
- 이전 주차 기능 보완 및 코드 정리 중심으로 진행

### 9주차

- Maven/Quarkus 설정 보완
- MySQL 연결 설정 추가
- `application.properties` 데이터베이스 설정 구성
- WebSocket 실습 코드 추가

### 10주차

- `Champion` 엔티티 및 `ChampionResource` 추가
- `DataSeeder`로 초기 챔피언/사용자 데이터 입력
- 로그인 페이지와 로그인 후 메인 화면 구성
- 기존 메인 페이지 구조 정리

### 11주차

- 회원가입 기능 구현
- `User` 엔티티 추가 및 사용자 정보 저장
- 아이디/이메일 중복 검사
- 입력값 유효성 검사 JS 작성
- SHA-256 기반 비밀번호 해시 처리
- 회원가입 완료 페이지 추가

### 12주차

- 로그인 비밀번호 해시 비교 처리
- 로그인 실패 시 오류 메시지 표시
- 세션 기반 로그인 상태 관리
- 로그인 후 메인 화면 분기
- 프로필 페이지 추가
- 사용자 이메일/연락처/프로필 이미지 표시
- 프로필 이미지 업로드 구현
- 이미지 확장자 및 5MB 용량 제한 처리
- 업로드 실패 사유별 오류 메시지 표시

### 13주차

- 브라우저 기본 `alert()`를 Bootstrap Toast 알림으로 교체
- 로그인 후 메인 화면의 프로필 링크에 사용자명 Tooltip 표시
- 프로필 페이지에 개인정보 수정 폼 추가
- 이메일/연락처 정규식 검사 및 중복 이메일 검사 구현
- 비밀번호 변경 폼 추가
- 현재 비밀번호 확인 후 새 비밀번호 SHA-256 해시 저장
- 비밀번호 변경 성공 시 Toast 표시 후 자동 로그아웃
- 챔피언/다운로드 페이지 링크 정리
- 비어 있던 챔피언 페이지와 회원가입 완료 페이지 보완
- 모든 페이지 검색창 동작 흐름 보완

---

## 화면 캡처

<div align="center">
  <img src="screenshots/실습 1.png" width="45%" alt="2주차 메인 화면">
  <img src="screenshots/실습2 .png" width="45%" alt="3주차 HTML 실습 화면">
  <img src="screenshots/모달 추가1.png" width="45%" alt="챔피언 모달 화면 1">
  <img src="screenshots/모달 추가2.png" width="45%" alt="챔피언 모달 화면 2">
  <img src="screenshots/7주차 실습.png" width="45%" alt="7주차 검색 기능 화면">
  <img src="screenshots/7주차 추가 구현1.png" width="45%" alt="7주차 추가 구현 화면 1">
  <img src="screenshots/7주차 추가 구현2.png" width="45%" alt="7주차 추가 구현 화면 2">
  <img src="screenshots/13-main.png" width="45%" alt="13주차 메인 화면">
  <img src="screenshots/13-champion.png" width="45%" alt="13주차 챔피언 페이지">
  <img src="screenshots/13-download.png" width="45%" alt="13주차 다운로드 페이지">
  <img src="screenshots/13-login-error.png" width="45%" alt="13주차 로그인 오류 메시지">
  <img src="screenshots/13-profile.png" width="45%" alt="13주차 프로필 및 개인정보 수정 화면">
  <img src="screenshots/13-register-success.png" width="45%" alt="13주차 회원가입 완료 화면">
</div>

---