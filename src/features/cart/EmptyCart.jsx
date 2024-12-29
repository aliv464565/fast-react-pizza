import LinkBouten from '../user/LinkBouten';

function EmptyCart() {
  return (
    <div className=' py-3 px-4'>
      <LinkBouten to="/menu" >&larr; Back to menu</LinkBouten>

      <p className='font-semibold text-center mt-7'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
