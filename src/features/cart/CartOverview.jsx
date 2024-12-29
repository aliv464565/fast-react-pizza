import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalProce, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../util/helpers";

function CartOverview() {
  const TotalCartQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalProce)
  if (TotalCartQuantity === 0) return null
  return (
    <div className=" flex justify-between items-center text-sm sm:text-base bg-stone-800 text-stone-200 p-4 sm:px-6   uppercase">
      <p className="space-x-4 text-stone-300 sm:space-x-6 font-semibold ">
        <span>{TotalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
