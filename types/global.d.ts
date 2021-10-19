import Gtag from 'gtag.js';

declare global {
  interface Window {
    gtag: Gtag.Gtag;
  }
}
