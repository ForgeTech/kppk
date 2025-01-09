import { FgActiveViewService } from './fg-active-view.service';
import { createSpyFromClass } from 'jest-auto-spies';

/** FgActiveRouteServiceMock - Turn FgActiveRouteService into a mock version by wrapping it into jasmine-spies */
export const FgActiveRouteServiceMock = createSpyFromClass(FgActiveViewService);
