import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStore } from "../store/store";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ChangeQuantityButton from "./ui/ChangeQuantityButton";

const Cart = () => {
  const store = useStore();
  return (
    <Popover>
      <PopoverTrigger>
        <ShoppingCart />
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96">
        <div className="flex gap-2 text-lg items-center">
          <h1>Cart:</h1>
          <Button onClick={store.reset} variant={"destructive"}>
            <CircleX />
          </Button>
        </div>
        <div className="space-y-2">
          {store.products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-2">
                <CardTitle>{product.title}</CardTitle>
                <Button
                  onClick={() => store.removeProduct(product.id)}
                  variant={"destructive"}
                >
                  <Trash2 />
                </Button>
              </CardHeader>
              <CardContent>{product.price}</CardContent>
              <CardFooter>
                <ChangeQuantityButton productId={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <p>Total:{store.total}$</p>
        <p>Address:{store.address}</p>
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
