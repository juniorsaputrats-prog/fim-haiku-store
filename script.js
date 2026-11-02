/**
 * ========================================================
 * FIM HAIKU JASA SETUP SERVER: CLIENT SCRIPT
 * ========================================================
 */

// Official WhatsApp & Discord Community Links
const LINK_WHATSAPP = "https://api.whatsapp.com/send/?phone=6283119678265";
const LINK_WHATSAPP_NUMBER = "6283119678265";
const LINK_DISCORD = "https://discord.com/invite/J6r4JK2jRw";
const LINK_DISCORD_PLACEHOLDER = "https://discord.com/invite/J6r4JK2jRw";

// Service Detail Data
const SERVICES_DATA = {
  setup: {
    badge: "CORE SERVICE",
    title: "JASA SETUP SERVER MINECRAFT",
    priceRange: "Rp0 - Rp150.000",
    description: "Layanan menyeluruh untuk membangun server Minecraft dari awal atau mengoptimalkan server yang sudah ada. Tim FIM HAIKU akan mengonfigurasi engine server, optimasi memori & TPS, serta mengatur izin dan plugin penting.",
    features: [
      "Instalasi dan tuning server engine: Paper, Purpur, Spigot, atau Velocity/BungeeCord",
      "Optimasi Anti-Lag (tuning paper.yml, purpur.yml, spigot.yml) demi TPS stabil 20.0",
      "Setup sistem rank, permissions (LuckPerms), chat formatting & tab list",
      "Konfigurasi sistem ekonomi, essentials, claim wilayah, & anti-grief",
      "Integrasi crossplay Java & Bedrock Edition menggunakan GeyserMC & Floodgate",
      "Pengujian menyeluruh sebelum server diserahkan kepada klien"
    ],
    timeline: "Beberapa jam s/d 1 hari kerja (Tergantung paket & kompleksitas)",
    recommendedFor: "Survival SMP, RPG, Skyblock, Network Lobby, Private Server Komunitas"
  },
  promosi: {
    badge: "MARKETING & TRAFFIC",
    title: "JASA PROMOSI SERVER MINECRAFT",
    priceRange: "Rp20.000 - Rp40.000",
    description: "Tingkatkan popularitas dan jumlah pemain aktif di server Minecraft kamu. Kami membantu mempromosikan servermu ke komunitas pemain Minecraft aktif dengan copywriting menarik dan strategi broadcast tertarget.",
    features: [
      "Broadcast promosi ke puluhan jaringan komunitas Discord Minecraft aktif",
      "Publikasi postingan promosi di grup dan forum media sosial gamer Minecraft",
      "Penyusunan copywriting menarik: keunggulan server, IP, discord, dan teaser event",
      "Saran optimasi ranking server di direktori server list Minecraft Indonesia",
      "Fokus pada penambahan member Discord organik dan pemain baru"
    ],
    timeline: "1 - 2 hari kerja (Mulai jalan bertahap sesuai jadwal broadcast)",
    recommendedFor: "Server baru rilis (Grand Opening), Seasonal Reset, atau Turnamen Khusus"
  },
  plugin: {
    badge: "CUSTOM DEVELOPMENT",
    title: "JASA CUSTOM PLUGIN MINECRAFT",
    priceRange: "Rp0 - Rp250.000",
    description: "Buat fitur permainan unik yang belum pernah ada sebelumnya. Kami mengembangkan plugin Minecraft custom berbasis Java/Kotlin dengan kode bersih, hemat memori, dan bebas dari memory leak.",
    features: [
      "Pengembangan fitur custom (Mekanisme skill, Custom Economy, GUI Menu, Custom Item, Event khusus)",
      "Mendukung API Spigot, PaperMC, dan Purpur untuk berbagai versi Minecraft",
      "Penyimpanan data aman menggunakan file YAML, SQLite, atau remote MySQL",
      "Kode terstruktur, minim penggunaan CPU, dan diuji intensif",
      "File .jar siap pakai disertai dokumentasi command & permissions",
      "Garansi perbaikan bug secara gratis dan revisi penyesuaian fungsional"
    ],
    timeline: "1 - 3 hari kerja (Sesuai tingkat kerumitan logika fitur)",
    recommendedFor: "Server yang butuh diferensiasi fitur eksklusif agar tidak pasaran"
  }
};

// Current Order State
let currentOrderData = {
  buyerName: "",
  serverName: "",
  buyerDiscord: "",
  buyerWhatsapp: "",
  serviceType: "JASA SETUP SERVER",
  packageType: "Tanpa Paket / Custom",
  mcVersion: "1.21.x (Terbaru)",
  serverSoftware: "Paper",
  pluginCount: "1 - 5 Plugin (Sesuai Paket Hemat)",
  requestDescription: "",
  additionalNotes: "",
  customPluginName: "",
  customPluginVersion: "",
  customPluginFeatures: "",
  customPluginDetail: "",
  promoServerName: "",
  promoDiscordLink: "",
  promoServerIp: "",
  promoServerPort: "",
  promoServerDesc: "",
  calculatedPrice: "Rp15.000"
};

