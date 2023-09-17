# SIMENTA - Sistem Manajemen Tugas Kuliah

## Deskripsi
SIMENTA adalah sistem manajemen tugas kuliah yang dibangun menggunakan teknologi Node.js, Express.js, Sequelize.js, MySQL, dan Bootstrap. Aplikasi ini memudahkan mahasiswa dalam mengelola dan melacak tugas-tugas kuliah mereka.

## Daftar Isi
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Teknologi](#teknologi)
- [Fitur](#fitur)

## Instalasi

1. **Persiapan Lingkungan**

   Pastikan Anda memiliki Node.js, npm, dan MySQL terinstal di sistem Anda.

2. **Klon Repository**

   ```bash
   git clone https://github.com/username/SIMENTA.git
   cd SIMENTA

3. **Instal Dependensi**

    ```bash
    npm install

4. **Konfigurasi Database**
- Pastikan XAMPP telah diaktifkan, termasuk Apache dan MySQL.
- Buat database baru bernama proyek_pribadi di phpMyAdmin.
- Duplikat file .env.example menjadi .env dan sesuaikan pengaturan database.
    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=
    DB_NAME=proyek_pribadi
- Inisialisasi Database
    ```bash
    npx sequelize-cli db:migrate
- Jalankan Aplikasi
    ```bash
    npm start
Aplikasi akan berjalan di http://localhost:3000.

## Penggunaan
1. **Registrasi dan Masuk**
- Buka aplikasi di browser.
- Buat akun baru atau masuk dengan akun yang sudah ada.

2. **Tambah Tugas**
- Setelah masuk, Anda dapat menambahkan tugas baru dengan mengklik tombol "Tambah Tugas".

3. **Lihat dan Kelola Tugas**
- Pada halaman utama, Anda dapat melihat daftar tugas Anda. Klik pada tugas untuk melihat atau mengubah detailnya.

4. **Edit dan Hapus Tugas**
- Pada halaman detail tugas, Anda dapat mengedit atau menghapus tugas.

5. **Keluar**
- Untuk keluar dari akun Anda, klik ikon keluar di sudut kanan atas.

## Teknologi
- Node.js
- Express.js
- Sequelize.js
- MySQL
- Bootstrap

## Fitur
1. **Manajemen Tugas**
   - Tambah, lihat, edit, dan hapus tugas kuliah.
  
2. **Autentikasi Pengguna**
   - Registrasi dan masuk pengguna.
   
3. **Otorisasi**
   - Pengguna memiliki hak akses terbatas sesuai peran (mis. Pengguna biasa, Admin).
   - Setiap pengguna hanya dapat melihat dan mengelola tugas yang mereka miliki.

## Preview
![screencapture-localhost-3000-admin-tugas-2023-09-17-20_23_13](https://github.com/yg-firnanda/SIMENTA_Task-Management-Application/assets/82860149/1685b221-f63b-4dd8-b3c4-ccc5afd64cad)
![screencapture-localhost-3000-admin-tambah-2023-09-17-20_21_36](https://github.com/yg-firnanda/SIMENTA_Task-Management-Application/assets/82860149/917e7f9d-9a54-4a5b-b951-add286e36000)
