import { create } from "zustand";
import { createRecipiesSlice, RecipiesSliceType } from "./recipieSlice";
import { createFavoritesSlice, FavoritesSliceType } from "./favoritesSlice";
import { devtools } from "zustand/middleware";
import { NotificationsSliceType,createNotificationSlice } from "./notificationSlice";

export const useAppStore = create<RecipiesSliceType & FavoritesSliceType & NotificationsSliceType>()(devtools((...a) => ({// ...a pasa todos los metodos set,get y api a la funcion slice
  ...createRecipiesSlice(...a),
  ...createFavoritesSlice(...a),
  ...createNotificationSlice(...a),
})))