// Current Selected Service for Detail Modal
let currentDetailServiceKey = "setup";

// ================= INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupMobileDrawer();
  setupCatalogCategoryNav();
  setupFaqAccordion();
  setupScrollReveal();
  setupContactLinks();
  updatePriceCalculation();
  setCurrentYear();
});

// Update Year in Footer
function setCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ================= NAVBAR & SCROLL =================
function setupNavbar() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    // Sticky navbar effect
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // ScrollSpy active state
    let currentSectionId = "";
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });
}

// ================= CATALOG CATEGORY QUICK NAV =================
function setupCatalogCategoryNav() {
  const pills = document.querySelectorAll(".cat-pill");
  const categoryTargets = [
    document.getElementById("cat-donut"),
    document.getElementById("cat-economy"),
    document.getElementById("cat-lifesteal"),
    document.getElementById("cat-hardcore"),
    document.getElementById("cat-altar"),
    document.getElementById("paket"),
    document.getElementById("cat-plugin")
  ].filter(Boolean);

  if (!pills.length || !categoryTargets.length) return;

  pills.forEach(pill => {
    pill.addEventListener("click", e => {
      const targetId = pill.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 84;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: "smooth"
        });
        pills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
      }
    });
  });

  // Highlight pill while scrolling through categories
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 140;
    let currentCatId = "";

    categoryTargets.forEach(target => {
      const targetTop = target.offsetTop;
      const targetHeight = target.offsetHeight;
      if (scrollPos >= targetTop && scrollPos < targetTop + targetHeight + 30) {
        currentCatId = `#${target.getAttribute("id")}`;
      }
    });

    if (currentCatId) {
      pills.forEach(pill => {
        if (pill.getAttribute("href") === currentCatId) {
          pill.classList.add("active");
        } else {
          pill.classList.remove("active");
        }
      });
    }
  });
}

// ================= 4-VIEW TAB ARCHITECTURE & DOCK SWITCHING =================
let currentActiveView = "paket";

function switchMainTab(tabName, shouldScroll = true) {
  currentActiveView = tabName;

  const views = {
    paket: document.getElementById("view-paket"),
    setup: document.getElementById("view-setup"),
    promotion: document.getElementById("view-promotion"),
    kontak: document.getElementById("view-kontak")
  };

  const dockTabIds = {
    paket: "dockTabPaket",
    setup: "dockTabSetup",
    promotion: "dockTabPromo",
    kontak: "dockTabContact"
  };

  // 1. Switch active view display
  Object.keys(views).forEach(key => {
    const viewEl = views[key];
    if (viewEl) {
      if (key === tabName) {
        viewEl.classList.add("active");
        viewEl.style.display = "block";
      } else {
        viewEl.classList.remove("active");
        viewEl.style.display = "none";
      }
    }
  });

  // 2. Set the glowing purple active state on bottom dock tab
  const targetDockId = dockTabIds[tabName];
  Object.values(dockTabIds).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === targetDockId) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
  });

  // 3. Sync top desktop & mobile navbar active styles
  document.querySelectorAll(".nav-link, .mobile-link").forEach(link => {
    const text = (link.textContent || "").toLowerCase().trim();
    if (
      (tabName === "paket" && (text.includes("paket") || text.includes("beranda"))) ||
      (tabName === "setup" && text.includes("setup")) ||
      (tabName === "promotion" && text.includes("promo")) ||
      (tabName === "kontak" && text.includes("kontak"))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 4. Smooth scroll to top of page
  if (shouldScroll) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}

// Backward compatibility helper wrappers
function setActiveDockTab(activeTabId) {
  const map = {
    dockTabPaket: "paket",
    dockTabSetup: "setup",
    dockTabPromo: "promotion",
    dockTabContact: "kontak"
  };
  const tab = map[activeTabId] || "paket";
  switchMainTab(tab, false);
}

function switchCatalogSlide(slideName, shouldScroll = true) {
  switchMainTab(slideName === "setup" ? "setup" : "paket", shouldScroll);
}

function navigateToPromo() {
  switchMainTab("promotion", true);
}

function openContactSection() {
  switchMainTab("kontak", true);
}

// ================= AMBIENT MUSIC SYNTHESIZER =================
let audioCtx = null;
let musicInterval = null;
let isMusicPlaying = false;

function toggleAmbientMusic() {
  const discIcon = document.getElementById("musicDiscIcon");
  const playState = document.getElementById("musicPlayState");

  if (isMusicPlaying) {
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
    isMusicPlaying = false;
    if (discIcon) discIcon.classList.remove("playing");
    if (playState) playState.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    try {
      const AudioCtxConstructor = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioCtxConstructor();
      if (audioCtx.state === "suspended") audioCtx.resume();

      isMusicPlaying = true;
      if (discIcon) discIcon.classList.add("playing");
      if (playState) playState.innerHTML = '<i class="fa-solid fa-pause"></i>';

      // Ambient soothing chord progression (Cmaj7 - Am7 - Fmaj7 - G7)
      const chords = [
        [261.63, 329.63, 392.00, 493.88],
        [220.00, 261.63, 329.63, 392.00],
        [174.61, 220.00, 261.63, 329.63],
        [196.00, 246.94, 293.66, 392.00]
      ];
      let chordIndex = 0;

      function playChord(notes) {
        if (!isMusicPlaying || !audioCtx) return;
        const now = audioCtx.currentTime;
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          const filter = audioCtx.createBiquadFilter();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(800, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.04 / (idx + 1), now + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now);
          osc.stop(now + 4);
        });
      }

      playChord(chords[chordIndex]);
      musicInterval = setInterval(() => {
        chordIndex = (chordIndex + 1) % chords.length;
        playChord(chords[chordIndex]);
      }, 3500);

    } catch (e) {
      console.warn("Audio note:", e);
    }
  }
}

