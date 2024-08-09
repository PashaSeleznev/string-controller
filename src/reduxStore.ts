import { configureStore, ThunkDispatch, Action  } from "@reduxjs/toolkit";
import {rootReducer} from './reducers/rootReducer'

export const reduxStore = configureStore({
    reducer: rootReducer
  })

  export type RootStateType = ReturnType<typeof reduxStore.getState>;
  export type AppDispatch = ThunkDispatch<RootStateType, unknown, Action>