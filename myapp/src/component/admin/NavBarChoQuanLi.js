import { Link } from "react-router-dom";

import React from 'react'

export function NavBarChoQuanLi() {
  return (
    <nav style={{padding:  '16px 32px', marginLeft: '10px', backgroundColor: 'rgba(52, 52, 52, 1)'  }} >
        <Link className="duongDan" to='quanli/trangquanli' style={{padding:  '16px'}}>Trang chủ </Link>
        <Link className="duongDan" to='quanli/dsdonhangdachebienxong' style={{padding:  '16px'}}>Danh sách đơn hàng đã chế biến xong</Link>
        <Link className="duongDan" to='quanli/dsdonhangdanhan' state={{ trangthai: 'cothechidinh'}} style={{padding:  '16px'}}>Danh sách đơn hàng đã nhận</Link>
        <Link className="duongDan" to='quanli/themsp' style={{padding:  '16px'}}>Thêm mới sản phẩm</Link>
        <Link className="duongDan" to='quanli/trangsp' style={{padding:  '16px'}}>Danh sách sản phẩm</Link>
    </nav>
  )
}