// ================= MOBILE DRAWER =================
function setupMobileDrawer() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!hamburgerBtn || !mobileDrawer) return;

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = mobileDrawer.classList.contains("open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });
}

function openMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  hamburgerBtn.classList.add("active");
  hamburgerBtn.setAttribute("aria-expanded", "true");
  mobileDrawer.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  hamburgerBtn.classList.remove("active");
  hamburgerBtn.setAttribute("aria-expanded", "false");
  mobileDrawer.classList.remove("open");
  document.body.style.overflow = "";
}

// ================= FAQ ACCORDION =================
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherBtn = otherItem.querySelector(".faq-question");
          const otherAns = otherItem.querySelector(".faq-answer");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove("active");
        questionBtn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// ================= SCROLL REVEAL =================
function setupScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach(el => observer.observe(el));
}

// ================= CONTACT LINK HANDLERS =================
function setupContactLinks() {
  // Links are fully configured and functional
}

// ================= MODAL PEMESANAN (ORDER MODAL) =================
function openOrderModal(initialData = {}) {
  const modal = document.getElementById("orderModal");
  if (!modal) return;

  goToStep(1);

  // Clear previous field errors
  setFieldError("buyerName", false);
  setFieldError("serverName", false);
  setFieldError("requestDescription", false);

  // Pre-fill if specified
  if (initialData.serviceType) {
    const serviceSelect = document.getElementById("serviceType");
    if (serviceSelect) {
      serviceSelect.value = initialData.serviceType;
    }
  }

  if (initialData.packageType) {
    const pkgSelect = document.getElementById("packageType");
    if (pkgSelect) {
      pkgSelect.value = initialData.packageType;
    }
  }

  if (initialData.serverName && document.getElementById("serverName")) {
    document.getElementById("serverName").value = initialData.serverName;
  }

  onServiceTypeChange();
  onPackageTypeChange();

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeOrderModal() {
  const modal = document.getElementById("orderModal");
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Close modal on click backdrop
window.addEventListener("click", (e) => {
  const orderModal = document.getElementById("orderModal");
  const detailModal = document.getElementById("detailModal");

  if (e.target === orderModal) closeOrderModal();
  if (e.target === detailModal) closeDetailModal();
});

// Close modal on ESC key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeOrderModal();
    closeDetailModal();
    closeMobileMenu();
  }
});

// Trigger order modal from catalog cards
function selectServiceOrder(serviceName) {
  openOrderModal({
    serviceType: serviceName,
    packageType: "Tanpa Paket / Custom"
  });
}

// Trigger order modal from package cards
function selectPackageOrder(packageName, priceValue) {
  let matchedService = "JASA SETUP SERVER";
  if (packageName.includes("Plugin") || packageName.includes("Shop Clone")) {
    matchedService = "JASA CUSTOM PLUGIN";
  } else if (packageName.includes("PROMOTION") || packageName.includes("PHOTO SLIDE") || packageName.includes("Promosi")) {
    matchedService = "JASA PROMOSI";
  }
  openOrderModal({
    serviceType: matchedService,
    packageType: packageName
  });
}

// ================= DYNAMIC FORM HANDLERS =================
function onServiceTypeChange() {
  const serviceVal = document.getElementById("serviceType").value;
  const dynamicPluginSection = document.getElementById("dynamicPluginSection");
  const dynamicPromoSection = document.getElementById("dynamicPromoSection");
  const serverNameGroup = document.getElementById("serverNameGroup");

  if (serverNameGroup) {
    if (serviceVal === "JASA SETUP SERVER") {
      serverNameGroup.style.display = "block";
    } else {
      serverNameGroup.style.display = "none";
      setFieldError("serverName", false);
    }
  }

  if (serviceVal === "JASA CUSTOM PLUGIN") {
    dynamicPluginSection.style.display = "block";
    dynamicPromoSection.style.display = "none";
  } else if (serviceVal === "JASA PROMOSI") {
    dynamicPluginSection.style.display = "none";
    dynamicPromoSection.style.display = "block";
  } else {
    dynamicPluginSection.style.display = "none";
    dynamicPromoSection.style.display = "none";
  }

  updatePriceCalculation();
}

