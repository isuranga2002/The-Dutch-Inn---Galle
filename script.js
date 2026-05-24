const toggle = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const form = document.querySelector(".contact-form");
const header = document.querySelector(".site-header");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

const updateHeader = () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    header?.classList.toggle("menu-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      header?.classList.remove("menu-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    button.textContent = "Enquiry Ready";
  });
}

document.querySelectorAll(".photo-mosaic img, .gallery img").forEach((image) => {
  image.setAttribute("tabindex", "0");
  image.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    document.body.classList.add("nav-open");
  });
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter") image.click();
  });
});

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
  document.body.classList.remove("nav-open");
};

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
});
