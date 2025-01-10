import { createSpyFromClass } from 'jest-auto-spies';
import { FgNodeGlobalService } from './fg-global-node.service';

/** FgNodeGlobalServiceMock - Turn FgNodeGlobalService into a mock version by wrapping it into jasmine-spies */
export const FgNodeGlobalServiceMock = createSpyFromClass(FgNodeGlobalService);
