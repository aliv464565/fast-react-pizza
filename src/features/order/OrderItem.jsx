import { formatCurrency } from "../../util/helpers";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className=" flex justify-between items-center text-sm">
        <p className="font-medium">
          <span className="font-bold">{quantity}&times;</span> {name}
          <p className=" pt-2 capitalize  italic  text-stone-500 text-sm">{ingredients?.join(', ')}</p>
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
