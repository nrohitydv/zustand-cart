import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createUserSlice, UserSlice } from "./user-slice";
import { CartSlice, createCartSlice } from "./cart-slice";

export type Store = UserSlice & CartSlice;

export const useStore = create<Store>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createUserSlice(...a),
          ...createCartSlice(...a),
        }))
      ),
      { name: "local-storage" }
    )
  )
);
