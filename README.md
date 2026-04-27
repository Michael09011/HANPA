# HANPA

<p align="center">
  <img src="public/hanpa-icon.png" width="128" alt="HANPA icon" />
</p>

<p align="center">
  <strong>HANPA</strong> — Electron 기반 HWP 데스크톱 에디터
</p>

<p align="center">
  <a href="https://github.com/Michael09011/HANPA/releases"><img src="https://img.shields.io/github/v/release/Michael09011/HANPA?style=for-the-badge" alt="Latest release" /></a>
  <a href="https://github.com/Michael09011/HANPA/issues"><img src="https://img.shields.io/github/issues/Michael09011/HANPA?style=for-the-badge" alt="GitHub issues" /></a>
  <a href="https://github.com/Michael09011/HANPA/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Michael09011/HANPA?style=for-the-badge" alt="License: MIT" /></a>
  <a href="https://www.apple.com/macos/"><img src="https://img.shields.io/badge/Platform-macOS-000000?style=for-the-badge&logo=apple" alt="macOS" /></a>
  <img src="https://img.shields.io/badge/Architecture-Intel_x64-007ACC?style=for-the-badge" alt="Intel x64" />
</p>

HANPA는 Electron과 `rhwp` 오픈소스 HWP 에디터 엔진을 기반으로 만든 데스크톱 HWP 앱입니다.

## 주요 기술

<p align="center">
  <a href="https://www.electronjs.org/"><img src="https://img.shields.io/badge/Electron-Desktop%20App-47848F?style=for-the-badge&logo=electron" alt="Electron" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-Frontend%20Tooling-646CFF?style=for-the-badge&logo=vite" alt="Vite" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Strongly%20Typed-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  <a href="https://www.npmjs.com/package/@rhwp/core"><img src="https://img.shields.io/badge/@rhwp/core-HWP%20Engine-339933?style=for-the-badge&logo=npm" alt="@rhwp/core" /></a>
</p>

## 주요 기능

- 네이티브 데스크톱 HWP/HWPX 뷰어,편집 기능
- 커맨드 팔레트, 툴바, 메뉴 통합
- 종료 시 저장 확인 대화상자
- 폰트 등록 지연으로 빠른 시작
- `electron-builder`를 이용한 앱 번들 빌드 지원

## 호환성

- 현재 빌드는 macOS 인텔(x64) 아키텍처를 대상으로 합니다.
- Apple 실리콘(macOS arm64)에서는 Rosetta 2를 통해 실행할 수 있지만, 네이티브 arm64 빌드는 아직 지원하지 않습니다.

## 사용 방법

```bash
npm install
npm run build
npm start
```

## HWP 에디터 출처

HANPA는 [edwardkim/rhwp](https://github.com/edwardkim/rhwp)의 HWP 에디터 구현을 사용합니다. 에디터 엔진은 `@rhwp/core`로 제공되며 HANPA는 데스크톱 래퍼, 네이티브 메뉴, Electron 통합을 추가합니다.

## 프로젝트 구조

- `electron/` — Electron 메인 및 프리로드 프로세스
- `src/` — 애플리케이션 소스 코드 및 UI
- `public/` — 정적 자산 및 샘플
- `third_party/rhwp/` — HWP 에디터 코어 및 지원 패키지
- `dist_electron/` — Electron 빌드 출력

## 문서

- `README.md` — 프로젝트 개요
- `CONTRIBUTING.md` — 기여 가이드
- `CODE_OF_CONDUCT.md` — 행동 강령
- `SECURITY.md` — 보안 보고 안내
- `.github/ISSUE_TEMPLATE/` — 버그/기능 제안 템플릿
- `third_party/rhwp/mydocs/tech/` — 기술 설계 및 엔진 연구 문서

## 라이선스

MIT
