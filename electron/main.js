import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === 'development';

app.name = 'HANPA';

let mainWindow = null;
let quitConfirmed = false;

function buildAppMenu() {
  if (process.platform !== 'darwin') return;

  const template = [
    {
      label: app.name,
      submenu: [
        { role: 'about', label: `${app.name} 정보` },
        { type: 'separator' },
        { role: 'services', label: '서비스' },
        { type: 'separator' },
        { role: 'hide', label: `${app.name} 숨기기` },
        { role: 'hideOthers', label: '다른 항목 숨기기' },
        { role: 'unhide', label: '숨긴 항목 모두 보기' },
        { type: 'separator' },
        { role: 'quit', label: '종료', accelerator: 'Command+Q' },
      ],
    },
    {
      label: '파일',
      submenu: [
        { role: 'close', label: '닫기', accelerator: 'Command+W' },
      ],
    },
    {
      label: '편집',
      submenu: [
        { role: 'undo', label: '실행 취소' },
        { role: 'redo', label: '다시 실행' },
        { type: 'separator' },
        { role: 'cut', label: '잘라내기' },
        { role: 'copy', label: '복사' },
        { role: 'paste', label: '붙여넣기' },
        { role: 'selectAll', label: '모두 선택' },
      ],
    },
    {
      label: '보기',
      submenu: [
        { role: 'reload', label: '다시 로드' },
        { role: 'forceReload', label: '강제 다시 로드' },
        { role: 'toggleDevTools', label: '개발자 도구 전환' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '전체 화면 전환' },
      ],
    },
    {
      label: '창',
      submenu: [
        { role: 'minimize', label: '최소화' },
        { role: 'zoom', label: '확대/축소' },
        { type: 'separator' },
        { role: 'front', label: '앞으로 가져오기' },
      ],
    },
    {
      role: 'help',
      label: '도움말',
      submenu: [
        { role: 'help', label: '도움말 보기' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow = win;
  win.on('closed', () => {
    if (mainWindow === win) mainWindow = null;
  });

  if (isDev) {
    win.loadURL('http://127.0.0.1:7700');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  win.once('ready-to-show', () => {
    win.show();
    if (isDev && process.env.OPEN_DEVTOOLS === 'true') {
      win.webContents.openDevTools({ mode: 'detach' });
    }
  });

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Electron failed to load URL:', errorCode, errorDescription, validatedURL);
  });
}

app.whenReady().then(() => {
  buildAppMenu();
  createWindow();
});

app.on('before-quit', (event) => {
  if (quitConfirmed) return;
  event.preventDefault();
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send('hanpa-app-close-request');
  }
});

ipcMain.on('hanpa-app-close-response', (_event, shouldQuit) => {
  if (!shouldQuit) return;
  quitConfirmed = true;
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
