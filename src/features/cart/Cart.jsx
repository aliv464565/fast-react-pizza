import LinkBouten from '../user/LinkBouten';
import Button from '../../ui/Button';
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';
// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const username = useSelector(state => state.user.username)
  const cart = useSelector(getCart)
  const dispatch = useDispatch()
  function handlerDeletAll() {
    dispatch(clearCart())
  }
  if (cart.length === 0) return <EmptyCart />
  return (
    <div className='mt-6 mx-4'>
      <LinkBouten to="/menu" >&larr; Back to menu</LinkBouten>

      <h2 className='mt-7 font-semibold text-xl '>Your cart, {username}</h2>
      <ul className='mt-4 divide-y divide-stone-200 border-b '>
        {cart.map((item) => <CartItem item={item} key={item.key} />)}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button type="privet" to="/order/new">Order pizzas</Button>
        <Button handler={handlerDeletAll} type='secondary'>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
