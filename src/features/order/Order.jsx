// Test ID: IIDSAT
import UpdateOrderitem from "./updateOrderItem"
import { useLoaderData, useNavigation } from "react-router";
import { getOrder } from "../../services/apiRestaurant";
import { formatCurrency, formatDate } from "../../util/helpers";
import OrderItem from "./OrderItem"
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
function Order() {
  const orderItem = useLoaderData();
  const fetcher = useFetcher()

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle')
        fetcher.load('/menu');
    }, [fetcher])
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = orderItem;
  const deliveryIn = estimatedDelivery;
  return (
    <div className=" px-4 py-6  space-y-6">
      <div className=" flex gap-2 flex-wrap justify-between items-center ">
        <h2 className=" font-bold text-lg">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && <span className=" bg-red-500 text-red-50 px-3 py-2 rounded-full uppercase tracking-widest">Priority</span>}
          <span className="bg-lime-500 text-lime-50 px-3 py-2 rounded-full uppercase tracking-widest">{status} order</span>
        </div>
      </div>

      <div className=" flex gap-2 flex-wrap justify-between items-center bg-stone-300 px-4 py-3">
        <p className=" font-bold">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-stone-500 text-sm">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="divide-y divide-stone-200 border-b border-t border-stone-200">
        {cart.map(item => <OrderItem isLoadingIngredients={fetcher.state === 'loading'} ingredients={fetcher.data?.find(el => el.id === item.pizzaId).ingredients} item={item} />)}
      </ul>
      <div className="space-y-2 bg-stone-300 px-4 py-3">
        <p className="text-sm font-medium">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className=" font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrderitem />}
    </div>
  );
}

export async function loader(params) {
  const id = params.params.orderID;
  const orderItme = await getOrder(id);
  return orderItme;
}
export default Order;
