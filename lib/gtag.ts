import BLOG from '~/blog.config';
import { getIsClient } from './getIsClient';

export const GA_TRACKING_ID = BLOG.analytics.gaConfig.measurementId;
export const IS_PROD = BLOG.isProd;

const isClient = getIsClient();

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!IS_PROD || !isClient) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type GaEventProps = {
  action: string;
  category: string;
  label: string;
  value?: number | string;
};
export const event = ({ action, category, label, value }: GaEventProps) => {
  if (!IS_PROD || !isClient) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
