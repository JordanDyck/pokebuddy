import {createSlice} from "@reduxjs/toolkit"

export const typesSlice = createSlice({
  name: "currentTypes",
  initialState: {
    type: undefined,
    attack: undefined,
    weakness: undefined,
    immunity: undefined,
  },
  reducers: {
    setTypes: (state, action) => {
      state.type = action.payload
    },
    setAttack: (state, action) => {
      state.attack = action.payload
    },
    setWeakness: (state, action) => {
      state.weakness = action.payload
    },
    setImmunity: (state, action) => {
      state.immunity = action.payload
    },
  },
})

export const {setTypes, setAttack, setWeakness, setImmunity} =
  typesSlice.actions

export default typesSlice.reducer
