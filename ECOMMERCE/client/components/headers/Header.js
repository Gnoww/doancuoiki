import React, { Fragment, memo, useEffect, useState} from 'react'
import logo from 'assets/logo.png'
import icons from 'untils/icons'
import { Link } from 'react-router-dom'
import path from 'untils/path'
import { useDispatch, useSelector} from 'react-redux'
import {logout } from 'store/user/userSlice'
import withBaseComponent from 'hocs/withBaseComponent'
import { showCart } from '../../store/app/appSlice'



const { RiPhoneFill, MdEmail, BsHandbagFill,FaUserCircle} = icons
const Header = ({dispatch}) => {
    const {current } = useSelector(state => state.user)
    const [isShowOption, setIsShowOption] = useState(false)
    const dispatch = useDispatch()
    useEffect(() =>{
        const handleClickoutOptions = (e) => {
            const profile = document.getElementById('profile')
            if (!profile?.contains(e.target)) setIsShowOption(false)
        }
    })
}



{current && <Fragment>
    <div onClick ={() => dispatch(showCart())} className='cursor-pointer flex items-center gap-2 px-6 border-r' >
        <BsHandbagFill color='red'/>
        <span>{`${current?.cart?.lenght || 0} item(s)`}</span>
    </div>
    }

export default withBaseComponent(memo(Header))