function onPackageTypeChange() {
  const pkgVal = document.getElementById("packageType").value;
  const pluginCountSelect = document.getElementById("pluginCount");

  // Synchronize suggested plugin count if user picks a specific package
  if (pkgVal === "PAKET HEMAT") {
    if (pluginCountSelect) pluginCountSelect.value = "1 - 5 Plugin (Sesuai Paket Hemat)";
  } else if (pkgVal === "PAKET SIGMA") {
    if (pluginCountSelect) pluginCountSelect.value = "6 - 15 Plugin (Sesuai Paket Sigma)";
  }

  updatePriceCalculation();
}

const PACKAGE_PRICES = {
  "PAKET HEMAT": { price: "Rp15.000", label: "Paket Bundling: PAKET HEMAT", note: "Termasuk: Setup server, pasang max 5 plugin & konfigurasi dasar." },
  "PAKET SIGMA": { price: "Rp25.000", label: "Paket Bundling: PAKET SIGMA (BEST SELLER)", note: "Termasuk: Setup server, pasang max 15 plugin & promosi server." },
  "Custom Server Setup": { price: "Rp5.000 - Rp800.000", label: "Custom Setup Sesuai Request", note: "Harga disesuaikan dengan tingkat kerumitan dan fitur yang diinginkan." },
  "Donut SMP Basic": { price: "Rp55.000", label: "Donut SMP: Basic Clone", note: "Termasuk: Scoreboard default, Team, TPA, Crate, Player Shops & World Protection." },
  "Donut SMP Complete Clone": { price: "Rp65.000", label: "Donut SMP: Complete Clone (BEST SELLER)", note: "Termasuk: Full custom TAB & scoreboard, Tiered Crates, Anti-Cheat, Top Stats Hologram." },
  "SMP Economy Basic": { price: "Rp30.000", label: "SMP Economy: Basic Setup", note: "Termasuk: Plugin economy dasar, /pay, /bal, /ah, shop GUI, rank 1-4 & voice chat support." },
  "SMP Economy Complete": { price: "Rp40.000", label: "SMP Economy: Complete Setup (POPULER)", note: "Termasuk: Advanced economy, trade GUI, daily rewards, rank 1-8, top money leaderboard." },
  "SMP Economy Complete++": { price: "Rp47.000", label: "SMP Economy: Complete++ Pro", note: "Termasuk: Advanced shop GUI, anti-dupe security, custom balancing, playtime reward." },
  "LifeSteal Basic": { price: "Rp20.000", label: "LifeSteal SMP: Basic Setup", note: "Termasuk: Plugin LifeSteal lengkap, heart steal on kill, revive recipe, TPA & RTP." },
  "LifeSteal++": { price: "Rp33.000", label: "LifeSteal SMP: LifeSteal++ (BEST SELLER)", note: "Termasuk: Advanced heart system, daily upgrades, custom TAB, top kills hologram." },
  "HC Basic Setup": { price: "Rp18.000", label: "Hardcore SMP: Basic Setup", note: "Termasuk: Spectator on death / ban on death, death counter, basic rank & permissions." },
  "HC Complete": { price: "Rp25.000", label: "Hardcore SMP: Complete Setup", note: "Termasuk: Custom TAB & scoreboard, rank 1-6, death tracking, server optimization." },
  "HC Complete++": { price: "Rp35.000", label: "Hardcore SMP: Complete++ Pro", note: "Termasuk: Dedicated lobby, top kill hologram, anti-cheat & security optimization." },
  "Altar SMP S1": { price: "Rp80.000", label: "Altar SMP: Season 1 Setup", note: "Termasuk: Legendary weapon system, custom weapon abilities, resource pack setup." },
  "Altar SMP S2": { price: "Rp120.000", label: "Altar SMP: Season 2 (LEGENDARY)", note: "Termasuk: Senjata legendaris lengkap, skill v2, custom sound/texture, hit & death leaderboard." },
  "Donut Shop Clone V1": { price: "Rp26.000", label: "Plugin: Donut Shop Clone V1", note: "Termasuk: Shop GUI Donut SMP, kategori item lengkap, Vault support." },
  "Donut Shop Clone V2": { price: "Rp35.000", label: "Plugin: Donut Shop Clone V2 (NEW)", note: "Termasuk: Shop GUI v2, kargo item, multi-currency & Shards integration." },
  "Ultimate Donut SMP Plugin": { price: "Rp45.000", label: "Plugin: Ultimate Donut SMP", note: "Termasuk: Bundle 40+ item kustom, mechanics, economy, bounty & crate reward." },
  "Plugin Anti Bot": { price: "Rp17.000", label: "Plugin: Anti Bot Protection", note: "Termasuk: Proteksi spam bot, verifikasi otomatis, whitelist/blacklist pintar." },
  "Setup Donut SMP": { price: "Rp145.000", label: "Donut SMP: Complete Core Setup", note: "Termasuk: 450+ fitur, Shards economy, skills, spawners, AH & bounty." },
  "Setup Laper Hardcore": { price: "Rp190.000", label: "Setup Laper Hardcore Full", note: "Termasuk: Animasi kematian, difficulty system, spectator/ban, anti-exploit & DDoS protection." },
  "BASIC PROMOTION TIKTOK": { price: "Rp17.000", label: "Promosi Video: Basic TikTok", note: "Termasuk: Video promosi vertikal 15-30s, gameplay cinematic, sound trending TikTok, revisi 1x." },
  "HD++ PROMOTION TIKTOK": { price: "Rp25.000", label: "Promosi Video: HD++ TikTok (BEST VALUE)", note: "Termasuk: Full HD 1080p 60fps, shader cinematic, text callout, optimasi FYP, revisi 2x." },
  "ADVANCED PROMOTION TIKTOK": { price: "Rp35.000", label: "Promosi Video: Advanced Cinematic Trailer", note: "Termasuk: Trailer sinematik 30-60s, custom sound design, render master tanpa watermark, revisi bebas." },
  "PROMOSI PHOTO SLIDE PAKET 1": { price: "Rp2.000", label: "Photo Slide: Paket 1 (1 Slide)", note: "Termasuk: 1 slide visual grafis tajam format PNG siap upload." },
  "PROMOSI PHOTO SLIDE PAKET 2": { price: "Rp5.000", label: "Photo Slide: Paket 2 (3 Slide Carousel)", note: "Termasuk: 3 slide carousel bertema info server, IP & fitur unggulan, format IG/TikTok." },
  "PROMOSI PHOTO SLIDE PAKET 3": { price: "Rp9.000", label: "Photo Slide: Paket 3 (5-7 Slide Full Carousel)", note: "Termasuk: 5-7 slide carousel lengkap, storytelling visual, copywriting caption siap posting." }
};

