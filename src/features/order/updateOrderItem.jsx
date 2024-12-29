import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'
function UpdateOrderItem() {
    const fetcher = useFetcher()
    return (
        <fetcher.Form method='PATCH' className='text-right' >
            <Button type="privet">
                make Priority
            </Button>
        </fetcher.Form>
    )
}
export async function action({ request, params }) {
    const data = { priority: true }
    await updateOrder(params.orderID, data)
    return null
}

export default UpdateOrderItem