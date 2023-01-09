import {configureStore} from "@reduxjs/toolkit"
import statReducer from "./slices/statSlice"
import searchReducer from "./slices/searchSlice"
import teamStatReducer from "./slices/teamSlice"

export default configureStore({
  reducer: {
    stats: statReducer,
    search: searchReducer,
    team: teamStatReducer,
  },
})
