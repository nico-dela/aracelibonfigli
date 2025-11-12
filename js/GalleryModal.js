class GalleryModal {
  constructor() {
    this.modal = document.getElementById("imageModal");
    this.modalImage = document.getElementById("modalImage");
    this.modalCloseBtn = document.getElementById("modalCloseBtn");
    this.modalPrevBtn = document.getElementById("modalPrevBtn");
    this.modalNextBtn = document.getElementById("modalNextBtn");
    this.imageCounter = document.getElementById("imageCounter");

    this.images = [];
    this.currentIndex = 0;

    this.initializeGallery();
    this.setupEventListeners();
  }

  initializeGallery() {
    // Obtener todas las imágenes de la galería
    const galleryImages = document.querySelectorAll(".gallery-image");
    this.images = Array.from(galleryImages).map((img) => ({
      src: img.src,
      alt: img.alt,
    }));
  }

  setupEventListeners() {
    // Agregar click listeners a las imágenes
    document.querySelectorAll(".gallery-image").forEach((img, index) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        this.openModal(index);
      });
      
      // Mejorar el feedback visual al pasar el mouse
      img.addEventListener("mouseenter", () => {
        img.style.filter = "brightness(1.1)";
      });
      
      img.addEventListener("mouseleave", () => {
        img.style.filter = "brightness(1)";
      });
    });

    // Controles del modal
    this.modalCloseBtn.addEventListener("click", () => this.closeModal());
    this.modalPrevBtn.addEventListener("click", () => this.previousImage());
    this.modalNextBtn.addEventListener("click", () => this.nextImage());

    // Cerrar al clickear fuera de la imagen
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Navegación con teclado
    document.addEventListener("keydown", (e) => {
      if (this.modal.style.display === "flex") {
        if (e.key === "ArrowLeft") this.previousImage();
        if (e.key === "ArrowRight") this.nextImage();
        if (e.key === "Escape") this.closeModal();
      }
    });
  }

  openModal(index) {
    this.currentIndex = index;
    this.updateModalImage();
    this.modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  previousImage() {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    this.updateModalImage();
  }

  nextImage() {
    this.currentIndex =
      this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    this.updateModalImage();
  }

  updateModalImage() {
    const image = this.images[this.currentIndex];
    this.modalImage.src = image.src;
    this.modalImage.alt = image.alt;
    this.imageCounter.textContent = `${this.currentIndex + 1} / ${
      this.images.length
    }`;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.galleryModal = new GalleryModal();
});
