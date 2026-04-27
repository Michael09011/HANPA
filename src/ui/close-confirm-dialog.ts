/** 종료 시 저장 여부를 묻는 모달 다이얼로그 */
export type CloseDialogChoice = 'save' | 'dont-save' | 'cancel';

export class CloseConfirmDialog {
  private overlay: HTMLDivElement | null = null;
  private resolver: ((choice: CloseDialogChoice) => void) | null = null;
  private keyHandler: ((e: KeyboardEvent) => void) | null = null;

  constructor(private fileName: string) {}

  async showAsync(): Promise<CloseDialogChoice> {
    return new Promise((resolve) => {
      this.resolver = resolve;
      this.build();
      document.body.appendChild(this.overlay!);
      this.bindKeyboard();

      const primaryBtn = this.overlay!.querySelector('.dialog-btn-primary') as HTMLButtonElement | null;
      primaryBtn?.focus();
    });
  }

  private build(): void {
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';

    const dialog = document.createElement('div');
    dialog.className = 'dialog-wrap';
    dialog.style.width = '420px';

    const title = document.createElement('div');
    title.className = 'dialog-title';
    title.textContent = '종료';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'dialog-close';
    closeBtn.textContent = '\u00D7';
    closeBtn.addEventListener('click', () => this.resolve('cancel'));
    title.appendChild(closeBtn);
    dialog.appendChild(title);

    const body = document.createElement('div');
    body.className = 'dialog-body';
    body.style.padding = '16px 20px';
    body.style.lineHeight = '1.6';
    body.textContent = `${this.fileName}에 변경 사항이 있습니다.
저장하시겠습니까?`;
    dialog.appendChild(body);

    const footer = document.createElement('div');
    footer.className = 'dialog-footer';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'dialog-btn dialog-btn-primary';
    saveBtn.textContent = '저장';
    saveBtn.addEventListener('click', () => this.resolve('save'));

    const dontSaveBtn = document.createElement('button');
    dontSaveBtn.className = 'dialog-btn';
    dontSaveBtn.textContent = '저장 안 함';
    dontSaveBtn.addEventListener('click', () => this.resolve('dont-save'));

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'dialog-btn';
    cancelBtn.textContent = '취소';
    cancelBtn.addEventListener('click', () => this.resolve('cancel'));

    footer.appendChild(saveBtn);
    footer.appendChild(dontSaveBtn);
    footer.appendChild(cancelBtn);
    dialog.appendChild(footer);

    this.overlay.appendChild(dialog);

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.resolve('cancel');
      }
    });
  }

  private bindKeyboard(): void {
    this.keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        this.resolve('cancel');
        return;
      }
      if (e.key === 'Enter') {
        e.stopPropagation();
        e.preventDefault();
        this.resolve('save');
        return;
      }
      e.stopPropagation();
    };
    document.addEventListener('keydown', this.keyHandler, true);
  }

  private resolve(choice: CloseDialogChoice): void {
    if (!this.resolver) return;
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler, true);
      this.keyHandler = null;
    }
    const resolve = this.resolver;
    this.resolver = null;
    this.overlay?.remove();
    resolve(choice);
  }
}

export async function showCloseConfirm(fileName: string): Promise<CloseDialogChoice> {
  const dialog = new CloseConfirmDialog(fileName || '문서');
  return dialog.showAsync();
}
