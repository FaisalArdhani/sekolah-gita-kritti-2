window.addEventListener("scroll", () => {
    const nav = document.querySelector(".container-nav");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled")
    } else {
        nav.classList.remove("scrolled")
    }
})

// ===== Carousel guru =====
const carousel = document.querySelector(".carousel-gr");
const jalur = document.querySelector(".daftar-gr");
const sebelum = document.querySelector(".carousel-btn.prev");
const selanjut = document.querySelector(".carousel-btn.next");
const dots = document.querySelector(".carousel-dots");
const cards = document.querySelectorAll(".card-gr");

// Berapa kartu yang tampil per halaman (dibaca dari CSS, berubah di layar kecil)
function hitungPerView() {
    const teks = getComputedStyle(carousel).getPropertyValue("--per-view");
    return parseInt(teks) || 1;
}

// Berapa piksel jalur digeser untuk pindah satu halaman
function hitungLangkah() {
    const perView = hitungPerView();
    const kartuAwal = cards[0];
    const kartuTujuan = cards[perView] || cards[cards.length - 1];
    return kartuTujuan.offsetLeft - kartuAwal.offsetLeft || jalur.clientWidth;
}

function jumlahHalaman() {
    return Math.ceil(cards.length / hitungPerView());
}

// Halaman yang sedang tampil (dihitung dari posisi geser)
function halamanAktif() {
    const jumlah = jumlahHalaman();
    const diUjung =
        jalur.scrollLeft + jalur.clientWidth >= jalur.scrollWidth - 5;
    if (diUjung) return jumlah - 1;
    return Math.min(Math.round(jalur.scrollLeft / hitungLangkah()), jumlah - 1);
}

// Perbarui titik aktif dan status tombol
function perbarui() {
    const aktif = halamanAktif();
    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === aktif);
    });
    sebelum.disabled = jalur.scrollLeft <= 5;
    selanjut.disabled =
        jalur.scrollLeft + jalur.clientWidth >= jalur.scrollWidth - 5;
}

// Buat titik indikator sesuai jumlah halaman
function buatDots() {
    dots.innerHTML = "";
    for (let i = 0; i < jumlahHalaman(); i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot";
        dot.setAttribute("aria-label", `Halaman ${i + 1}`);
        dot.addEventListener("click", () => {
            jalur.scrollTo({ left: i * hitungLangkah(), behavior: "smooth" });
        });
        dots.appendChild(dot);
    }
    perbarui();
}

// Tombol panah
selanjut.addEventListener("click", () => {
    jalur.scrollBy({ left: hitungLangkah(), behavior: "smooth" });
});

sebelum.addEventListener("click", () => {
    jalur.scrollBy({ left: -hitungLangkah(), behavior: "smooth" });
});

// Titik ikut berubah saat digeser, dan dibuat ulang saat ukuran layar berubah
jalur.addEventListener("scroll", perbarui);
window.addEventListener("resize", buatDots);

buatDots();

// ===== Geser otomatis =====
const JEDA = 5000; // 10 detik
let timer;

function geserOtomatis() {
    const diUjung =
        jalur.scrollLeft + jalur.clientWidth >= jalur.scrollWidth - 5;

    if (diUjung) {
        jalur.scrollTo({ left: 0, behavior: "smooth" }); // kembali ke awal
    } else {
        jalur.scrollBy({ left: hitungLangkah(), behavior: "smooth" });
    }
}

function hentikanAutoplay() {
    clearInterval(timer);
}

function mulaiAutoplay() {
    // hormati pengguna yang mematikan animasi di perangkatnya
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hentikanAutoplay(); // pastikan tidak ada timer ganda
    timer = setInterval(geserOtomatis, JEDA);
}

// Berhenti saat pengunjung sedang berinteraksi, lanjut saat selesai
[carousel, dots].forEach((el) => {
    el.addEventListener("mouseenter", hentikanAutoplay);
    el.addEventListener("mouseleave", mulaiAutoplay);
    el.addEventListener("focusin", hentikanAutoplay);
    el.addEventListener("focusout", mulaiAutoplay);
    el.addEventListener("touchstart", hentikanAutoplay, { passive: true });
    el.addEventListener("touchend", mulaiAutoplay);
});

// Berhenti saat tab browser tidak sedang dilihat
document.addEventListener("visibilitychange", () => {
    document.hidden ? hentikanAutoplay() : mulaiAutoplay();
});

mulaiAutoplay();

// ===== Lightbox galeri =====
const galeriItems = document.querySelectorAll(".galeri-item");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox.querySelector("img");
const tutupLightbox = lightbox.querySelector(".lightbox-close");

galeriItems.forEach((item) => {
    item.addEventListener("click", () => {
        const foto = item.querySelector("img");
        lightboxImg.src = foto.src;
        lightboxImg.alt = foto.alt;
        lightbox.showModal();
    });
});

tutupLightbox.addEventListener("click", () => lightbox.close());

// Klik di area gelap (luar foto) juga menutup
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
});


const stage = document.getElementById("galeriStage");
const galeri = document.getElementById("galeriContent");
const items = galeri.querySelectorAll(".galeri-item");
const petunjuk = document.getElementById("galeriPetunjuk");
const tombolTutup = document.getElementById("galeriTutup");

const TINGGI_TUMPUK = 340; // tinggi area saat bertumpuk (px)
const SUDUT_KIPAS = 6;     // makin besar, kipas makin lebar

// BARU: gunakan tinggi tumpukan dari CSS agar ukurannya menyesuaikan perangkat.
function tinggiTumpukan() {
    return (
        parseFloat(getComputedStyle(stage).getPropertyValue("--stack-height")) ||
        TINGGI_TUMPUK
    );
}

function aturTumpukan() {
    const lebar = galeri.clientWidth;
    const jumlah = items.length;
    const tinggi = tinggiTumpukan();

    items.forEach((item, i) => {
        // jarak dari titik tengah kartu ke titik tengah tumpukan
        const x = lebar / 2 - (item.offsetLeft + item.offsetWidth / 2);
        const y = tinggi / 2 - (item.offsetTop + item.offsetHeight / 2);

        item.style.setProperty("--x", x + "px");
        item.style.setProperty("--y", y + "px");
        item.style.setProperty("--r", (i - (jumlah - 1) / 2) * SUDUT_KIPAS + "deg");
        item.style.setProperty("--delay", i * 0.04 + "s");
        item.style.zIndex = i;
    });

    const terbuka = galeri.classList.contains("terbuka");
    stage.style.height = (terbuka ? galeri.offsetHeight : tinggi) + "px";
}

function buka() {
    galeri.classList.add("terbuka");
    petunjuk.hidden = true;
    tombolTutup.hidden = false;
    aturTumpukan();
}

function tutup() {
    galeri.classList.remove("terbuka");
    petunjuk.hidden = false;
    tombolTutup.hidden = true;
    aturTumpukan();
}

// Fase capture: saat masih bertumpuk, klik hanya membuka tumpukan
// dan tidak diteruskan ke lightbox
galeri.addEventListener(
    "click",
    (e) => {
        if (!galeri.classList.contains("terbuka")) {
            e.stopPropagation();
            buka();
        }
    },
    true
);

tombolTutup.addEventListener("click", tutup);
window.addEventListener("resize", aturTumpukan);
window.addEventListener("load", aturTumpukan);
aturTumpukan();