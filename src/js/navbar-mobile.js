// BARU: interaksi menu hamburger untuk halaman beranda dan Visi-Misi.
const mobileNavToggle = document.querySelector(".nav-mobile-toggle");
const mobileNavPanel = document.querySelector(".nav-mobile-panel");
const mobileNavClose = document.querySelector(".nav-mobile-close");
const mobileNavOverlay = document.querySelector(".nav-mobile-overlay");

if (mobileNavToggle && mobileNavPanel && mobileNavClose && mobileNavOverlay) {
    const mobileNavBreakpoint = window.matchMedia("(max-width: 992px)");

    function openMobileNav() {
        mobileNavPanel.classList.add("is-open");
        mobileNavOverlay.classList.add("is-open");
        mobileNavPanel.inert = false;
        mobileNavPanel.setAttribute("aria-hidden", "false");
        mobileNavToggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("nav-mobile-no-scroll");
        mobileNavClose.focus();
    }

    function closeMobileNav(restoreFocus = true) {
        mobileNavPanel.classList.remove("is-open");
        mobileNavOverlay.classList.remove("is-open");
        mobileNavPanel.inert = true;
        mobileNavPanel.setAttribute("aria-hidden", "true");
        mobileNavToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-mobile-no-scroll");

        if (restoreFocus && mobileNavBreakpoint.matches) {
            mobileNavToggle.focus();
        }
    }

    mobileNavToggle.addEventListener("click", openMobileNav);
    mobileNavClose.addEventListener("click", () => closeMobileNav());
    mobileNavOverlay.addEventListener("click", () => closeMobileNav());

    mobileNavPanel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => closeMobileNav());
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileNavPanel.classList.contains("is-open")) {
            closeMobileNav();
        }
    });

    mobileNavBreakpoint.addEventListener("change", (event) => {
        if (!event.matches && mobileNavPanel.classList.contains("is-open")) {
            closeMobileNav(false);
        }
    });
}
