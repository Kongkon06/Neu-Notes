import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const folderSlice = createSlice({
  name: 'folderatom',
  initialState: {
    value: ["Daily Notes", "Projects", "Work", "Personal", "Archive"]
  },
  reducers: {
    addFolders: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    removeFolders: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(folder => folder !== action.payload);
    }
  }
});

// Export actions
export const { addFolders, removeFolders } = folderSlice.actions;
export default folderSlice.reducer;