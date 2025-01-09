import { createSpyFromClass } from 'jest-auto-spies';
import { FgNavigateBackService } from '../fg-navigate-back/fg-navigate-back.service';

/** FgNavigateBackServiceMock - Turn FgNavigateBackService into a mock version by wrapping it into jasmine-spies */
export const FgNavigateBackServiceMock = createSpyFromClass(FgNavigateBackService);
