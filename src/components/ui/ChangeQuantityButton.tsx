import { useStore } from "../../store/store";
import { Minus, Plus } from "lucide-react";
import { Button } from "./button";
import { useEffect } from "react";
interface Props {
  productId: string;
}
const ChangeQuantityButton = ({ productId }: Props) => {
  const store = useStore();
  const product = store.getProductById(productId);
  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        store.getTotal(
          products.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
      },
      {
        fireImmediately: true,
      }
    );
    return unSub;
  }, [store, store.getTotal]);
  return (
    <>
      {product && (
        <div className="flex space-x-2 items-center">
          <Button onClick={() => store.decQty(product.id)}>
            <Minus />
          </Button>
          <p>{product.qty}</p>
          <Button onClick={() => store.incQty(product.id)}>
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
};

export default ChangeQuantityButton;
