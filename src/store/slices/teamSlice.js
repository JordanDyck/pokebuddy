import {createSlice} from "@reduxjs/toolkit"

export const teamStatSlice = createSlice({
  name: "teamStats",
  initialState: {
    value: localStorage.getItem("team")
      ? JSON.parse(localStorage.getItem("team"))
      : [],
  },
  reducers: {
    addTeamStat: (state, action) => {
      const updatedValue = [...state.value, action.payload]
      state.value = updatedValue
      localStorage.setItem("team", JSON.stringify(updatedValue))
    },
    removeTeamStat: (state, action) => {
      let stateCopy = [...state.value]
      const index = stateCopy
        .map((teamMember) => teamMember.id)
        .indexOf(action.payload)

      stateCopy.splice(index, 1)
      state.value = stateCopy
      localStorage.setItem("team", JSON.stringify(stateCopy))
    },
  },
})

export const {addTeamStat, removeTeamStat} = teamStatSlice.actions

export default teamStatSlice.reducer
