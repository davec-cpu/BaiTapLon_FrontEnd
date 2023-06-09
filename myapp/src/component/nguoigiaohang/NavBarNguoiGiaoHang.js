import React from 'react'
import { Link } from "react-router-dom";

function NavBarNguoiGiaoHang() {
  return (
     
      <nav style={{padding:  '16px 32px', marginLeft: '10px', backgroundColor: 'rgba(52, 52, 52, 1)'  }}>
        <Link className="duongDan" to='giaohang' style={{padding:  '16px'}}>Trang chủ </Link>
        <Link className="duongDan" to='giaohang/dsdoanhgia' style={{padding:  '16px'}}>Danh sách đánh giá</Link>
        <Link className="duongDan" to='giaohang/thongtincanhan' style={{padding:  '16px'}}>Thông tin cá nhân</Link>
    </nav>
     
  )
}

export default NavBarNguoiGiaoHang
