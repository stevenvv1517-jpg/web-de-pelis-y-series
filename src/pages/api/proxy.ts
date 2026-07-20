import type { APIRoute } from 'astro';

export const prerender = false;

const AD_BLOCK_CSS = `
<style id="adblock-css">
  [class*="ad-"], [class*="ad_"], [id*="ad-"], [id*="ad_"],
  [class*="pop"], [id*="pop"],
  [class*="banner"], [id*="banner"],
  [class*="interstitial"], [id*="interstitial"],
  [class*="overlay"], [id*="overlay"],
  [class*="modal"][style*="z-index"], [class*="popup"],
  [style*="z-index: 9999"], [style*="z-index:9999"],
  [style*="z-index: 99999"], [style*="z-index:99999"],
  [style*="position: fixed"][style*="z-index"],
  [style*="position:fixed"][style*="z-index"],
  .ads, .ad-container, .ad-wrapper, .ad-overlay,
  .popunder, .pop-under, .promo-overlay,
  .video-ad, .preroll, .midroll,
  [data-ad], [data-ads], [data-pop]
  { display: none !important; pointer-events: none !important; }

  body { overflow: auto !important; }
  html { overflow: auto !important; }
</style>`;

const AD_SCRIPT_PATTERNS = [
  'popunder', 'popunder.js', 'adfly', 'shorte.st', 'bc.vc',
  'clk.sh', 'sh.st', 'ouo.io', 'adshort', 'adf.ly',
  'monetag', 'propeller', 'exoclick', 'juicyads', 'adsterra',
  'doubleclick', 'googletag', 'adsbygoogle', 'adnxs',
  'taboola', 'outbrain', 'revcontent', 'mgid',
  'adcash', 'hilltopads', 'galaksion', 'popcash', 'popads',
  'crystalads', 'ad-maven', 'binaryoptions', 'adskeeper',
  'trafficjunky', 'advertising.com', 'serving-sys.com',
  'adform', 'criteo', 'taboola', 'taboola-loader',
  'clickunder', 'onclick', 'window.open',
  'document.createElement.*iframe', 'appendChild.*iframe',
  'innerHTML.*<iframe', 'document.write.*ad',
];

function isAdScript(content: string): boolean {
  const lower = content.toLowerCase();
  return AD_SCRIPT_PATTERNS.some(p => lower.includes(p));
}

function removeAds(html: string): string {
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, (match) => {
    if (isAdScript(match)) return '<!-- ad script removed -->';
    return match;
  });

  html = html.replace(/<div[^>]*(class|id)=["'][^"']*(popunder|interstitial|preroll|midroll|video-overlay-ad|modal-ad|banner-ad|floating-ad)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '<!-- ad div removed -->');

  html = html.replace(/<iframe[^>]*(doubleclick|adnxs|advertising|adserver|ad\.php|ad\.html)[^>]*>[\s\S]*?<\/iframe>/gi, '<!-- ad iframe removed -->');

  html = html.replace(/<ins[^>]*>[\s\S]*?<\/ins>/gi, '<!-- ad unit removed -->');

  html = html.replace(/<a[^>]*target=["']_blank["'][^>]*onclick[^>]*>[\s\S]*?<\/a>/gi, '<!-- ad link removed -->');

  return html;
}

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

    html = removeAds(html);

    html = html.replace(/<head([^>]*)>/i, `<head$1>${AD_BLOCK_CSS}`);

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
