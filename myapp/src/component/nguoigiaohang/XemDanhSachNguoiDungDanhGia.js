import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';

function XemDanhSachNguoiDungDanhGia() {
  const [thongtin, setThongtin] = useState([])
    let laMang = true;
 
    
    useEffect(() => { 
     
    

      let unmounted = false;
      const ourReq = axios.CancelToken.source();
      const urlDsDanhGia = `http://127.0.0.1:8000/api/giaohang/dsdanhgia/${localStorage.getItem('idNguoiGiaoHang')}`
      
      axios.get(urlDsDanhGia, {
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

  let dsDanhGia;
    if(laMang){
      dsDanhGia = thongtin.map(item => 
          <> 
          <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    > 
          <table className='table'>
          <tr>
            
            <th>Mã số khách hàng</th>
            <th>Tên khách hàng</th>
            <th>Mã đơn hàng</th>
            <th>Số sao đánh giá</th>
          </tr>
              <tbody>
                <tr>     
                    <td>{item.idKhachHangDanhGia}</td>
                    <td>{item.tenDayDu}</td>
                    <td>{item.idDonHang}</td>
                    <td>{item.soSaoDanhGia}</td>
                </tr>
              </tbody>
            </table>  
            </ImageBackground>
            </div>
          </>
          )
      }

  return (
    <div>
      {dsDanhGia}
    </div>
  )
}

export default XemDanhSachNguoiDungDanhGia