// Calculate price dynamically
function updatePriceCalculation() {
  const serviceVal = document.getElementById("serviceType") ? document.getElementById("serviceType").value : "JASA SETUP SERVER";
  const pkgVal = document.getElementById("packageType") ? document.getElementById("packageType").value : "Tanpa Paket / Custom";

  const calcItemLabel = document.getElementById("calcItemLabel");
  const calcItemPrice = document.getElementById("calcItemPrice");
  const calcTotalDisplay = document.getElementById("calcTotalDisplay");
  const calcNote = document.getElementById("calcNote");

  let calculatedPriceStr = "Rp15.000";
  let itemLabelStr = "";
  let itemPriceStr = "";
  let noteStr = "";

  if (PACKAGE_PRICES[pkgVal]) {
    const pkg = PACKAGE_PRICES[pkgVal];
    calculatedPriceStr = pkg.price;
    itemLabelStr = pkg.label;
    itemPriceStr = pkg.price;
    noteStr = pkg.note;
  } else {
    // Tanpa Paket / Custom
    if (serviceVal === "JASA SETUP SERVER") {
      calculatedPriceStr = "Rp0 - Rp150.000";
      itemLabelStr = "Layanan: Jasa Setup Server (Custom)";
      itemPriceStr = "Rp0 - Rp150.000";
      noteStr = "Biaya disesuaikan dengan skala kerumitan konfigurasi servermu.";
    } else if (serviceVal === "JASA PROMOSI") {
      calculatedPriceStr = "Rp20.000 - Rp40.000";
      itemLabelStr = "Layanan: Jasa Promosi Server";
      itemPriceStr = "Rp20.000 - Rp40.000";
      noteStr = "Tergantung jangkauan penyiaran dan durasi broadcast yang kamu pilih.";
    } else if (serviceVal === "JASA CUSTOM PLUGIN") {
      calculatedPriceStr = "Rp0 - Rp250.000";
      itemLabelStr = "Layanan: Jasa Custom Plugin";
      itemPriceStr = "Rp0 - Rp250.000";
      noteStr = "Estimasi biaya final dikonfirmasi setelah analisis rancangan fitur plugin.";
    }
  }

  if (calcItemLabel) calcItemLabel.textContent = itemLabelStr;
  if (calcItemPrice) calcItemPrice.textContent = itemPriceStr;
  if (calcTotalDisplay) calcTotalDisplay.textContent = calculatedPriceStr;
  if (calcNote) calcNote.textContent = noteStr;

  currentOrderData.calculatedPrice = calculatedPriceStr;
}

