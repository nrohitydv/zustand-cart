import { StateCreator } from "zustand";

export interface Product {
  id: string;
  title: string;
  price: number;
}
type CartProduct = Product & { qty: number };
export type CartState = {
  products: CartProduct[];
  total: number;
};
interface CartAction {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  getTotal: (total: number) => void;
  reset: () => void;
}

export type CartSlice = CartAction & CartState;
const initialState: CartState = {
  products: [],
  total: 0,
};

export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,
  incQty: (productId) =>
    set((state) => {
      const foundProduct = state.products.find(
        (product) => product.id === productId
      );
      if (foundProduct) {
        foundProduct.qty++;
      }
    }),
  decQty: (productId) =>
    set((state) => {
      const foundIndex = state.products.findIndex(
        (product) => product.id === productId
      );
      if (foundIndex !== -1) {
        if (state.products[foundIndex].qty === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].qty--;
        }
      }
    }),
  addProduct: (product) =>
    set((state) => {
      state.products.push({ ...product, qty: 1 });
    }),
  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    }),
  getProductById: (productId) =>
    get().products.find((product) => product.id === productId),
  getTotal: (total) =>
    set((state) => {
      state.total = total;
    }),
  reset: () => set(initialState),
});
