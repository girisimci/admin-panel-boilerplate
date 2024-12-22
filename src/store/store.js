import { configureStore } from "@reduxjs/toolkit";
import { userService } from "./services/users-service";

export const store = configureStore({
  reducer: {
    [userService.reducerPath]: userService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userService.middleware),
});

export default store;
