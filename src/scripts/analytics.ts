declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number>;

function track(name: string, params: EventParams = {}): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const tracked = target.closest<HTMLElement>('[data-track]');
  if (tracked?.dataset.track) {
    const params: EventParams = {};
    for (const [key, value] of Object.entries(tracked.dataset)) {
      if (key === 'track' || !value) continue;
      if (key.startsWith('track')) {
        const paramName = key.charAt(5).toLowerCase() + key.slice(6);
        params[paramName] = value;
      }
    }
    track(tracked.dataset.track, params);
    return;
  }

  const link = target.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const href = link.href;

  if (href.includes('facebook.com/events/')) {
    track('rsvp_click', { link_url: href });
  } else if (href.includes('facebook.com/groups/tcjetpilots')) {
    track('fb_group_click', { link_url: href });
  } else if (
    link.protocol.startsWith('http') &&
    link.hostname &&
    link.hostname !== window.location.hostname
  ) {
    track('outbound_click', { link_url: href, link_domain: link.hostname });
  }
});

document.querySelectorAll<HTMLElement>('section[id]').forEach((section) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        track('view_section', { section: section.id });
        observer.unobserve(section);
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(section);
});

const depthMarkers = [25, 50, 75, 100];
const firedDepths = new Set<number>();
function checkScrollDepth(): void {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return;
  const percent = Math.round((window.scrollY / docHeight) * 100);
  for (const marker of depthMarkers) {
    if (percent >= marker && !firedDepths.has(marker)) {
      firedDepths.add(marker);
      track('scroll_depth', { percent: marker });
    }
  }
}
window.addEventListener('scroll', checkScrollDepth, { passive: true });

document.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
  video.addEventListener(
    'play',
    () => {
      const src = video.querySelector('source')?.src ?? video.currentSrc;
      const filename = src.split('/').pop() ?? 'unknown';
      track('video_play', { video: filename });
    },
    { once: true }
  );
});

const mobileMenu = document.getElementById('mobile-menu');
document.getElementById('menu-toggle')?.addEventListener('click', () => {
  const wasHidden = mobileMenu?.classList.contains('hidden') ?? true;
  track('mobile_menu_toggle', { action: wasHidden ? 'open' : 'close' });
});

document.querySelectorAll<HTMLElement>('#gallery .gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    const alt = item.querySelector('img')?.alt ?? '';
    track('open_gallery_image', { image: alt });
  });
});

document.querySelectorAll<HTMLElement>('.merch-card').forEach((card) => {
  card.addEventListener('click', () => {
    const name = card.querySelector('.font-display.text-lg')?.textContent?.trim() ?? '';
    track('click_merch', { item_name: name });
  });
});

document
  .querySelectorAll<HTMLAnchorElement>('#main-nav a[href^="/#"], #main-nav a[href^="#"]')
  .forEach((link) => {
    link.addEventListener('click', () => {
      track('click_nav', { section: link.textContent?.trim() ?? '' });
    });
  });

export {};
