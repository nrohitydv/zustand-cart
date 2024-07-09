import { StateCreator } from "zustand";

interface UserState {
  username: string;
  fullname: string;
  address: string;
  age: number;
}
interface UserAction {
  setAddress: (address: string) => void;
  fetchUser: () => Promise<void>;
}
export type UserSlice = UserState & UserAction;
export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  username: "",
  fullname: "",
  address: "",
  age: 0,
  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),
  fetchUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    set({
      username: "johdoe123@gmail.com",
      fullname: "Joh Doe",
      age: 32,
    });
  },
});
