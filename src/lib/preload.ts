// Espera fontes, imagens críticas e vídeo do hero antes de esconder o loader.
// Sem APIs modernas obrigatórias — compatível com browsers antigos via plugin-legacy.

declare global {
  interface Window {
    __setLoaderProgress?: (v: number) => void;
    __hideAppLoader?: () => void;
    __markAppMounted?: () => void;
  }
}

const CRITICAL_IMAGES = [
  "/images/brand/loader-logo.png",
  "/images/brand/logo.png",
  "/images/brand/logo-footer.png",
  "/images/catalog/obra-04.jpg",
  "/images/catalog/obra-02.jpg",
];

const HERO_VIDEO = "/videos/hero-banner.mp4";
const MAX_WAIT_MS = 15000;

let appMounted = false;
let mountResolver: (() => void) | null = null;
const mountPromise = new Promise<void>((resolve) => {
  mountResolver = resolve;
});

function setProgress(v: number) {
  if (typeof window !== "undefined" && typeof window.__setLoaderProgress === "function") {
    window.__setLoaderProgress(v);
  }
}

function hideLoader() {
  if (typeof window !== "undefined" && typeof window.__hideAppLoader === "function") {
    window.__hideAppLoader();
  }
}

export function markAppMounted(): void {
  appMounted = true;
  if (mountResolver) {
    mountResolver();
    mountResolver = null;
  }
}

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      const done = () => resolve();
      img.onload = done;
      img.onerror = done;
      img.src = src;
      if (img.complete) done();
    } catch {
      resolve();
    }
  });
}

function loadFonts(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const doc = document as Document & { fonts?: { ready?: Promise<unknown> } };
      if (doc.fonts && doc.fonts.ready && typeof doc.fonts.ready.then === "function") {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          resolve();
        };
        doc.fonts.ready.then(finish, finish);
        window.setTimeout(finish, 5000);
      } else {
        resolve();
      }
    } catch {
      resolve();
    }
  });
}

function needsHeroVideo(): boolean {
  try {
    const path = window.location.pathname || "/";
    return path === "/" || path === "";
  } catch {
    return true;
  }
}

function loadHeroVideo(onProgress: (pct: number) => void): Promise<void> {
  return new Promise((resolve) => {
    try {
      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion || !needsHeroVideo()) {
        resolve();
        return;
      }

      const video = document.createElement("video");
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      const checkBuffer = () => {
        try {
          const duration = video.duration;
          if (!duration || !isFinite(duration) || duration <= 0) return;

          let bufferedEnd = 0;
          if (video.buffered && video.buffered.length > 0) {
            bufferedEnd = video.buffered.end(video.buffered.length - 1);
          }

          const pct = Math.min(100, Math.round((bufferedEnd / duration) * 100));
          onProgress(pct);

          // Considera pronto quando quase todo o vídeo está em buffer.
          if (bufferedEnd >= duration - 0.35 || video.readyState >= 4) {
            finish();
          }
        } catch {
          /* ignore */
        }
      };

      video.muted = true;
      video.preload = "auto";
      video.playsInline = true;
      video.addEventListener("progress", checkBuffer);
      video.addEventListener("canplaythrough", checkBuffer);
      video.addEventListener("loadeddata", checkBuffer);
      video.addEventListener("error", finish);
      video.src = HERO_VIDEO;

      try {
        video.load();
      } catch {
        finish();
      }

      window.setTimeout(finish, 12000);
    } catch {
      resolve();
    }
  });
}

function waitForMount(): Promise<void> {
  if (appMounted) return Promise.resolve();
  return mountPromise;
}

function waitForWindowLoad(): Promise<void> {
  return new Promise((resolve) => {
    try {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      const done = () => resolve();
      const onLoad = () => {
        window.removeEventListener("load", onLoad);
        done();
      };
      window.addEventListener("load", onLoad);
      window.setTimeout(done, 6000);
    } catch {
      resolve();
    }
  });
}

function allSettled(promises: Promise<void>[], onEach: () => void): Promise<void> {
  return new Promise((resolve) => {
    let remaining = promises.length;
    if (remaining === 0) {
      resolve();
      return;
    }
    const tick = () => {
      remaining -= 1;
      onEach();
      if (remaining === 0) resolve();
    };
    for (let i = 0; i < promises.length; i += 1) {
      promises[i].then(tick, tick);
    }
  });
}

export function preloadCriticalAssets(): void {
  if (typeof window === "undefined") return;

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    setProgress(100);
    window.setTimeout(hideLoader, 120);
  };

  const tasks: Promise<void>[] = [
    waitForMount(),
    waitForWindowLoad(),
    loadFonts(),
  ];

  for (let i = 0; i < CRITICAL_IMAGES.length; i += 1) {
    tasks.push(loadImage(CRITICAL_IMAGES[i]));
  }

  let videoWeight = 0;
  if (needsHeroVideo()) {
    videoWeight = 1;
    tasks.push(
      loadHeroVideo((pct) => {
        const base = 72;
        const span = 22;
        setProgress(base + Math.round((pct / 100) * span));
      }),
    );
  }

  const total = tasks.length;
  let completed = 0;
  const base = 18;
  const span = videoWeight ? 52 : 74;

  const onEach = () => {
    completed += 1;
    setProgress(base + Math.round((completed / total) * span));
  };

  allSettled(tasks, onEach).then(finish, finish);
  window.setTimeout(finish, MAX_WAIT_MS);
}

// Permite ao main marcar montagem via window (fallback se import falhar).
if (typeof window !== "undefined") {
  window.__markAppMounted = markAppMounted;
}
