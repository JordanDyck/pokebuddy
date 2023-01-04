import {createSlice} from "@reduxjs/toolkit"

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: {
      value: 1,
      label: "bulbasaur #1",
    },
  },
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {setSearch} = searchSlice.actions

export default searchSlice.reducer
