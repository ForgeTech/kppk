import { FgAuthService } from './fg-auth.service';
import { createSpyFromClass } from 'jasmine-auto-spies';

/** FgAuthServiceMock - Turn Service into a mock version by wrapping it into jasmine-spies */
export const FgAuthServiceMock = createSpyFromClass(FgAuthService);
