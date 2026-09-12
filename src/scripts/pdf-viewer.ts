type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: string) => { promise: Promise<PdfDoc> };
};

type PdfDoc = {
  numPages: number;
  getPage: (page: number) => Promise<{
    getViewport: (opts: { scale: number }) => { width: number; height: number };
    render: (opts: {
      canvasContext: CanvasRenderingContext2D;
      viewport: { width: number; height: number };
    }) => { promise: Promise<void> };
  }>;
};

declare global {
  interface Window {
    pdfjsLib?: PdfJs;
  }
}

async function loadPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('No se pudo cargar PDF.js'));
    document.head.appendChild(script);
  });
  const pdfjs = window.pdfjsLib!;
  pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  return pdfjs;
}

export function initPdfViewer() {
  if (document.documentElement.dataset.pdfInit === '1') return;
  document.documentElement.dataset.pdfInit = '1';

  const dialog = document.querySelector<HTMLDialogElement>('[data-pdf-dialog]');
  const canvas = dialog?.querySelector<HTMLCanvasElement>('[data-pdf-canvas]');
  const titleEl = dialog?.querySelector('[data-pdf-dialog-title]');
  const pageEl = dialog?.querySelector('[data-pdf-page]');
  const spinner = dialog?.querySelector<HTMLElement>('[data-pdf-spinner]');
  if (!dialog || !canvas) return;

  let pdfDoc: PdfDoc | null = null;
  let page = 1;

  const setLoading = (loading: boolean) => {
    if (!spinner) return;
    spinner.hidden = !loading;
  };

  const renderPage = async () => {
    if (!pdfDoc) return;
    setLoading(true);
    try {
      const pdfPage = await pdfDoc.getPage(page);
      const viewport = pdfPage.getViewport({ scale: 1.25 });
      const context = canvas.getContext('2d');
      if (!context) return;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await pdfPage.render({ canvasContext: context, viewport }).promise;
      if (pageEl) pageEl.textContent = `${page} / ${pdfDoc.numPages}`;
    } finally {
      setLoading(false);
    }
  };

  document.querySelectorAll<HTMLElement>('[data-pdf-open]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const src = btn.dataset.pdf;
      if (!src) return;
      if (titleEl) titleEl.textContent = btn.dataset.pdfTitle ?? 'PDF';
      if (pageEl) pageEl.textContent = '…';
      setLoading(true);
      dialog.showModal();
      try {
        const pdfjs = await loadPdfJs();
        pdfDoc = await pdfjs.getDocument(src).promise;
        page = 1;
        await renderPage();
      } catch {
        if (pageEl) pageEl.textContent = 'Error al cargar';
        setLoading(false);
      }
    });
  });

  dialog.querySelector('[data-pdf-close]')?.addEventListener('click', () => {
    dialog.close();
    setLoading(false);
  });
  dialog.querySelector('[data-pdf-prev]')?.addEventListener('click', async () => {
    if (!pdfDoc || page <= 1) return;
    page -= 1;
    await renderPage();
  });
  dialog.querySelector('[data-pdf-next]')?.addEventListener('click', async () => {
    if (!pdfDoc || page >= pdfDoc.numPages) return;
    page += 1;
    await renderPage();
  });
}
