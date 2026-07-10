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

    this.setupEventListeners();
  }

  getAlbumImages(img) {
    const albumContainer = img.closest(".carousel-inner");
    if (!albumContainer) return [];

    return Array.from(albumContainer.querySelectorAll(".gallery-image")).map(
      (image) => ({
        src: image.src,
        alt: image.alt,
      })
    );
  }

  setupEventListeners() {
    document.querySelectorAll(".gallery-image").forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        const albumImages = this.getAlbumImages(img);
        const localIndex = albumImages.findIndex(
          (image) => image.src === img.src
        );
        this.openModal(albumImages, localIndex >= 0 ? localIndex : 0);
      });

      img.addEventListener("mouseenter", () => {
        img.style.filter = "brightness(1.1)";
      });

      img.addEventListener("mouseleave", () => {
        img.style.filter = "brightness(1)";
      });
    });

    this.modalCloseBtn.addEventListener("click", () => this.closeModal());
    this.modalPrevBtn.addEventListener("click", () => this.previousImage());
    this.modalNextBtn.addEventListener("click", () => this.nextImage());

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (this.modal.style.display === "flex") {
        if (e.key === "ArrowLeft") this.previousImage();
        if (e.key === "ArrowRight") this.nextImage();
        if (e.key === "Escape") this.closeModal();
      }
    });
  }

  openModal(images, index) {
    this.images = images;
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
    if (!this.images.length) return;

    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    this.updateModalImage();
  }

  nextImage() {
    if (!this.images.length) return;

    this.currentIndex =
      this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    this.updateModalImage();
  }

  updateModalImage() {
    const image = this.images[this.currentIndex];
    this.modalImage.src = image.src;
    this.modalImage.alt = image.alt;
    this.imageCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.galleryModal = new GalleryModal();
});
