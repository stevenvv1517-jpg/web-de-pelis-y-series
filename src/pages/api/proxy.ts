import type { APIRoute } from 'astro';

export const prerender = false;

const AD_BLOCK_CSS = `
<style id="adblock-css">
  #vast-preroll-overlay,
  #click-shield,
  #ad-label, #ad-counter,
  .preroll-overlay, .ad-overlay,
  .video-ad, .preroll, .midroll,
  [class*="ad-"], [id*="ad-"],
  [class*="pop"], [id*="pop"],
  [class*="banner"], [id*="banner"],
  [class*="interstitial"], [id*="interstitial"],
  .overlay-ad, .modal-ad, .floating-ad
  { display: none !important; pointer-events: none !important; }
  body { overflow: auto !important; }
  html { overflow: auto !important; }
</style>`;

const AD_BLOCK_SCRIPT = `
<script id="adblock-injected">
// Block popunders and redirects
window.open = function() { return null; };

// Disable VAST preroll engine
Object.defineProperty(window, '_vastStartPreroll', { get: () => null, set: () => {} });

// Override PREROLL_CONFIG if it exists
if (typeof PREROLL_CONFIG !== 'undefined') {
  PREROLL_CONFIG.vastTags = [];
  PREROLL_CONFIG.skipAfter = 0;
  PREROLL_CONFIG.autoAdvance = false;
}

// Intercept launch() to skip preroll
const _origLaunch = window.launch;
window.launch = function() {
  if (typeof _showPlayerAfterAd === 'function') {
    _showPlayerAfterAd();
  } else if (_origLaunch) {
    _origLaunch();
  }
};
</script>`;

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get('id');
  if (!id || !/^\d+$/.test(id)) {
    return new Response('Invalid id parameter', { status: 400 });
  }

  const targetUrl = `https://unlimplay.com/play/embed/movie/${id}`;

  try {
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-MX,es;q=0.9,en;q=0.8',
        'Referer': 'https://unlimplay.com/',
      },
    });

    if (!res.ok) {
      return new Response(`Upstream error: ${res.status}`, { status: 502 });
    }

    let html = await res.text();

    // 1) Empty VAST preroll tags
    html = html.replace(
      /const PREROLL_CONFIG\s*=\s*\{[\s\S]*?\};/,
      `const PREROLL_CONFIG = { vastTags: [], skipAfter: 0, muteOnStart: false, corsProxy: "", autoAdvance: false };`
    );

    // 2) Disable _vastStartPreroll initialization
    html = html.replace(
      /_vastStartPreroll\s*=\s*function/g,
      `_vastStartPreroll = null; /* disabled */ /*`
    );
    html = html.replace(
      /function initPrerollEngine\(\)\s*\{/g,
      `function initPrerollEngine() { return; /* disabled */`
    );

    // 3) Remove ad-related scripts
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, (match) => {
      const lower = match.toLowerCase();
      if (
        lower.includes('popunder') ||
        lower.includes('adfly') ||
        lower.includes('monetag') ||
        lower.includes('propeller') ||
        lower.includes('exoclick') ||
        lower.includes('juicyads') ||
        lower.includes('adsterra') ||
        lower.includes('doubleclick') ||
        lower.includes('googletag') ||
        lower.includes('adsbygoogle') ||
        lower.includes('adnxs') ||
        lower.includes('taboola') ||
        lower.includes('outbrain') ||
        lower.includes('revcontent') ||
        lower.includes('mgid') ||
        lower.includes('adcash') ||
        lower.includes('hilltopads') ||
        lower.includes('popcash') ||
        lower.includes('popads') ||
        lower.includes('document.createElement') && lower.includes('iframe') && lower.includes('ad')
      ) {
        return '<!-- ad script removed -->';
      }
      return match;
    });

    // 4) Remove ad overlay divs and iframes
    html = html.replace(/<div[^>]*(class|id)=["'][^"']*(popunder|interstitial|preroll-overlay|ad-overlay|floating-ad)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '<!-- removed -->');
    html = html.replace(/<iframe[^>]*(doubleclick|adnxs|advertising|adserver|ad\.php)[^>]*>[\s\S]*?<\/iframe>/gi, '<!-- removed -->');
    html = html.replace(/<ins[^>]*>[\s\S]*?<\/ins>/gi, '<!-- removed -->');

    // 5) Inject ad-block CSS in <head>
    html = html.replace(/<head([^>]*)>/i, `<head$1>${AD_BLOCK_CSS}`);

    // 6) Inject ad-block script at end of body (before closing </body>)
    html = html.replace(/<\/body>/i, `${AD_BLOCK_SCRIPT}</body>`);

    // 7) Fix relative URLs
    html = `<base href="https://unlimplay.com/">` + html;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': 'frame-ancestors *',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (err) {
    return new Response(`Proxy error: ${err}`, { status: 502 });
  }
};
