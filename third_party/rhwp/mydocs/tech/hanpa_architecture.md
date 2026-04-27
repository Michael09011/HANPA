# HANPA 기술 설계

## 개요

HANPA는 Electron을 기반으로 한 데스크톱 HWP 에디터입니다. HANPA의 핵심 가치는 웹 기술 기반 UI와 `@rhwp/core` HWP 엔진을 결합하여 macOS 환경에서 네이티브 데스크톱 편집 기능을 제공하는 것입니다.

## 아키텍처 구성

### 1. Electron 셸

- `electron/main.js`
  - 애플리케이션 윈도우 생성
  - 네이티브 메뉴, 단축키, 파일 열기/저장 등의 네이티브 통합 처리
- `electron/preload.js`
  - 메인 프로세스와 렌더러 프로세스 사이의 안전한 브리지 역할
  - 파일 시스템 액세스, 앱 환경 정보, 커맨드 전송 등을 노출

### 2. 렌더러 애플리케이션

- `src/`
  - Vite + TypeScript 기반 UI 및 애플리케이션 로직
  - 에디터 화면, 도구 모음, 상태 관리, 사용자 입력 처리
  - `src/main.ts`에서 앱 초기화 및 Electron IPC 등록

### 3. HWP 엔진

- `@rhwp/core`
  - HANPA가 실제 HWP/HWPX 파일을 파싱, 렌더링, 편집, 저장하는 엔진
  - `third_party/rhwp/` 디렉터리에 엔진 소스와 기술 문서가 포함되어 있음
- HANPA는 엔진을 래핑하여 데스크톱 UI에 맞게 통합하고, 필요한 경우 엔진 동작을 확장하거나 호환 문제를 처리함

## 기술 선택 이유

### Electron

- 웹 기술(HTML/CSS/JS)을 이용해 데스크톱 앱을 개발할 수 있음
- 네이티브 파일 대화상자, 메뉴, 시스템 통합을 제공하여 사용자 환경을 강화
- macOS 지원 및 향후 Windows 확장 가능성

### Vite + TypeScript

- 빠른 개발 빌드와 HMR 제공
- 타입 안정성과 코드 가독성 확보
- 현대적인 프론트엔드 개발 흐름을 유지하면서 Electron과 잘 결합

### @rhwp/core

- HWP/HWPX 파일 형식에 대한 서드파티 엔진
- HANPA에서 HWP 편집 기능을 구현하는 핵심 컴포넌트
- 한컴 문서 파일 호환성과 렌더링 정확성을 높이기 위한 선택

## 데이터 흐름

### 파일 열기

1. 사용자 요청으로 Electron 파일 열기 대화상자 실행
2. 선택한 파일 경로를 메인 프로세스가 렌더러로 전달
3. 렌더러에서 `@rhwp/core`를 통해 파일 파싱
4. 파싱된 문서를 화면에 렌더링

### 편집 / 명령 처리

- UI는 사용자 입력(키보드, 마우스, 메뉴 명령)을 캡처
- 입력은 에디터 내부 커맨드 처리기로 전달되어 문서 상태를 수정
- 변경 사항은 히스토리/언두 스택에 적용

### 저장

1. 사용자 저장 요청 발생
2. 현재 문서 상태를 `@rhwp/core`로 시리얼라이즈
3. Electron 메인 프로세스가 파일 시스템에 쓰기

## `third_party/rhwp/` 역할

- `third_party/rhwp/`는 HANPA가 사용하는 HWP 엔진과 그 주변 도구를 포함
- 엔진 수정이나 호환성 개선이 필요한 경우 직접 참조 가능
- 이 디렉터리 아래의 `mydocs/tech/`는 엔진 연구 및 설계 문서를 정리하는 곳

## 확장성과 유지보수 방향

- HANPA는 기본적으로 macOS x64를 우선 지원하며, 추후 Apple Silicon 네이티브 빌드 또는 Windows 지원을 고려할 수 있음
- UI와 엔진을 분리하여, UI 개선과 엔진 호환성을 독립적으로 발전시키는 구조
- 기술 문서를 통해 HWP 포맷 처리, 렌더링 엔진, 호환성 이슈를 기록하고 공유

## 참고 문서

- `third_party/rhwp/mydocs/tech/README.md`
- `README.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
