import Button from "../../ui/Button";
import { formatCurrency } from "../../util/helpers";
import { useDispatch, useSelector } from "react-redux";
import { additem, getCurrentQuantityId } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityId(id));
  const dispatch = useDispatch()
  console.log(currentQuantity)
  const isInCart = currentQuantity > 0

  function handlerAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    }
    dispatch(additem(newItem))
  }

  return (
    <li className=" flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'grayscale opacity-75' : ''}`} />
      <div className=" flex flex-col grow">
        <p className=" font-medium">{name}</p>
        <p className="text-stone-500 italic text-sm   ">{ingredients.join(", ")}</p>
        <div className=" flex justify-between mt-auto items-center">

          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="uppercase text-sm text-stone-500 ">Sold out</p>}
          {isInCart && <div className="flex items-center  gap-3 sm:gap-8">
            <UpdateItemQuantity pizzaId={id} />
            <DeleteItem pizzaId={id} />
          </div>}
          {!soldOut && !isInCart && <Button handler={handlerAddToCart} type="small">add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
