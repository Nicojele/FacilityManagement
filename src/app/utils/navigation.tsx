'use server';

import logger from '@/lib/server-logger';
import { navigateToUrl } from '@5minds/processcube_app_sdk/server';

export async function navigateHome(): Promise<void> {
  const homeUrl = process.env.NEXT_PUBLIC_HOME_URL;

  logger.info({ url: homeUrl }, 'Navigate to Home');

  navigateToUrl(homeUrl);
}
