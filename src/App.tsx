import Cart from "./components/Cart";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import ChangeQuantityButton from "./components/ui/ChangeQuantityButton";
import UserPopOver from "./components/UserPopOver";
import { PRODUCTS_DATA } from "./lib/mockData";
import { useStore } from "./store/store";

const App = () => {
  const cartProducts = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addProduct);
  return (
    <main className="space-y-2 dark h-screen bg-background max-w-sm mx-auto mt-2">
      <div className="flex justify-between">
        <UserPopOver />
        <Cart />
      </div>
      <h1 className="text-2xl">Products:</h1>
      <ul className="space-y-2">
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent>{product.price}$</CardContent>
            <CardFooter>
              {cartProducts.find((item) => item.id === product.id) ? (
                <ChangeQuantityButton productId={product.id} />
              ) : (
                <Button variant={"default"} onClick={() => addToCart(product)}>
                  Add product
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </ul>
    </main>
  );
};

export default App;
