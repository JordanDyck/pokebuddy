import {configureStore} from "@reduxjs/toolkit"
import statReducer from "./slices/statSlice"
import searchReducer from "./slices/searchSlice"

export default configureStore({
  reducer: {
    stats: statReducer,
    search: searchReducer,
  },
})
