'use server';

import { navigateToUrl } from '@5minds/processcube_app_sdk/server';
import logger from '../../..//lib/server-logger';

export async function navigateHome(): Promise<void> {
  const homeUrl = process.env.NEXT_PUBLIC_HOME_URL;

  logger.info({ url: homeUrl }, 'Navigate to Home');

  navigateToUrl(homeUrl);
}
