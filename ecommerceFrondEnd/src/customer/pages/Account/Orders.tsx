import React, { useEffect } from "react";
import OrderItem from "./OrderItem";
import store, {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "../../../State/Store";
import { fetchUserOrderHistory } from "../../../State/customer/OrderSlice";

const Orders = () => {
  const jwtFromState = useAppSelector((state: RootState) => state.auth.jwt);
  const jwt = React.useMemo(
    () => jwtFromState || localStorage.getItem("jwt"),
    [jwtFromState],
  );
  const orderState = useAppSelector((state) => state.order);
  const { order } = useAppSelector((store) => store);

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Orders state:", orderState.orders);
    if (jwt) {
      dispatch(fetchUserOrderHistory(jwt));
    }
  }, [dispatch, jwt]);

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All Orders</h1>
        <p> from anytime</p>
      </div>

      <div className="space-y-2">
        {order.orders.map((order) =>
          order.orderItems.map((item) => (
            <OrderItem item={item} order={order} />
          )),
        )}
      </div>
    </div>
  );
};
export default Orders;
