import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useStore } from "../store/store";
import { Popover } from "./ui/popover";
import { User } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect } from "react";

const UserPopOver = () => {
  const store = useStore();
  useEffect(() => {
    async function fetchData() {
      await store.fetchUser();
    }
    fetchData();
  }, [store, store.fetchUser]);
  return (
    <Popover>
      <PopoverTrigger>
        <User />
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96">
        <div className="flex space-x-2 items-center">
          <p className="text-sm">{store.fullname}</p>
          <p className="text-sm">{store.username}</p>
        </div>
        <label htmlFor="address">Your Address:</label>
        <Input
          id="address"
          onChange={(e) => store.setAddress(e.target.value)}
          value={store.address}
        />
      </PopoverContent>
    </Popover>
  );
};

export default UserPopOver;
