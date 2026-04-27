# Electron

HANPA는 Electron 기반 데스크톱 애플리케이션입니다. Electron은 웹 기술(HTML/CSS/JS)으로 작성한 UI를 데스크톱 환경에서 실행하고, 네이티브 파일 시스템/메뉴/대화상자와 통합할 수 있게 해 줍니다.

## 역할

- 데스크톱 앱 창 생성 및 생명주기 관리
- 파일 열기/저장 대화상자 제공
- 네이티브 메뉴와 단축키 처리
- 메인 프로세스<->렌더러 프로세스 간 안전한 통신

## HANPA 구조

- `electron/main.js`
  - 앱 초기화 및 BrowserWindow 생성
  - 메뉴, IPC, 앱 이벤트 처리
- `electron/preload.js`
  - 렌더러와 안전한 브리지
  - 파일 시스템 및 네이티브 기능 접근 권한을 제한적으로 노출
- `src/main.ts`
  - 렌더러 앱 진입점
  - Electron IPC로 파일 열기/저장 등의 요청을 주고받음

## 장점

- 기존 웹 기술을 유지하면서 데스크톱 앱 배포 가능
- macOS, Windows 같은 데스크톱 환경에 맞는 사용자 경험 제공
- Electron 빌드 도구(`electron-builder`)로 실행 파일 생성

## HANPA에서의 활용

- `@rhwp/core` 엔진이 렌더러에서 동작하도록 환경을 구성
- 파일 I/O와 네이티브 메뉴는 메인 프로세스가 담당
- 렌더러는 UI와 문서 편집 로직에 집중
