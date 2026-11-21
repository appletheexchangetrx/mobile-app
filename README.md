# Mobile App

Dokumentasi arsitektur aplikasi mobile berbasis React Native untuk platform Android dan iOS.

## Prinsip Utama

- **Mobile only:** aplikasi ditujukan untuk perangkat Android dan iOS.
- **Single-file architecture:** seluruh kode aplikasi ditempatkan dalam satu file, yaitu `App.jsx`.
- **No additional source files:** jangan membuat file atau folder kode tambahan tanpa persetujuan eksplisit.
- **Native components:** gunakan komponen dan API React Native, bukan elemen HTML atau CSS web.
- **Structured sections:** pertahankan urutan dan penamaan section pada struktur `App.jsx).
- **Incremental implementation:** implementasikan fitur sesuai kebutuhan; jangan membuat fitur atau integrasi yang belum diminta.
- **Dependency awareness:** library eksternal boleh digunakan jika diperlukan, tetapi dependency harus tersedia dan dicatat pada konfigurasi project yang sesuai. Jangan mengarang dependency yang sudah terpasang.

## Struktur Wajib App.jsx

Struktur berikut menjadi acuan organisasi internal file `App.jsx`. Semua bagian berada dalam satu file, bukan folder atau file terpisah.

```text
App.jsx
│
├── 1. App Configuration
├── 2. Constants & Environment
├── 3. Theme & Design System
├── 4. Global Styles
│
├── 5. Device & Platform
│   ├── Android Configuration
│   ├── iOS Configuration
│   ├── Safe Area
│   ├── Status Bar
│   ├── Screen Dimensions
│   └── Keyboard Handling
│
├── 6. Navigation
│   ├── Root Navigation
│   ├── Stack Navigation
│   ├── Tab Navigation
│   ├── Drawer Navigation
│   └── Navigation Guards
│
├── 7. Components
│   ├── Layout
│   ├── UI Elements
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   ├── Modals
│   ├── Bottom Sheets
│   ├── Lists
│   └── Feedback Components
│
├── 8. Context & State Management
├── 9. Custom Hooks
├── 10. Services & API
├── 11. Data Models & Schemas
│
├── 12. Authentication
├── 13. Authorization
├── 14. Local Storage
├── 15. Secure Storage
├── 16. Network Connectivity
│
├── 17. Business Logic
├── 18. Form Handling & Validation
├── 19. Utilities & Formatting
│
├── 20. Screens / Pages
│   ├── Splash Screen
│   ├── Onboarding
│   ├── Login
│   ├── Register
│   ├── Home
│   ├── Products
│   ├── Product Details
│   ├── Search
│   ├── Cart
│   ├── Checkout
│   ├── Orders
│   ├── Notifications
│   ├── Profile
│   └── Settings
│
├── 21. Image & Media Handling
├── 22. Camera & Gallery
├── 23. Push Notifications
├── 24. Deep Linking
├── 25. Permissions Management
├── 26. Location Services
├── 27. Error Handling
├── 28. Loading & Empty States
├── 29. Analytics & Logging
├── 30. Accessibility
├── 31. Performance Optimization
├── 32. Offline Support
├── 33. App Lifecycle Management
├── 34. Main App
└── 35. App Entry Point
```

## Aturan Pengembangan

1. Sebelum mengubah kode, baca README ini dan periksa isi terbaru `App.jsx`.
2. Tampilkan struktur tree `App.jsx` saat memulai pekerjaan dan setelah perubahan yang memengaruhi struktur.
3. Pertahankan semua section yang sudah ada. Jangan menghapus, mengganti nama, atau memindahkan section tanpa alasan teknis dan persetujuan.
4. Saat menambahkan fitur, tempatkan implementasinya pada section yang paling sesuai.
5. Hindari duplikasi komponen, fungsi, state, hooks, dan service. Gunakan implementasi yang sudah ada jika sesuai.
6. Jangan menimpa seluruh `App.jsx` hanya untuk perubahan kecil. Lakukan perubahan terarah dan pertahankan fitur yang tidak terkait.
7. Jangan mengasumsikan API, skema database, environment variable, dependency, atau konfigurasi yang belum diverifikasi.
8. Tangani loading, error, empty state, validasi, dan kondisi jaringan sesuai kebutuhan fitur.
9. Perhatikan perbedaan Android dan iOS, safe area, status bar, keyboard, permission, serta siklus hidup aplikasi.
10. Jangan mengklaim implementasi atau pengujian berhasil sebelum benar-benar dijalankan dan diverifikasi.

## Batasan Scope

- Target platform: Android dan iOS.
- File sumber aplikasi: `App.jsx` saja.
- File dokumentasi: `README.md`.
- Tidak membuat aplikasi web atau layout desktop.
- Tidak membuat file sumber tambahan kecuali pengguna secara eksplisit mengubah aturan single-file ini.

## Catatan

Struktur di atas adalah arsitektur target, bukan pernyataan bahwa semua fitur sudah diimplementasikan. Section dapat berisi placeholder atau belum digunakan sampai fiturnya benar-benar dibutuhkan.
