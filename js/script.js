/* ==========================================================================
   Alexandria — behavior
   Mobile nav toggle, gallery lightbox, smooth-scroll highlighting
   ========================================================================== */

(function () {
    "use strict";

    // ---- Mobile navigation -------------------------------------------------
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav-list a");

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            const expanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", !expanded);
            nav.classList.toggle("open");
        });

        // Close menu when a link is clicked
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                toggle.setAttribute("aria-expanded", "false");
                nav.classList.remove("open");
            });
        });
    }

    // ---- Gallery lightbox --------------------------------------------------
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption");
    const modalClose = document.querySelector(".modal-close");
    const galleryLinks = document.querySelectorAll(".gallery-link");

    function openModal(src, alt) {
        modalImg.src = src;
        modalImg.alt = alt;
        modalCaption.textContent = alt || "";
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    galleryLinks.forEach(function (link) {
        const img = link.querySelector("img");
        link.addEventListener("click", function (event) {
            event.preventDefault();
            openModal(img.src, img.alt);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    // Click backdrop to close
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });

    // ---- Active nav link on scroll ----------------------------------------
    const sections = document.querySelectorAll("main section[id]");
    const headerLinks = document.querySelectorAll(".nav-list a[href^='#']");

    function setActiveLink() {
        const scrollPos = window.scrollY + document.querySelector(".site-header").offsetHeight + 40;

        let currentId = null;
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                currentId = section.getAttribute("id");
            }
        });

        headerLinks.forEach(function (link) {
            const href = link.getAttribute("href").replace("#", "");
            if (href === currentId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveLink, { passive: true });
    window.addEventListener("load", setActiveLink);

    // ---- Form submit hint --------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending…";
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }
})();
