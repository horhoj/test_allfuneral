import * as selectors from './selectors';
import * as thunks from './thunks';
import { actions, reducer } from './slice';

export const appSlice = { actions, selectors, reducer, thunks };
