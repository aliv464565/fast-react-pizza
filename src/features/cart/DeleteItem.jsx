import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { deleteItem } from "./cartSlice"

function DeleteItem({ pizzaId }) {
    const dispatch = useDispatch()
    return (
        <Button handler={() => dispatch(deleteItem(pizzaId))} type='small' >Delet</Button>
    )
}

export default DeleteItem
