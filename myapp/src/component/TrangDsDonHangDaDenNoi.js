import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import {ImageBackground} from 'react-native'


function TrangDsDonHangDaDenNoi() {
    const [thongtin, setThongtin] = useState([])
    let laMang = true;
    let mangRong = true;
    const getDonHangDaToiNoiUrl = `http://127.0.0.1:8000/api/giohang/laydsdonhangdagiaotoinoi/${localStorage.getItem('idNguoiDung')}`
    useEffect(() => { 
     
    

      let unmounted = false;
      const ourReq = axios.CancelToken.source();
      
      
      axios.get(getDonHangDaToiNoiUrl, {
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
          if (thongtin.length === 0) {
            console.log("Array is empty!") 
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

  const xacNhanThanhToan = (idGioHang, idNguoiGiaoHang) => {
    var formdata = new FormData();
    formdata.append("idCaLamViec", "");
    formdata.append("idNhanVienGiaoHang", idNguoiGiaoHang);
    formdata.append("idDonHang", idGioHang);
    formdata.append("trangThaiDonHang", "daThanhToan");
    formdata.append("idKhachHang", localStorage.getItem('idNguoiDung'));
    
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/api/giohang/capnhattrangthai", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }


 


  let dsDonHangDaGiaoToiNoi;
    if(laMang){
        dsDonHangDaGiaoToiNoi = thongtin.map(item => 
          <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    > 
          <table className='table'>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tổng tiền</th>
            <th>Tên nhân viên giao hàng</th>
            <th></th>
            <th></th>
          </tr>
              <tbody>
                <tr>     
                    <td>{item.idGioHang}</td>
                    <td>{item.tongTien}</td>
                    <td>{item.tenDayDu}</td>
                    <td><button onClick={() => xacNhanThanhToan(item.idGioHang, item.idNguoiGiaoHang)}>Xác nhận thanh toán</button></td>
                    
                </tr>
              </tbody>
            </table>  
          </ImageBackground>
          )
      }else if(!laMang){
        dsDonHangDaGiaoToiNoi = <>
        <table className='table'>
          <tr>
            <th>Tên đăng nhập</th>
            <th>Tên đầy đủ</th>
            <th></th>
          </tr>
           
  
              <> 
              <tbody>
              <tr>     
                  <td>{thongtin.idGioHang}</td>
                  <td>{thongtin.tongTien}</td>
                  <td>{thongtin.tenDayDu}</td>
                   
                  <td>
                     
                      <button  onClick={() =>  xacNhanThanhToan(thongtin.data)}>Xác nhận thanh toán</button>
                  </td>
              </tr>
              </tbody>
          </>
   
         </table>
        </>
      }
      if(mangRong){
        <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
        <div className="container">
      <div class="d-flex justify-content-center align-items-center vh-100">
        {dsDonHangDaGiaoToiNoi = <h1> Hiện không có đơn hàng nào đã tới nơi</h1>}
        </div>
        </div>
        </ImageBackground>
      }

  return (
    
    <div>
      {dsDonHangDaGiaoToiNoi}
      
    </div>
    
  )
}

export default TrangDsDonHangDaDenNoi
