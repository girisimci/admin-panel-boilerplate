import { configureStore } from "@reduxjs/toolkit";
import { userService } from "./services/users-service";
import { blogService } from "./services/blog-service";
import { categoryService } from "./services/category-service";

export const store = configureStore({
  reducer: {
    [userService.reducerPath]: userService.reducer,
    [blogService.reducerPath]: blogService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userService.middleware,
      blogService.middleware,
      categoryService.middleware
    ),
});

export default store;
