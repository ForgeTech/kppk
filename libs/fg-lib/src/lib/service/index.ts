// import { FgActiveRouteService } from './fg-active-route/fg-active-route.service';
// import { FgActiveViewService } from './fg-active-view/fg-active-view.service';
import { FgAppleIosService } from './fg-apple-ios/fg-apple-ios.service';

// import { FgAuthLocalService } from './fg-auth/fg-auth-local.service';
import { FgAuthOAuth2OIDCService } from './fg-auth/fg-auth-oauth2-oidc.service';
import { FgAuthService } from './fg-auth/fg-auth.service';
import { FgAuthEvent } from './fg-auth/fg-auth.event';
import {
  FgAuthChangePasswordInterface,
  FgAuthTokenInterface,
  FgAuthUserInterface,
  FG_AUTH_CREDENTIALS_STORAGE_KEY,
  FG_AUTH_TOKEN_STORAGE_KEY,
} from './fg-auth/fg-auth.abstract.service';

import { FgBadgingApiService } from './fg-badging-api/fg-badging-api.service';
import { FgBreakpointInterface } from './fg-breakpoint/fg-breakpoint.interface';
import { FgBreakpointService } from './fg-breakpoint/fg-breakpoint.service';
import { FgSWUpdateService } from './fg-sw-update/fg-sw-update.service';
// import { FgDataService } from './fg-data/fg-data.service';
// import { FgDataServiceInterface } from './fg-data/fg-data-service-interface';
import { FgDetectDeviceTypeUserAgentEvent } from './fg-detect-device-user-agent/fg-detect-device-user-agent.event';
import { FgDetectDeviceTypeUserAgentService } from './fg-detect-device-user-agent/fg-detect-device-user-agent.service';
import { FgDownloadService } from './fg-download/fg-download.service';
import { FgEventService } from './fg-event/fg-event.service';
// import { FgModernizrService } from './fg-modernizr/fg-modernizr.service';
import { FgNavigateBackService } from './fg-navigate-back/fg-navigate-back.service';
import { FgNavigationHistoryService } from './fg-navigation-history/fg-navigation-history.service';
import { FgPrefersColorSchemeService, PREFERED_COLOR_SCHEME } from './fg-prefers-color-scheme/fg-prefers-color-scheme.service';
import { FgPwaInstallService } from './fg-pwa-install/fg-pwa-install.service';
import { FgRendererService } from './fg-renderer/fg-renderer.service';
import {
  FgStorageLocalforageService,
  FG_LOCALFORAGE_STORAGE_MAP_KEY,
  FG_LOCALFORAGE_STORAGE_SERVICE_OPTIONS,
  FgStorageLocalforageServiceInstanceMapInterface,
  FgStorageLocalforageServiceStorageMapInterface,
} from './fg-storage/fg-storage-localforage.service';
import {
  FgStorageNgxCookieService,
  FG_NGXCOOKIE_STORAGE_SERVICE_OPTIONS,
  FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY,
  FgStorageNgxCookieServiceStorageMapInterface,
} from './fg-storage/fg-storage-ngx-cookie.service';
import { FgStorageService } from './fg-storage/fg-storage.service';
import { FgTimeStringService } from './fg-timestring/fg-timestring.service';
import { FgEnvironmentService } from './fg-environment/fg-environment.service';
// import { FgApplicationModelService } from './fg-application-model/fg-application-model.service';
// import { FgOrientationChangeService } from './fg-orientation-change/fg-orientation-change.service';
// import { FgImmutableService } from './fg-immutable/fg-immutable.service';
// import { FgAnimationFrameEvent } from './fg-animation-frame/fg-animation-frame.event';
// import { FgAnimationFrameService } from './fg-animation-frame/fg-animation-frame.service';
// import { FgIsOnlineService } from './fg-is-online/fg-is-online.service';
import { FgClipboardService } from './fg-clipboard-service/fg-clipboard-service.service';
import { FgCanUnloadService } from './fg-can-unload/fg-can-unload.service';

export {
  // FgAuthAuth0Service,
  // FgDataService,
  // FgDataServiceInterface,
  // FgOrientationChangeService,
  FG_AUTH_CREDENTIALS_STORAGE_KEY,
  FG_AUTH_TOKEN_STORAGE_KEY,
  FG_LOCALFORAGE_STORAGE_MAP_KEY,
  FG_LOCALFORAGE_STORAGE_SERVICE_OPTIONS,
  FG_NGXCOOKIE_STORAGE_SERVICE_OPTIONS,
  FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY,
  // FgActiveRouteService,
  // FgActiveViewService,
  // FgAnimationFrameEvent,
  // FgAnimationFrameService,
  FgAppleIosService,
  // FgApplicationModelService,
  FgAuthChangePasswordInterface,
  FgAuthEvent,
  // FgAuthLocalService,
  FgAuthOAuth2OIDCService,
  FgAuthService,
  FgAuthTokenInterface,
  FgAuthUserInterface,
  FgBadgingApiService,
  FgBreakpointInterface,
  FgBreakpointService,
  FgSWUpdateService,
  FgDetectDeviceTypeUserAgentEvent,
  FgDetectDeviceTypeUserAgentService,
  FgDownloadService,
  FgEnvironmentService,
  FgEventService,
  // FgImmutableService,
  // FgModernizrService,
  FgNavigateBackService,
  FgNavigationHistoryService,
  FgPrefersColorSchemeService,
  PREFERED_COLOR_SCHEME,
  FgPwaInstallService,
  FgRendererService,
  FgStorageLocalforageService,
  FgStorageLocalforageServiceInstanceMapInterface,
  FgStorageLocalforageServiceStorageMapInterface,
  FgStorageNgxCookieService,
  FgStorageNgxCookieServiceStorageMapInterface,
  FgStorageService,
  FgTimeStringService,
  // FgIsOnlineService,
  FgClipboardService,
  FgCanUnloadService,
};
