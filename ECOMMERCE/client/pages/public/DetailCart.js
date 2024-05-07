import {Breadcrumb, Button} from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import { formatMoney } from '../../ultils/helpers'
import{ useSelector} from 'react-redux'
import OrderItem from '../../components/products/OrderItem'

const DetailCart = (location, ) => {
    const{  currentCart} = useSelector(state => state.user)
        
    return (
        <div className='w-full'>
           <div className="h-[81px] flex justify-center items-center bg-gray-100">
    <div  className="w-main">
      <h3 className="font-semibold uppercase"> My Cart</h3>
      <Breadcrumb category={location?.pathmane}
      />
    </div>
  </div>
  <div className='flex flex-col  w-main mx-auto my-8 '>
  <div className ='w-main mx-auto bg-bary font-bol  py-3 grid grid-cols-10'>
    <span className='col-span-6 w-full text-center '>Products</span>
    <span className='col-span-6 w-full text-center '>Quantity</span>
    <span className='col-span-6 w-full text-center '>Price</span>
  </div>
  {currentCart?.map(el => (
   <OrderItem 
   key={el._id} 
   el ={el}
   defaulQuantity={el.quantity}
   />
  ))}
  </div>
  <div className='w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3'>
    <span className='flex items-center gap-8 text-sm'>
        <span>Subtotal:</span>
        <span className='text-main font-bold '>  {`${formatMoney(currentCart?.reduce((sum, el) => +el?.price*el.quantity + sum,0))}  VND`}</span>
    </span>
    <span className='text-xs italic'> SHipping ,taxes, and discounts calculated at checkout</span>
    <Button>Checkout</Button>
  </div>
  </div>
    )
}

export default withBaseComponent(DetailCart)