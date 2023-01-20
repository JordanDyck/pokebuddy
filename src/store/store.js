import {configureStore} from "@reduxjs/toolkit"
import statReducer from "./slices/statSlice"
import searchReducer from "./slices/searchSlice"
import teamStatReducer from "./slices/teamSlice"
import typesReducer from "./slices/typesSlice"

export default configureStore({
  reducer: {
    stats: statReducer,
    search: searchReducer,
    team: teamStatReducer,
    currentTypes: typesReducer,
  },
})