// ================= MULTI-STEP NAVIGATION & VALIDATION =================
function goToStep(stepNum) {
  const step1View = document.getElementById("step1View");
  const step2View = document.getElementById("step2View");
  const stepNode1 = document.getElementById("stepNode1");
  const stepNode2 = document.getElementById("stepNode2");
  const stepConnector = document.getElementById("stepConnector");
  const modalTitle = document.getElementById("orderModalTitle");
  const stepNumEl = document.getElementById("currentStepNumber");

  if (stepNumEl) {
    stepNumEl.textContent = stepNum.toString();
  }

  if (stepNum === 1) {
    if (step1View) step1View.style.display = "block";
    if (step2View) step2View.style.display = "none";
    if (stepNode1) stepNode1.classList.add("active");
    if (stepNode2) stepNode2.classList.remove("active");
    if (stepConnector) stepConnector.classList.remove("completed");
    if (modalTitle) modalTitle.textContent = "Formulir Pemesanan Layanan FIM HAIKU";
  } else if (stepNum === 2) {
    if (step1View) step1View.style.display = "none";
    if (step2View) step2View.style.display = "block";
    if (stepNode1) stepNode1.classList.add("active");
    if (stepNode2) stepNode2.classList.add("active");
    if (stepConnector) stepConnector.classList.add("completed");
    if (modalTitle) modalTitle.textContent = "Verifikasi & Rincian Pesanan";
  }
}

function handleProceedConfirmation(event) {
  event.preventDefault();

  // Validate Required Fields
  const serviceType = document.getElementById("serviceType").value;
  const buyerName = document.getElementById("buyerName") ? document.getElementById("buyerName").value.trim() : "";
  const serverName = document.getElementById("serverName") ? document.getElementById("serverName").value.trim() : "";
  const requestDescription = document.getElementById("requestDescription") ? document.getElementById("requestDescription").value.trim() : "";

  let hasError = false;

  // Validate Name
  if (!buyerName) {
    setFieldError("buyerName", true);
    hasError = true;
  } else {
    setFieldError("buyerName", false);
  }

  // Validate Server Name for Jasa Setup Server
  if (serviceType === "JASA SETUP SERVER" && !serverName) {
    setFieldError("serverName", true);
    hasError = true;
  } else {
    setFieldError("serverName", false);
  }

  // Validate Description
  if (!requestDescription) {
    setFieldError("requestDescription", true);
    hasError = true;
  } else {
    setFieldError("requestDescription", false);
  }

  if (hasError) {
    showToast("Mohon lengkapi seluruh kolom wajib yang bertanda (*)", "error");
    return;
  }

  // Store collected data
  currentOrderData.buyerName = buyerName;
  currentOrderData.serverName = serverName;
  currentOrderData.serviceType = serviceType;
  currentOrderData.packageType = document.getElementById("packageType").value;
  currentOrderData.mcVersion = document.getElementById("mcVersion").value;
  currentOrderData.serverSoftware = document.getElementById("serverSoftware").value;
  currentOrderData.pluginCount = document.getElementById("pluginCount").value;
  currentOrderData.requestDescription = requestDescription;
  currentOrderData.additionalNotes = document.getElementById("additionalNotes") ? document.getElementById("additionalNotes").value.trim() : "";

  // Store dynamic fields if applicable
  if (currentOrderData.serviceType === "JASA CUSTOM PLUGIN") {
    currentOrderData.customPluginName = document.getElementById("customPluginName").value.trim();
    currentOrderData.customPluginVersion = document.getElementById("customPluginVersion").value.trim();
    currentOrderData.customPluginFeatures = document.getElementById("customPluginFeatures").value.trim();
    currentOrderData.customPluginDetail = document.getElementById("customPluginDetail").value.trim();
  }

  if (currentOrderData.serviceType === "JASA PROMOSI") {
    currentOrderData.promoServerName = document.getElementById("promoServerName").value.trim();
    currentOrderData.promoDiscordLink = document.getElementById("promoDiscordLink").value.trim();
    currentOrderData.promoServerIp = document.getElementById("promoServerIp").value.trim();
    currentOrderData.promoServerPort = document.getElementById("promoServerPort").value.trim();
    currentOrderData.promoServerDesc = document.getElementById("promoServerDesc").value.trim();
  }

  // Populate Step 2 Confirmation Views
  populateConfirmationSummary();

  // Go to step 2
  goToStep(2);
}

function setFieldError(fieldId, isError) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  const group = field.closest(".form-group-item") || field.closest(".form-field-group") || field.closest(".form-group");
  if (group) {
    if (isError) {
      group.classList.add("has-error");
    } else {
      group.classList.remove("has-error");
    }
  }
}

