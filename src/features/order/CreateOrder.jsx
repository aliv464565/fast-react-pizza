import {
  Form,
  redirect,
  useActionData,
  useFetcher,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalProce } from "../cart/cartSlice";
import store from '../../store'
import { useEffect, useState } from "react";
import { formatCurrency } from '../../util/helpers'
import EmptyCart from '../cart/EmptyCart'
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number

// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );


function CreateOrder() {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const Errors = useActionData();
  const { username, status, error: errorAddress, position, address } = useSelector(state => state.user)
  const isSendForm = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalProce);
  const loading = status === 'loading'
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priority


  if (cart.length <= 0) return <EmptyCart />

  return (
    <div className=" my-8 mx-5">
      <h2 className=" font-semibold text-xl mb-10">Ready to order? Let's go!</h2>
      <Form method="POST" className="mx-3" >
        <div className="mb-5 flex gap-2 flex-col md:flex-row ">
          <label className=" md:basis-40" defaultValue={username}>First Name</label>
          <input className=" input grow" defaultValue={username} type="text" name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col md:flex-row ">
          <label className=" md:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full " type="tel" name="phone" required />
            {Errors?.phone && <p className="px-1 mt-2 py-0.5 rounded-lg text-xs text-red-400 border border-red-400 bg-red-100">{Errors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col md:flex-row ">
          <label className=" md:basis-40">Address</label>
          <div className="grow relative">
            <input className="input w-full" disabled={loading} defaultValue={address} type="text" name="address" required />
            <span className="absolute right-1 top-[4.5px] md:top-[3px] z-50">
              <Button type="small" disabled={loading} handler={(e) => {
                e.preventDefault();
                dispatch(fetchAddress())
              }}>get position</Button>

            </span>
            {status === 'error' && <p className="px-1 mt-2 py-0.5 rounded-lg text-xs text-red-400 border border-red-400 bg-red-100">{errorAddress}</p>}
          </div>
        </div>
        <div className="mb-12 flex gap-4 items-center ">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="focus:ring accent-yellow-300 w-7 h-7  focus:outline-none border-none focus:ring-yellow-300 focus:ring-offset-1"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className=" font-medium ">Want to yo give your order priority?</label>
        </div>

        <div >
          <input type="hidden" name='position' value={JSON.stringify(`${position.latitude},${position.longitude}`)} />
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSendForm} type='privet'>
            {isSendForm ? "Placing order..." : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form >
    </div >
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const obformDAta = Object.fromEntries(formData);
  const data = {
    ...obformDAta,
    cart: JSON.parse(obformDAta.cart),
    priority: obformDAta.priority === "true",
  };
  const Errors = {};
  if (typeof +data.phone !== "number" || !+data.phone) {
    Errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  } else {
    delete Errors.phone;
  }
  console.log(Object.keys(Errors).length);
  if (Object.keys(Errors).length > 0) return Errors;
  const newOrder = await createOrder(data);
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
