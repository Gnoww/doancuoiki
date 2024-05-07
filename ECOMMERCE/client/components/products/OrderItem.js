import SelectQuantity from 'components/common/SelectQuantity'
import React, {useEffect, useState} from ' react'
import { formatMoney } from '../../ultils/helpers'
import { updateCart } from '../../store/user/userSlice'

 const OrderItem = ({el, defaulQuantity=1 , dispatch}) => {
    const [quantity, setQuantity] = useState(() => defaulQuantity)
    const handleQuantity = (number) => {
        if (+number > 1) setQuantity(number)
    }
    
    const handleChangeQuantity = (flag) => {
        if (flag === "minus" && quantity === 1) return
        if (flag === "minus") setQuantity((prev) => +prev - 1)
        if (flag === "plus") setQuantity((prev) => +prev + 1)
      }
    useEffect(() => {
        dispatch(updateCart({pid: el.product?._id, quantity, color: el.color}))
    },[quantity])


    return(
        <div className ='w-main mx-auto font-bol  py-3 grid-cols-10'>
        <span className='col-span-6 w-full text-center '>
        <div className='flex gap-2'/>
                            <img src={el.thumbnail} alt="thumb" className='w-28 h-28 object-cover' />
                            <div className='flex flex-col items-start gap-1'>
                                <span className='text-sm text-main'>{el.title}</span>
                                <span className-='text-[10px]font-main'>{el.color}</span>
                                
                            </div>
        </span>
        <span className='col-span-1 w-full text-center '>
        <div className='flex items-center h-full'>
            <SelectQuantity
                    quantity={quantity}
                    handleQuantity={handleQuantity}
                    handleChangeQuantity={handleChangeQuantity}
                  />
            </div>
    
        </span>
        <span className='col-span-3 w-full h-full flex items-center justify-center text-center'>
    
    </span>
    <span className='text-lg '>{formatMoney(el.price) + 'VND'}</span>
    
      </div>    )
 }

 export default withBaseComponet(OrderItem)