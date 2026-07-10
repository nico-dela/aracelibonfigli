class PdfViewer {
  constructor() {
    this.modal = document.getElementById("pdfModal");
    this.pagesContainer = document.getElementById("pdfPagesContainer");
    this.iframe = document.getElementById("pdfIframe");
    this.titleEl = document.getElementById("pdfModalTitle");
    this.pageCounter = document.getElementById("pdfPageCounter");
    this.loadingEl = document.getElementById("pdfLoading");
    this.errorEl = document.getElementById("pdfError");
    this.downloadLink = document.getElementById("pdfDownloadLink");
    this.closeBtn = document.getElementById("pdfModalCloseBtn");

    this.pdfDoc = null;
    this.totalPages = 0;
    this.pdfjsReady = false;

    this.setupEventListeners();
    this.loadPdfJs();
  }

  async loadPdfJs() {
    if (window.pdfjsLib) {
      this.configurePdfJs();
      return;
    }

    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    this.configurePdfJs();
  }

  configurePdfJs() {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    this.pdfjsReady = true;
  }

  setupEventListeners() {
    document.querySelectorAll(".pdf-preview-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-pdf-src");
        const title = btn.getAttribute("data-pdf-title");
        const downloadName = btn.getAttribute("data-pdf-download");
        this.openModal(src, title, downloadName);
      });
    });

    this.closeBtn.addEventListener("click", () => this.closeModal());

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (this.modal.style.display !== "flex") return;
      if (e.key === "Escape") this.closeModal();
    });
  }

  async openModal(src, title, downloadName) {
    this.titleEl.textContent = title;
    this.downloadLink.href = src;
    this.downloadLink.setAttribute("download", downloadName);
    this.modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    this.closeBtn.focus();
    this.showLoading(true);
    this.hideError();
    this.clearPages();

    try {
      if (!this.pdfjsReady) {
        await this.loadPdfJs();
      }

      const loadingTask = window.pdfjsLib.getDocument(src);
      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;
      await this.renderAllPages();
      this.showLoading(false);
      this.pageCounter.textContent =
        this.totalPages === 1 ? "1 página" : `${this.totalPages} páginas`;
    } catch (error) {
      console.error("Error loading PDF:", error);
      this.showLoading(false);
      this.showIframe(src);
      this.pageCounter.textContent = "Vista previa";
    }
  }

  closeModal() {
    this.modal.style.display = "none";
    document.body.style.overflow = "auto";
    this.pdfDoc = null;
    this.hideIframe();
    this.clearPages();
  }

  clearPages() {
    this.pagesContainer.innerHTML = "";
    this.pagesContainer.hidden = false;
  }

  async renderAllPages() {
    this.hideIframe();
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const containerWidth = Math.max(
      this.pagesContainer.clientWidth || this.modal.querySelector(".pdf-modal-content").clientWidth - 32,
      280
    );

    for (let pageNumber = 1; pageNumber <= this.totalPages; pageNumber += 1) {
      const page = await this.pdfDoc.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = containerWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });

      const pageWrap = document.createElement("div");
      pageWrap.className = "pdf-page-wrap";

      const canvas = document.createElement("canvas");
      canvas.className = "pdf-page-canvas";
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.setAttribute("aria-label", `Página ${pageNumber} de ${this.totalPages}`);

      pageWrap.appendChild(canvas);
      this.pagesContainer.appendChild(pageWrap);

      await page.render({
        canvasContext: canvas.getContext("2d"),
        viewport,
      }).promise;
    }
  }

  showLoading(show) {
    this.loadingEl.hidden = !show;
  }

  showError(message) {
    this.errorEl.hidden = false;
    this.errorEl.textContent = message;
  }

  hideError() {
    this.errorEl.hidden = true;
  }

  showIframe(src) {
    this.pagesContainer.hidden = true;
    this.iframe.src = src;
    this.iframe.hidden = false;
  }

  hideIframe() {
    this.iframe.src = "";
    this.iframe.hidden = true;
    this.pagesContainer.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.pdfViewer = new PdfViewer();
});
