import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dataListSlice } from '../modules/DataList/datalist.slice.ts';

const rootReducer = combineReducers({
  [dataListSlice.reducerPath]: dataListSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
