import {createSlice} from "@reduxjs/toolkit"

export const statSlice = createSlice({
  name: "stats",
  initialState: {
    value: undefined,
  },
  reducers: {
    setStat: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {setStat} = statSlice.actions

export default statSlice.reducer
