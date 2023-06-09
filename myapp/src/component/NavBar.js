import { Link } from "react-router-dom";

import React from 'react'

export function NavBar() {
  return (
    <nav style={{padding:  '16px 32px', marginLeft: '10px', backgroundColor: 'rgba(52, 52, 52, 1)'  }}>
        <Link className="duongDan" to='/kh/trangsp' style={{padding:  '16px'}}>Trang chủ</Link>
        
        <Link className="duongDan" to='/kh/giohang' style={{padding:  '16px'}}>Giỏ hàng</Link>
        <Link className="duongDan" to='/kh/dsdonhangdadennoi' style={{padding:  '16px'}}>Đơn hàng đã đến nơi</Link>
        <Link className="duongDan" to='/kh/dsdonhangdathanhtoan' style={{padding:  '16px'}}>Đơn hàng đã thanh toán</Link>
        
    </nav>
  )
}

 
