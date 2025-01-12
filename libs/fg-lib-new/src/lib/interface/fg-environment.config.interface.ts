import { FgEnvironmentRequestConfigInterface } from './fg-environment-request.config.interface';
import { FgDevelopmentConfigInterface } from './fg-environment-development.config.interface';
import { FgEnvironmentI18nConfigInterface } from './fg-environment-i18n.config.interface';
import { FgEnvironmentNgxLoggerConfigInterface } from './fg-environment-ngx-logger.config.interface';
import { FgEnvironmentStorageConfigInterface } from './fg-environment-storage.interface';
import { FgEnvironmentServiceWorkerConfigInterface } from './fg-environment-serviceworker.interface';

export interface FgEnvironmentConfigInterface<T> {
  version?: string;
  production: boolean;
  serviceWorker?: FgEnvironmentServiceWorkerConfigInterface;
  request: FgEnvironmentRequestConfigInterface;
  logger: FgEnvironmentNgxLoggerConfigInterface;
  i18n: FgEnvironmentI18nConfigInterface;
  development?: FgDevelopmentConfigInterface;
  storage: FgEnvironmentStorageConfigInterface;
  test?: boolean;
  app?: T;
}
