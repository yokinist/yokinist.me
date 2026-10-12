import BLOG from "~/blog.config";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag("config", BLOG.gaMeasurementId, {
    page_path: url,
  });
};