// Populate Confirmation Summary Screen
function populateConfirmationSummary() {
  if (document.getElementById("sumBuyerName")) {
    document.getElementById("sumBuyerName").textContent = currentOrderData.buyerName;
  }
  document.getElementById("sumServiceType").textContent = currentOrderData.serviceType;
  document.getElementById("sumPackageType").textContent = currentOrderData.packageType;

  // Server Name Row in Summary
  const sumServerNameRow = document.getElementById("sumServerNameRow");
  if (sumServerNameRow) {
    if (currentOrderData.serviceType === "JASA SETUP SERVER" || currentOrderData.serverName) {
      sumServerNameRow.style.display = "flex";
      document.getElementById("sumServerName").textContent = currentOrderData.serverName || "-";
    } else {
      sumServerNameRow.style.display = "none";
    }
  }

  document.getElementById("sumMcVersion").textContent = currentOrderData.mcVersion;
  document.getElementById("sumServerSoftware").textContent = currentOrderData.serverSoftware;
  document.getElementById("sumPluginCount").textContent = currentOrderData.pluginCount;
  document.getElementById("sumRequestDesc").textContent = currentOrderData.requestDescription;
  document.getElementById("sumTotalPrice").textContent = currentOrderData.calculatedPrice;

  // Notes
  const sumNotesWrap = document.getElementById("sumNotesWrap");
  if (currentOrderData.additionalNotes) {
    sumNotesWrap.style.display = "block";
    document.getElementById("sumAdditionalNotes").textContent = currentOrderData.additionalNotes;
  } else {
    sumNotesWrap.style.display = "none";
  }

  // Extra section for Plugin / Promo
  const sumExtraSection = document.getElementById("sumExtraSection");
  const sumExtraTitle = document.getElementById("sumExtraTitle");
  const sumExtraContent = document.getElementById("sumExtraContent");

  if (currentOrderData.serviceType === "JASA CUSTOM PLUGIN") {
    sumExtraSection.style.display = "block";
    sumExtraTitle.innerHTML = '<i class="fa-solid fa-code"></i> Spesifikasi Custom Plugin';
    sumExtraContent.innerHTML = `
      <p><strong>Nama Plugin:</strong> ${currentOrderData.customPluginName || "-"}</p>
      <p><strong>Target Versi:</strong> ${currentOrderData.customPluginVersion || "-"}</p>
      <p><strong>Fitur Diinginkan:</strong> ${currentOrderData.customPluginFeatures || "-"}</p>
      <p><strong>Detail Plugin:</strong> ${currentOrderData.customPluginDetail || "-"}</p>
    `;
  } else if (currentOrderData.serviceType === "JASA PROMOSI") {
    sumExtraSection.style.display = "block";
    sumExtraTitle.innerHTML = '<i class="fa-solid fa-bullhorn"></i> Detail Server Promosi';
    sumExtraContent.innerHTML = `
      <p><strong>Nama Server:</strong> ${currentOrderData.promoServerName || "-"}</p>
      <p><strong>Link Discord:</strong> ${currentOrderData.promoDiscordLink || "-"}</p>
      <p><strong>IP & Port:</strong> ${currentOrderData.promoServerIp || "-"} : ${currentOrderData.promoServerPort || "-"}</p>
      <p><strong>Deskripsi Singkat:</strong> ${currentOrderData.promoServerDesc || "-"}</p>
    `;
  } else {
    sumExtraSection.style.display = "none";
  }
}

// Generate Text Format for WhatsApp / Discord
function generateOrderMessageText() {
  const iconUser = "\u{1F464}";
  const iconBox = "\u{1F4E6}";
  const iconGear = "\u2699\uFE0F";
  const iconSpeaker = "\u{1F4E2}";
  const iconNote = "\u{1F4DD}";
  const iconPin = "\u{1F4CC}";
  const iconMoney = "\u{1F4B0}";
  const bullet = "\u2022";

  let text = `*FORMULIR PEMESANAN: FIM HAIKU JASA SETUP SERVER*\n`;
  text += `--------------------------------------------------\n`;
  text += `${iconUser} *Nama Pembeli:* ${currentOrderData.buyerName}\n\n`;

  text += `${iconBox} *LAYANAN & PAKET*\n`;
  text += `${bullet} Jenis Jasa: ${currentOrderData.serviceType}\n`;
  text += `${bullet} Paket Dipilih: ${currentOrderData.packageType}\n`;
  if (currentOrderData.serverName) {
    text += `${bullet} Nama Server: ${currentOrderData.serverName}\n`;
  }
  text += `${bullet} Versi Minecraft: ${currentOrderData.mcVersion}\n`;
  text += `${bullet} Jenis Server: ${currentOrderData.serverSoftware}\n`;
  text += `${bullet} Jumlah Plugin: ${currentOrderData.pluginCount}\n\n`;

  if (currentOrderData.serviceType === "JASA CUSTOM PLUGIN") {
    text += `${iconGear} *DETAIL CUSTOM PLUGIN*\n`;
    text += `${bullet} Nama Plugin: ${currentOrderData.customPluginName || "-"}\n`;
    text += `${bullet} Versi MC Plugin: ${currentOrderData.customPluginVersion || "-"}\n`;
    text += `${bullet} Fitur: ${currentOrderData.customPluginFeatures || "-"}\n`;
    text += `${bullet} Detail: ${currentOrderData.customPluginDetail || "-"}\n\n`;
  }

  if (currentOrderData.serviceType === "JASA PROMOSI") {
    text += `${iconSpeaker} *DETAIL PROMOSI SERVER*\n`;
    text += `${bullet} Nama Server: ${currentOrderData.promoServerName || "-"}\n`;
    text += `${bullet} IP & Port: ${currentOrderData.promoServerIp || "-"} : ${currentOrderData.promoServerPort || "-"}\n`;
    text += `${bullet} Link Discord: ${currentOrderData.promoDiscordLink || "-"}\n`;
    text += `${bullet} Deskripsi: ${currentOrderData.promoServerDesc || "-"}\n\n`;
  }

  text += `${iconNote} *Deskripsi Permintaan:*\n${currentOrderData.requestDescription}\n\n`;

  if (currentOrderData.additionalNotes) {
    text += `${iconPin} *Catatan Tambahan:*\n${currentOrderData.additionalNotes}\n\n`;
  }

  text += `${iconMoney} *Total Estimasi Biaya:* ${currentOrderData.calculatedPrice}\n`;
  text += `--------------------------------------------------\n`;
  text += `_Pesanan dikirim melalui website resmi FIM HAIKU Jasa Setup Server._`;

  return text;
}

