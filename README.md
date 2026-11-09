# Website SMP Gita Kirtti 2

Website profil SMP Gita Kirtti 2 Jakarta. Website ini berisi informasi sekolah,
sejarah, guru dan staf, galeri kegiatan, fasilitas, ekstrakurikuler, persyaratan
masuk, serta cara menghubungi sekolah.

Website dibuat sebagai situs statis dengan HTML, CSS, dan JavaScript. Tidak ada
proses build atau instalasi package Node.js yang diperlukan untuk menjalankan
halaman secara lokal.

## Daftar isi

- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Struktur proyek](#struktur-proyek)
- [Menjalankan secara lokal](#menjalankan-secara-lokal)
- [Halaman dan konten](#halaman-dan-konten)
- [JavaScript](#javascript)
- [Tampilan responsif](#tampilan-responsif)
- [Formulir kontak](#formulir-kontak)
- [Mengubah konten dan aset](#mengubah-konten-dan-aset)
- [Pemeriksaan sebelum publikasi](#pemeriksaan-sebelum-publikasi)

## Fitur

- Navigasi desktop dan menu hamburger di layar kecil. Menu mobile dibuka dari
  sisi kanan dan dapat ditutup melalui tombol X, overlay, tombol `Escape`, atau
  pemilihan tautan.
- Navbar utama berubah warna setelah halaman digulir.
- Bagian sejarah dengan foto sekolah dan deskripsi.
- Carousel guru dan staf dengan tombol, titik indikator, geser sentuh, dan
  autoplay.
- Galeri foto kegiatan dengan susunan kartu bertumpuk, tampilan grid, dan
  lightbox.
- Timeline fasilitas sekolah dengan layout zigzag.
- Kartu ekstrakurikuler dengan nama kegiatan di atas foto.
- Formulir kontak melalui EmailJS.
- Animasi masuk ringan saat bagian halaman muncul ketika digulir.
- Dukungan preferensi aksesibilitas `prefers-reduced-motion`.
- Halaman khusus visi dan misi.

## Teknologi

- HTML5 untuk struktur halaman.
- CSS3 untuk tampilan, layout, breakpoint, transisi, dan animasi.
- JavaScript browser tanpa framework untuk navigasi, carousel, galeri, formulir,
  dan animasi masuk.
- Bootstrap 5.3.3 dimuat melalui CDN pada halaman utama.
- Poppins dan Quicksand dimuat melalui Google Fonts. Halaman Visi dan Misi
  memuat Poppins.
- EmailJS Browser SDK v4 untuk pengiriman formulir kontak.
- Google Maps Embed untuk peta pada bagian kontak.

Beberapa fitur memerlukan koneksi internet karena library, font, peta, dan
pengiriman formulir dimuat dari layanan eksternal.

## Struktur proyek

```text
.
├── index.html                    # Halaman utama dan bagian profil sekolah
├── visi-misi.html                # Halaman visi dan misi
└── src/
    ├── asset/
    │   ├── icon/                 # Favicon dan aset ikon
    │   └── images/
    │       ├── eskul/            # Foto ekstrakurikuler
    │       ├── fasilitas/        # Foto fasilitas sekolah
    │       ├── guru/             # Foto guru yang tersedia
    │       └── kegiatan/         # Foto galeri kegiatan
    ├── css/
    │   └── style.css             # Seluruh style desktop dan responsif
    └── js/
        ├── contact.js            # Pengiriman formulir melalui EmailJS
        ├── navbar-mobile.js      # Interaksi menu hamburger
        ├── script.js             # Navbar scroll, carousel, dan galeri
        └── scroll-reveal.js      # Animasi masuk saat menggulir
```

## Menjalankan secara lokal

### Pilihan 1: VS Code Live Server

1. Buka folder proyek di Visual Studio Code.
2. Pasang ekstensi Live Server jika belum tersedia.
3. Klik kanan `index.html`, lalu pilih **Open with Live Server**.
4. Buka halaman `visi-misi.html` untuk memeriksa halaman visi dan misi.

### Pilihan 2: server Python

Buka terminal pada direktori utama proyek, lalu jalankan:

```powershell
py -m http.server 8000
```

Jika perintah `py` tidak tersedia tetapi Python terpasang, gunakan:

```powershell
python -m http.server 8000
```

Kemudian kunjungi:

- Halaman utama: `http://localhost:8000/`
- Visi dan Misi: `http://localhost:8000/visi-misi.html`

Hentikan server dengan `Ctrl+C` di terminal. Jalankan situs melalui server lokal
agar tautan relatif, script, dan aset diuji seperti saat dipublikasikan.

## Halaman dan konten

### Halaman utama — `index.html`

Urutan bagian pada halaman utama:

1. **Beranda** — judul sekolah dan pengantar singkat.
2. **Sejarah Sekolah** — foto sekolah dan ringkasan sejarah yayasan serta
   sekolah.
3. **Guru dan Staf** — kartu profil dalam carousel.
4. **Galeri Kegiatan** — foto kegiatan siswa, dengan mode tumpukan dan grid.
5. **Fasilitas Sekolah** — informasi fasilitas dalam timeline zigzag.
6. **Ekstrakurikuler** — foto dan nama kegiatan.
7. **Persyaratan Masuk** — daftar dokumen dan alur pendaftaran.
8. **Kontak** — alamat, informasi kontak, peta, dan formulir pesan.
9. **Footer** — identitas sekolah dan tautan cepat.

### Halaman Visi dan Misi — `visi-misi.html`

Halaman mandiri untuk visi, daftar misi, navigasi, dan footer. Halaman ini
memakai `navbar-mobile.js` dan `scroll-reveal.js`, tetapi tidak memuat
`script.js`, karena script terakhir berisi fungsi yang khusus untuk komponen
halaman utama.

## JavaScript

### `src/js/script.js`

- Menambahkan atau menghapus class `scrolled` pada navbar utama ketika posisi
  gulir melewati 50 piksel.
- Mengatur carousel guru:
  - Jumlah kartu per tampilan dibaca dari variabel CSS `--per-view`.
  - Tombol panah dan titik indikator menggeser carousel.
  - Carousel bergerak otomatis setiap 5 detik.
  - Autoplay berhenti saat pengguna berinteraksi atau tab tidak aktif.
  - Autoplay tidak berjalan jika perangkat memilih pengurangan animasi.
- Mengelola tumpukan foto galeri, mode grid, dan dialog lightbox.
- Mengatur tinggi tumpukan galeri berdasarkan breakpoint CSS.

Script ini hanya dimuat pada halaman utama karena membutuhkan elemen carousel
dan galeri yang tidak tersedia di halaman Visi dan Misi.

### `src/js/navbar-mobile.js`

Mengelola menu mobile yang terpisah dari markup navigasi desktop. Script
membuka dan menutup panel, memperbarui `aria-expanded`, mengunci gulir halaman
saat panel terbuka, mengembalikan fokus keyboard, serta menutup panel ketika
layar kembali ke ukuran desktop.

### `src/js/scroll-reveal.js`

Menggunakan `IntersectionObserver` untuk memulai animasi saat elemen mendekati
area layar. Setiap elemen dianimasikan satu kali. Kartu fasilitas ditampilkan
bertahap ketika pengguna menggulir. Jika `IntersectionObserver` tidak didukung
atau preferensi pengurangan animasi aktif, konten langsung ditampilkan.

### `src/js/contact.js`

Mengirim isi formulir menggunakan EmailJS. Saat proses pengiriman berlangsung,
tombol submit dinonaktifkan sementara. Formulir menampilkan pesan sukses atau
gagal dan memiliki kolom jebakan untuk membantu mengurangi spam.

## Tampilan responsif

Breakpoint penting yang saat ini digunakan di `src/css/style.css`:

| Ukuran layar | Perilaku |
| --- | --- |
| Maksimal 992 px | Navigasi desktop digantikan tombol hamburger; bagian guru menampilkan tiga kartu; galeri menggunakan tiga kolom; ukuran tumpukan galeri menjadi 250 px. |
| Maksimal 900 px | Bagian sejarah berubah menjadi satu kolom dengan judul, foto, lalu deskripsi. |
| Maksimal 768 px | Kartu fasilitas diringkas tetapi tetap zigzag; ekstrakurikuler menjadi satu kartu per baris dengan foto berukuran sedang. |
| Maksimal 600 px | Carousel guru menampilkan dua kartu; jarak dan tipografi kartu diperkecil; tinggi tumpukan galeri menjadi 210 px. |
| Maksimal 480 px | Jarak dan ukuran elemen timeline fasilitas disesuaikan untuk ponsel kecil. |

Selain breakpoint tersebut, ukuran beberapa teks menggunakan `clamp()` agar
menyesuaikan lebar viewport. Periksa tampilan di perangkat yang berbeda setelah
mengubah isi atau style.

## Formulir kontak

Formulir berada pada bagian Kontak di `index.html`. Integrasi menggunakan
EmailJS Browser SDK v4 yang dimuat melalui CDN, sedangkan pengiriman diatur
dalam `src/js/contact.js`.

Untuk mengubah konfigurasi EmailJS:

1. Pastikan layanan EmailJS dan template pesan tersedia pada akun yang
   digunakan.
2. Periksa public key, service ID, dan template ID pada konstanta di
   `src/js/contact.js`.
3. Sesuaikan nama field form dan placeholder template EmailJS agar cocok.
4. Kirim pesan uji dan periksa status berhasil maupun gagal.

Public key EmailJS digunakan dari browser dan bukan pengganti pengamanan
konfigurasi akun. Jangan menaruh password, private key, token rahasia, atau
kredensial server di HTML maupun JavaScript yang dikirim ke browser.

Informasi nomor telepon, alamat email, jam operasional, dan beberapa detail
pendaftaran masih memiliki placeholder `[ISI: ...]` di halaman. Ganti dengan
informasi resmi sebelum website dipublikasikan.

## Mengubah konten dan aset

- **Teks dan susunan halaman:** edit file HTML yang sesuai.
- **Warna, layout, breakpoint, tipografi, dan animasi CSS:** edit
  `src/css/style.css`.
- **Logo sekolah:** gunakan aset di `src/asset/images/smp-gita-tirtti-2.png`.
- **Foto guru:** perbarui elemen kartu guru di `index.html` dan pastikan path
  gambar berada di dalam `src/asset/images/`.
- **Foto kegiatan, fasilitas, dan ekstrakurikuler:** letakkan file pada folder
  kategori yang sesuai, lalu perbarui atribut `src` pada HTML.
- **Perilaku menu mobile:** edit `src/js/navbar-mobile.js`.
- **Carousel dan galeri:** edit `src/js/script.js`.
- **Animasi saat scroll:** edit `src/js/scroll-reveal.js` serta class terkait
  di CSS.

Gunakan path relatif seperti `./src/asset/images/...` agar aset tetap dapat
dimuat di server lokal maupun hosting statis.

## Pemeriksaan sebelum publikasi

- Buka `index.html` dan `visi-misi.html` melalui server lokal.
- Uji menu pada ukuran desktop dan mobile: buka, tutup dengan X, overlay,
  `Escape`, dan pilih tautan.
- Uji carousel guru dengan tombol, indikator, sentuhan, dan perubahan ukuran
  layar.
- Buka tumpukan galeri, periksa susunan tiga kolom, lightbox, dan tombol
  **Rapikan kembali**.
- Periksa bahwa timeline fasilitas tetap zigzag dan kartu muncul bertahap.
- Periksa kartu ekstrakurikuler dan urutan konten pada ponsel.
- Kirim formulir kontak uji dan pastikan konfigurasi EmailJS masih aktif.
- Periksa console browser untuk error JavaScript dan aset yang tidak ditemukan.
- Ganti semua placeholder informasi sekolah dan pendaftaran dengan data resmi.
- Pastikan navigasi keyboard dan pengaturan `prefers-reduced-motion` tetap
  berfungsi.

Karena proyek ini tidak memiliki konfigurasi test runner atau proses build,
pemeriksaan utama dilakukan melalui browser.
