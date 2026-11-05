// BARU: tampilkan bagian halaman dengan animasi ringan satu kali saat terlihat.
const revealTargets = document.querySelectorAll(
    ".hero-content, .wrap-sjr, .container-gr, .container-galeri, " +
    ".container-eskul, .syarat-container, " +
    ".container-contact, .vm-container, .site-footer .footer-content, " +
    ".site-footer .footer-bottom"
);

// BARU: animasikan judul dan setiap kartu fasilitas secara bertahap.
const facilityTargets = document.querySelectorAll(".fasilitas-sect h2, .fasilitas-intro");
const facilityCards = document.querySelectorAll(".fasilitas-card");
const facilityTimeline = document.querySelector(".fasilitas-timeline");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    facilityTargets.forEach((target) => target.classList.add("is-visible"));
    facilityCards.forEach((card) => card.classList.add("is-visible"));
    facilityTimeline?.classList.add("facility-line-visible");
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );

    revealTargets.forEach((target) => {
        target.classList.add("scroll-reveal");
        revealObserver.observe(target);
    });

    if (facilityTimeline && (facilityTargets.length > 0 || facilityCards.length > 0)) {
        facilityTimeline.classList.add("facility-line-reveal");

        let nextFacilityCard = 0;
        let lastFacilityCardRevealY = null;
        const pendingFacilityCards = new Set();

        function revealNextFacilityCard() {
            const card = facilityCards[nextFacilityCard];
            if (!card || !pendingFacilityCards.has(card)) return;

            if (
                lastFacilityCardRevealY !== null &&
                window.scrollY < lastFacilityCardRevealY + 120
            ) {
                return;
            }

            card.classList.add("is-visible");
            pendingFacilityCards.delete(card);

            if (nextFacilityCard === 0) {
                facilityTimeline.classList.add("facility-line-visible");
            }

            nextFacilityCard += 1;
            lastFacilityCardRevealY = window.scrollY;
        }

        const facilityObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target.matches(".fasilitas-card")) {
                            pendingFacilityCards.add(entry.target);
                            observer.unobserve(entry.target);
                        } else {
                            entry.target.classList.add("is-visible");
                        }
                    }
                });

                revealNextFacilityCard();
            },
            { threshold: 0.08, rootMargin: "0px 0px -45% 0px" }
        );

        facilityTargets.forEach((target) => {
            target.classList.add("scroll-reveal");
            facilityObserver.observe(target);
        });

        facilityCards.forEach((card) => {
            card.classList.add("scroll-reveal");
            facilityObserver.observe(card);
        });

        window.addEventListener(
            "scroll",
            revealNextFacilityCard,
            { passive: true }
        );
    }
}
