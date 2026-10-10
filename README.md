# ZenithAnime

<p align="center">
  <a href="README.md"><b>English</b></a> • <a href="README.ru.md"><b>Русский</b></a>
</p>

<p align="center">
  <b>Modern cross-platform anime media player engineered for seamless watching experience</b><br>
  <i>Android (Mobile / TV) • Desktop (Linux / Windows / macOS)</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20Desktop-3DDC84?style=flat-square&logo=android" alt="Platform" />
  <img src="https://img.shields.io/badge/Engine-100%25%20libmpv-darkblue?style=flat-square" alt="Engine" />
  <img src="https://img.shields.io/badge/UI-Compose%20Multiplatform%20%2B%20M3-blueviolet?style=flat-square" alt="UI" />
  <img src="https://img.shields.io/badge/Plugins-.zpk%20Runtime%20Ecosystem-informational?style=flat-square" alt="Plugins" />
</p>

> [!WARNING]
> This repository is dedicated to issue tracking, feature requests, roadmap discussions, and FAQ.

---

## ✨ Features & Roadmap

### 🎬 Media Engine & Player
- [x] **100% Hardware MPV Engine**: Direct video rendering powered by `libmpv` (Desktop) and `mpv-android` (Android)
- [x] **Real-Time GPU Super-Resolution Shaders**: ArtCNN (C4F32/C4F16), Anime4K (CNN/GAN), AMD FidelityFX CAS, RAVU Lite, KrigBilateral (4:2:0 $\to$ 4:4:4)
- [x] **Advanced Post-Processing**: Debanding (banding artifact removal), 3D CGI Anti-Aliasing, volume normalization
- [x] **Smart Timecode Skip**: Automatic opening and ending skipping (AniSkip & AnimeSkip integration)
- [x] **Stream Pre-Caching**: Intelligent next-episode background buffer pre-caching during playback
- [ ] **Motion Frame Interpolation (MEMC)**: High frame-rate playback (60 / 120 FPS) with scene-cut artifact dampening
- [ ] **Offline Video Pre-Upscaling**: Background AI super-resolution for cached/downloaded episodes (ArtCNN / Anime4K / Vulkan compute) ahead of time — high-fidelity playback with zero runtime CPU/GPU drain and battery conservation

---

### 🌐 Modular Provider Ecosystem (.zpk Plugins)
- [x] **Pure Decoupled Core**: Application internals operate strictly on neutral media references with zero hardcoded scraping logic
- [x] **Integrated Provider Store**: One-click installation, batch updates, and repository management
- [x] **Configurable Catalog**: Support for arbitrary metadata catalogs (Shikimori, YummyAnime, etc.) with single active choice
- [x] **Multi-Source Online Streaming**: Parallel voiceover and stream discovery (Kodik, HDRezka, Alloha, Collaps, VideoCDN)
- [x] **On-the-Fly Torrent Streaming**: Sequential piece download and instant playback via embedded `jlibtorrent` (Nyaa, RuTracker, RuTor)
- [x] **External Subtitles**: Subtitle provider integration (OpenSubtitles)
- [x] **Configurable Fallback Chains**: Drag-and-drop priority reordering for poster and timecode fallback chains
- [x] **Security & Sandboxing**: Ed25519 cryptographic package signing, TOFU trust verification, and Ktor host filter whitelisting

---

### 📥 Downloads & Offline Cache
- [x] **Background Download Manager**: Queued offline episode and video stream caching
- [x] **Torrent Session Persistence**: Fastresume piece map and torrent state restoration across application restarts
- [x] **Storage Management**: Granular memory, image, and metadata cache controls with per-anime/season cleanup
- [ ] **Offline Super-Resolution Export**: Automatic local saving of pre-rendered upscaled videos

---

### ☁️ Bookmarks, History & Cloud Sync
- [x] **Local Bookmarks & Watch History**: Fast local SQLDelight database with fine-grained per-episode progress tracking
- [x] **Bidirectional Cloud Sync**: Seamless synchronization via Google Drive's isolated `appDataFolder` (`zenith_backup.bundle.gz`)
- [x] **Smart Backup Import**: Interactive import wizard for third-party backups (Anixart, etc.) with step-by-step export guides and fuzzy title matching
- [x] **Tracker Synchronization**: External tracker watch status synchronization

---

### 🎨 Design & Platforms (UI & UX)
- [x] **Material 3 Expressive**: Motion spring physics and cinematic Haze 2.0 backdrop blur engine
- [x] **Dynamic Theming**: Content-derived palettes (`MaterialKolor`) and Android 12+ Monet wallpaper colors
- [x] **True Multiplatform**: Unified codebase across Android and Desktop (Linux, Windows, macOS)
- [x] **Desktop Power Controls**: Quick command palette (`Ctrl+K` / `Ctrl+P`), shortcuts cheatsheet (`Ctrl+/` / `F1`), and fullscreen toggle (`F11`)
- [x] **Clean Start Onboarding**: Setup wizard with zero bundled bloatware
- [ ] **Android TV & Leanback**: Dedicated D-Pad focus rings, Android TV Home recommendation channels, and TV-optimized player HUD
