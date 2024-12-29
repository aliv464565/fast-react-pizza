import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItemQuantity, getCurrentQuantityId, indItemQuantity } from "./cartSlice"

function UpdateItemQuantity({ pizzaId }) {
    const currentQuantity = useSelector(getCurrentQuantityId(pizzaId));
    const dispatch = useDispatch()
    return (
        <div className="space-x-3">
            <Button handler={() => dispatch(indItemQuantity(pizzaId))} type='round'>-</Button>
            <span>{currentQuantity}</span>
            <Button handler={() => dispatch(decreaseItemQuantity(pizzaId))} type="round">+</Button>
        </div>
    )
}

export default UpdateItemQuantity