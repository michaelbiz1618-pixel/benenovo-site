(function() {
  var STORAGE_KEY = 'benenovo_cookie_consent';
  var GA_ID = 'G-8M27KBJVPF';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function loadGA() {
    if (document.querySelector('script[src*="googletagmanager"]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  var consent = localStorage.getItem(STORAGE_KEY);
  if (consent === 'accepted') {
    loadGA();
    return;
  }
  if (consent === 'essential') {
    return;
  }

  ready(function() {
    var banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.innerHTML = '<div style="position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#0A3A5A;border-top:3px solid #1F5C85;padding:16px 24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;font-family:Open Sans,sans-serif;font-size:13px;color:rgba(255,255,255,0.85);line-height:1.5;box-shadow:0 -4px 24px rgba(0,0,0,0.3)"><span style="max-width:520px">This site uses analytics cookies to understand content performance. No personal data is sold or shared.</span><span style="display:flex;gap:8px;flex-shrink:0"><button id="cookieAccept" style="background:#fff;color:#0A3A5A;border:none;padding:8px 18px;font-family:Open Sans,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;border-radius:2px;white-space:nowrap">Accept</button><button id="cookieDecline" style="background:transparent;color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.3);padding:8px 18px;font-family:Open Sans,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;cursor:pointer;border-radius:2px;white-space:nowrap">Essential Only</button></span></div>';
    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function() {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      banner.remove();
      loadGA();
    });

    document.getElementById('cookieDecline').addEventListener('click', function() {
      localStorage.setItem(STORAGE_KEY, 'essential');
      banner.remove();
    });
  });
})();
