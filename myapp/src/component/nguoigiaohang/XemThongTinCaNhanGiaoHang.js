import axios from 'axios';
import React, { useEffect, useState } from 'react'

function XemThongTinCaNhanGiaoHang() {


    const [thongtin, setThongtin] = useState([])
    let laMang = true;
 
    
    useEffect(() => { 
     
    

      let unmounted = false;
      const ourReq = axios.CancelToken.source();
      const urlThongTinCaNhan = `http://127.0.0.1:8000/api/admin/laythongtinngiaohang/${localStorage.getItem('idNguoiGiaoHang')}`
      
      axios.get(urlThongTinCaNhan, {
        cancelToken: ourReq.token,
        
      })
      .then( a=> {
        if(!unmounted) {
          setThongtin(a.data);
           
          
          if(Array.isArray(thongtin)){
            laMang = true;
          }else{
            laMang = false
          }
          console.log('thong tin la: ',thongtin)
           
          console.log(a.data);
        } 
      })
      .catch(function (e) {
        if(!unmounted){
           
          
          if(axios.isCancel(e)){
            console.log(`request cancel: ${e.message}`);
          }else{
            console.log("another error happen:" + e.message);
          }
        }
      });
      return () => {
          unmounted = true;
          ourReq.cancel();
          ourReq.cancel("Canceling in cleanup");
      };
      
  }, [])

  let thongTinNGiaoHang;
    if(laMang){
      thongTinNGiaoHang = thongtin.map(item => 
          <> 
           Mã người giao hàng: {item.id}
           Tên người giao hàng: {item.tenDayDu}
           Địa chỉ người giao hàng: {item.diaChi}
           Số điện thoại người giao hàng: {item.soDienThoai}
           Tổng số đơn hàng đã giao: {item.total}
          </>
          )
      }

  return (
    <div>
      {thongTinNGiaoHang}
    </div>
  )
}

export default XemThongTinCaNhanGiaoHang
