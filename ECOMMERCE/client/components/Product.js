import React, {useState} from 'react'
import {formatMoney} from '../ultils/helpers'
import label from '../assets/new.png'
import trending from '../assets/trending.png'
import { renderStarFromNumber } from '../ultils/helpers'
import {SelectOption} from './'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import Products from '../pages/public/Products'
import {DetailProduct} from 'pages/public'
import{ apiUpdateCart} from 'apis'
import {toast} from 'react-toastify'
import{getCurrent} from 'store/user/asyncActions'
import{useSelector } from ' react-redux'
import Swal from 'sweetalert2'
import path from 'ultils/path'
import { BsFillSuitHeartFill, BsFillCartPlusFill} from 'react-icons/bs'

const { AiFillEye, BsFillSuitHeartFill } = icons
 
const Product = ({ productData, isNew, nomarl, navigate, dispatch}) =>{
    const [isShowOption, setIsShowOption] = useState(false)
    const { current} = useSelector(state => state.user)
    console.log({ current, productData})
    const handleClickOptions = async (e, flag) => {
        e.stopPropagation()
        if (flag === 'CART') {
            if (!current) return Swal.fire({
                title: 'Almost...',
                text: 'Please login first!',
                icon: 'infor',
                cancelButtonText: 'Not now!',
                showCancelButton: true,
                confirmButtonText: 'Go login page'
            }).then((rs) =>{
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
            })
            const response = await apiUpdateCart ({ pid: productData._id, color: productData.color})
            if (response.success) {
                toast.success(response.mes)
                dispatch(getCurrent())
            }
            else toast.error(response.mes)
        }
        if (flag === 'WISHLIST') console.log('WISHLIST')
        if (flag === 'QUICK_VIEW') {
            
        }
    }
    return(
        <div clasName= 'w-full text-base px-[10px]'>
            <Link 
            clasName = 'w- full border p-[15px] flex flex-col items-center'
            onMouseEnter={e => {
                e.stopPropagation()
                setIsShowOption(true)
            }}
            onMouseLeave={e => {
                e.stopPropagation()
                setIsShowOption(false)
            }}
            
            >
                <div clasName= 'w-full relative'>
                    {isShowOption && <div
                    clasName='absolute bottom- [-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'
                    >
                        <span  title= 'Quick view' onClick={(e) => handleClickOptions(e,'QUICK_VIEW')}><SelectOption icons={<AiFillEye/> } /></span>
                        {current?.cart?.some(el => el.product === productData._id.toString())}
                         ? <span  title= 'Add to Cart' ><SelectOption icons={<BsFillCartCheckFill color='green'/>} /></span>
                         : <span  title= 'Add to Cart' onClick={(e) => handleClickOptions(e,'CART')}><SelectOption icons={<BsFillCartPlusFill color='green'/>} /></span>
                         <span title= 'Add to Wishlist' onClick={(e) => handleClickOptions(e,'WISHLIST')}><SelectOption icons={<BsFillSuitHeartFill/>} /></span>

                    </div>}
                    <img
                        src={productData?.thumb || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjlZ3jxkWTJ1W5Eyu1lyha8mUlWHsRfJDax8Wn9iuWmg&s'}
                        alt=""
                        clasName='w-[274px] h-[274px] object-cover'
                        />
                    <img src={isNew ? label : trending} alt="" clasName={'absolute w-[100px] h-[35px] top-0 right-[0] object-cover'}
                    >
                        <div clasName='flex flex-col mt-[15px] items-start gap-1 w-full'>
                            <span clasName= 'flex h-4'>{renderStarFromNumber(productData?.totalRatings)?.map((el,index) => (
                                <span key={index}>{el}
                                </span>
                            ))} </span>
                            <span clasName='line-champ-1'>{productData?.title}</span>
                            <span>{`${formatMoney(productData?.price)} VND`}</span>
                        </div>
                    </img>
                    

                </div>
            </Link   >
            
        </div>
    )
}