/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface HanpaApi {
  platform: string;
  onAppCloseRequest(callback: () => void): void;
  sendAppCloseResponse(shouldQuit: boolean): void;
}

interface Window {
  hanpa: HanpaApi;
}
