import {createSlice} from "@reduxjs/toolkit"

export const teamStatSlice = createSlice({
  name: "teamStats",
  initialState: {
    value: [],
  },
  reducers: {
    addTeamStat: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    removeTeamStat: (state, action) => {
      // state.value =
    },
  },
})

export const {addTeamStat} = teamStatSlice.actions

export default teamStatSlice.reducer
