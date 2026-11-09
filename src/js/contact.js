// ===== Form kontak (EmailJS) =====
const EMAILJS_PUBLIC_KEY = "h_W2JT6MgCWwsq7DW";
const EMAILJS_SERVICE_ID = "service_byg43bg";
const EMAILJS_TEMPLATE_ID = "template_fkd2n0r";

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    if (typeof emailjs === "undefined") {
        console.error("SDK EmailJS belum termuat. Cek tag script-nya di index.html.");
    } else {
        const contactButton = contactForm.querySelector('button[type="submit"]');
        const contactStatus = document.querySelector(".form-status");
        const teksAsli = contactButton.textContent;

        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

        const tampilkanStatus = (pesan, jenis) => {
            contactStatus.textContent = pesan;
            contactStatus.classList.remove("sukses", "gagal");
            contactStatus.classList.add(jenis);
        };

        contactForm.addEventListener("submit", (e) => {
            // 1. Hentikan pengiriman bawaan browser
            e.preventDefault();

            // 2. Kolom jebakan bot: kalau terisi, berhenti diam-diam
            const jebakan =
                contactForm.elements["kolom-cadangan"] ||
                contactForm.elements["website"];
            if (jebakan && jebakan.value.trim() !== "") return;

            // 3. Matikan tombol selama proses kirim
            contactButton.disabled = true;
            contactButton.textContent = "Mengirim...";
            contactStatus.textContent = "";

            // 4. Kirim lewat EmailJS
            emailjs
                .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                .then(() => {
                    contactForm.reset();
                    tampilkanStatus(
                        "Pesan terkirim. Terima kasih sudah menghubungi kami.",
                        "sukses"
                    );
                })
                .catch((err) => {
                    console.error("EmailJS gagal:", err);
                    tampilkanStatus(
                        "Maaf, pesan belum terkirim. Silakan coba lagi nanti atau hubungi sekolah lewat telepon.",
                        "gagal"
                    );
                })
                .finally(() => {
                    contactButton.disabled = false;
                    contactButton.textContent = teksAsli;
                });
        });
    }
}