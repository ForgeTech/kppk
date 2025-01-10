import { createSpyFromClass } from 'jest-auto-spies';
import { FgBrowserGlobalService } from './fg-global-browser.service';

/** FgGlobalBrowserServiceMock - Turn FgBrowserGlobalService into a mock version by wrapping it into jasmine-spies */
export const FgGlobalBrowserServiceMock = createSpyFromClass(FgBrowserGlobalService);