// Submit via WhatsApp
function submitOrderToWhatsApp() {
  const message = generateOrderMessageText();
  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://api.whatsapp.com/send/?phone=${LINK_WHATSAPP_NUMBER}&text=${encodedMsg}`;

  // Also copy to clipboard as seamless backup
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(message).catch(() => {});
  }

  window.open(waUrl, "_blank");
  showToast("Pesanan dibuka di WhatsApp Admin (083119678265) & disalin ke clipboard!", "success");
}

// Copy Format for Discord Ticket
function copyOrderForDiscordTicket() {
  const message = generateOrderMessageText();

  navigator.clipboard.writeText(message).then(() => {
    showToast("Format tiket pesanan berhasil disalin ke clipboard! Silakan paste di Discord FIM HAIKU.", "success");

    // Also trigger opening discord after short delay
    setTimeout(() => {
      window.open(LINK_DISCORD, "_blank");
    }, 1200);
  }).catch(() => {
    // Fallback if clipboard api fails
    const dummyArea = document.createElement("textarea");
    dummyArea.value = message;
    document.body.appendChild(dummyArea);
    dummyArea.select();
    document.execCommand("copy");
    document.body.removeChild(dummyArea);
    showToast("Format pesanan berhasil disalin ke clipboard!", "success");
  });
}

// ================= SERVICE DETAIL MODAL =================
function openDetailModal(serviceKey) {
  const data = SERVICES_DATA[serviceKey];
  if (!data) return;

  currentDetailServiceKey = serviceKey;

  const modal = document.getElementById("detailModal");
  const badgeEl = document.getElementById("detailModalBadge");
  const titleEl = document.getElementById("detailModalTitle");
  const bodyEl = document.getElementById("detailModalBody");

  badgeEl.textContent = data.badge;
  titleEl.textContent = data.title;

  let featuresHtml = data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join("");

  bodyEl.innerHTML = `
    <div class="card-price-tag mb-3">
      <span class="price-prefix">Kisaran Harga:</span>
      <span class="price-value">${data.priceRange}</span>
    </div>
    <p class="card-desc">${data.description}</p>
    
    <h5 class="form-section-title mt-4"><i class="fa-solid fa-list-check"></i> Yang Kamu Dapatkan:</h5>
    <ul class="detail-modal-list">
      ${featuresHtml}
    </ul>

    <div class="detail-meta-box">
      <div>
        <span class="summary-item label">Estimasi Pengerjaan:</span>
        <strong class="value text-accent">${data.timeline}</strong>
      </div>
      <div>
        <span class="summary-item label">Cocok Untuk:</span>
        <strong class="value">${data.recommendedFor}</strong>
      </div>
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function orderFromDetail() {
  closeDetailModal();

  let targetServiceName = "JASA SETUP SERVER";
  if (currentDetailServiceKey === "promosi") targetServiceName = "JASA PROMOSI";
  if (currentDetailServiceKey === "plugin") targetServiceName = "JASA CUSTOM PLUGIN";

  setTimeout(() => {
    openOrderModal({
      serviceType: targetServiceName,
      packageType: "Tanpa Paket / Custom"
    });
  }, 200);
}

// ================= TOAST NOTIFICATION SYSTEM =================
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconClass = type === "error" ? "fa-circle-xmark" : "fa-circle-check";
  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto remove after 3.8s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 400);
  }, 3800);
}

