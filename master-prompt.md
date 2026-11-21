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
└── LiveChat
```

### 3. Navigation Rules

- GlobalHeader merupakan bagian tetap dari AppShell.
- MainContent menangani halaman Home, Products, dan Profile.
- BottomNavigation menyediakan navigasi ke Home, Products, dan LiveChat.
- Tombol Notification pada GlobalHeader membuka StandalonePage Notification.
- Tombol Cart pada GlobalHeader membuka StandalonePage Cart.
- Tombol Profile pada GlobalHeader membuka halaman Profile di MainContent.
- Tombol LiveChat pada BottomNavigation membuka StandalonePage LiveChat.
- StandalonePages tidak menampilkan GlobalHeader atau BottomNavigation milik AppShell.
- Navigasi antarhalaman harus konsisten dan status navigasi aktif harus mencerminkan tujuan saat ini jika relevan.
