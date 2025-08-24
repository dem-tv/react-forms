import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormModel } from '../schema.ts';

type State = {
  list: (FormModel & {
    id: number;
  })[];
};

const initialState: State = {
  list: [],
};

export const dataListSlice = createSlice({
  name: 'dataList',
  initialState,
  selectors: {
    list: (state) => state.list,
  },
  reducers: {
    addData: (state, action: PayloadAction<FormModel>) => {
      const newItem = {
        ...action.payload,
        id: Date.now(),
      };

      state.list.push(newItem);
    },
  },
});
