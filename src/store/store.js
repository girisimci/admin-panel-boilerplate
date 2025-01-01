import { configureStore } from "@reduxjs/toolkit";
import { userService } from "./services/users-service";
import { blogService } from "./services/blog-service";

export const store = configureStore({
  reducer: {
    [userService.reducerPath]: userService.reducer,
    [blogService.reducerPath]: blogService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userService.middleware, blogService.middleware),
});

export default store;
