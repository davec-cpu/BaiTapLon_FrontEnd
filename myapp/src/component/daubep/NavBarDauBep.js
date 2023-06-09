import React from 'react'
import { Link } from "react-router-dom";

function NavBarDauBep() {
  return (
    <div>
      <nav style={{padding:  '16px 32px', marginLeft: '10px', backgroundColor: 'rgba(52, 52, 52, 1)'  }}>
        <Link className="duongDan" to='/daubep' style={{padding:  '16px'}}>Trang chủ</Link>
        
        <Link className="duongDan" to='/daubep/dsdanhgia' style={{padding:  '16px'}}>Danh sách đánh giá</Link>
        
    </nav>
    </div>
  )
}

export default NavBarDauBep
