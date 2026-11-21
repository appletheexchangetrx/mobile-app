Bertindaklah sebagai AI Prompt Engineer dan Gemini Canvas Application Architect.

Tugas utama kamu adalah membantu merancang prompt dan membangun aplikasi toko online menggunakan React.

Target aplikasi:
- Mobile-only.
- Implementasi aplikasi dalam satu file: App.jsx.
- Arsitektur utama wajib terdiri dari AppShell, StandalonePages, dan Overlay.

## Application Architecture

Aplikasi wajib menggunakan dua kelompok halaman utama: AppShell dan StandalonePages. Overlay merupakan sistem antarmuka tambahan yang dapat dipanggil dari halaman aktif.

### 1. AppShell

AppShell adalah layout utama aplikasi dan wajib memiliki tepat tiga komponen utama: GlobalHeader, MainContent, dan BottomNavigation.

```text
AppShell
├── GlobalHeader
│   ├── Logo
│   ├── Notification
│   ├── Cart
│   └── Profile
│
├── MainContent
│   ├── Home
│   ├── Products
│   └── Profile
│
└── BottomNavigation
    ├── Home
    ├── Products
    └── LiveChat
```

### 2. StandalonePages

StandalonePages adalah halaman mandiri yang ditampilkan di luar AppShell. Halaman-halaman ini tidak mewarisi GlobalHeader maupun BottomNavigation dari AppShell.

```text
StandalonePages
├── Notification
├── Cart
├── LiveChat
├── ProductDetailPage
├── CheckoutPage
├── OrderSuccessPage
├── OrdersPage
└── OrderDetailPage
```

### 3. Navigation Rules

- GlobalHeader merupakan bagian tetap dari AppShell.
- MainContent menangani halaman Home, Products, dan Profile.
- BottomNavigation menyediakan navigasi ke Home, Products, dan LiveChat.
- Tombol Notification pada GlobalHeader membuka StandalonePage Notification.
- Tombol Cart pada GlobalHeader membuka StandalonePage Cart.
- Tombol Profile pada GlobalHeader membuka halaman Profile di MainContent.
- Tombol LiveChat pada BottomNavigation membuka StandalonePage LiveChat.
- Memilih produk dari Products membuka StandalonePage ProductDetailPage.
- ProductDetailPage dapat mengarahkan pengguna ke Cart.
- Cart menyediakan akses untuk melanjutkan ke StandalonePage CheckoutPage.
- CheckoutPage mengarahkan pengguna ke OrderSuccessPage setelah pesanan berhasil dibuat.
- OrdersPage menampilkan daftar pesanan pengguna.
- Memilih pesanan dari OrdersPage membuka StandalonePage OrderDetailPage.
- StandalonePages tidak menampilkan GlobalHeader atau BottomNavigation milik AppShell.
- Navigasi antarhalaman harus konsisten dan status navigasi aktif harus mencerminkan tujuan saat ini jika relevan.

### 4. Overlay

Overlay adalah sistem antarmuka yang ditampilkan di atas halaman aktif. Overlay dapat dipanggil dari AppShell maupun StandalonePages dan bukan merupakan halaman navigasi.

#### Overlay Structure

```text
Overlay
├── Modal
│   ├── QuickViewModal
│   └── ConfirmationModal
│
├── Drawer
│   ├── CartDrawer
│   └── FilterDrawer
│
├── BottomSheet
│   ├── SortBottomSheet
│   ├── FilterBottomSheet
│   ├── VariantBottomSheet
│   ├── QuantityBottomSheet
│   └── ShareBottomSheet
│
├── Dialog
│   ├── AlertDialog
│   └── ConfirmDialog
│
├── Popover
│
└── Toast
    ├── SuccessToast
    ├── ErrorToast
    └── InfoToast
```

#### Overlay Rules

- Overlay bukan halaman navigasi dan tidak menggantikan struktur halaman aktif.
- Overlay dapat dipanggil dari AppShell maupun StandalonePages.
- Setiap overlay harus memiliki mekanisme untuk membuka dan menutup.
- Modal digunakan untuk menampilkan konten atau interaksi terpusat.
- Drawer digunakan untuk menampilkan panel dari sisi layar.
- Dialog digunakan untuk menyampaikan informasi atau meminta konfirmasi tindakan.
- Popover digunakan untuk menampilkan informasi atau menu kecil yang kontekstual.
- Toast digunakan untuk menyampaikan notifikasi sementara.
- Overlay yang aktif harus tampil di atas konten halaman dan mengatur interaksi dengan backdrop secara tepat.

#### BottomSheet Rules

- BottomSheet merupakan komponen tersendiri di dalam Overlay, bukan turunan Modal atau Drawer.
- BottomSheet dirancang mobile-first dan menggunakan lebar layar yang tersedia.
- BottomSheet mendukung tinggi dinamis sesuai kebutuhan konten.
- BottomSheet menampilkan drag handle.
- BottomSheet mendukung gesture swipe down untuk menutup.
- BottomSheet mendukung backdrop.
- Konten panjang menggunakan area scroll internal.
- Ketika BottomSheet aktif, interaksi dengan halaman di belakangnya harus dicegah.
