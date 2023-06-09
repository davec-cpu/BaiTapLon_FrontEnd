import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { useNavigate } from 'react-router-dom'

function XemDanhSachDonHangDuocGiao() {
    const [thongtin, setThongtin] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false) 

    const navigate = useNavigate()
    let laMang = true;
    const getdsDonHangUrl = `http://127.0.0.1:8000/api/giaohang/laydschidinhgiaohang/${localStorage.getItem('idCaLamViec')}/${localStorage.getItem('idNguoiGiaoHang')}`

    useEffect(() => {
      let unmounted = false;
      const ourReq = axios.CancelToken.source();
      axios.get(getdsDonHangUrl, {
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
          console.log('thong tin don hang da nhan la: ',thongtin)
           
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

    const batDauGiaoHang = (item)=>{
     // console.log(item.idDonHang)
      localStorage.setItem('idDonHangGiao', item.idDonHang)
      console.log("idCaLamViec: " + localStorage.getItem("idNguoiGiaoHang") + "idCaLamViec: "+localStorage.getItem("idCaLamViec")
      + "idDonHangGiao: "+ localStorage.getItem("idDonHangGiao"))

      var formdata = new FormData();
      formdata.append("idCaLamViec", localStorage.getItem("idCaLamViec"));
      formdata.append("idNhanVienGiaoHang", localStorage.getItem("idNguoiGiaoHang"));
      formdata.append("idDonHang", localStorage.getItem("idDonHangGiao"));
      formdata.append("trangThaiDonHang", "dangGiao");

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:8000/api/giohang/capnhattrangthai", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      navigate('tienhanhgiao')
    }
    
     
    let dsDonHangChiDinh;
    if(laMang){
      dsDonHangChiDinh = 
          <> 
          <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/dRIm8rFoBqfpsfQaKKCbYMgjgnhJ5GXz.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
          <table>
            <tr>
              <th>Id khách hàng</th>
              <th>Id đơn hàng</th>
              <th>Tên đầy đủ</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ nhận</th>
            </tr>
          {thongtin.map(item => 
              <tbody>
              <tr>     
                  <td>{item.idKhachHang}</td>
                  <td>{item.idDonHang}</td>
                  <td>{item.tenDayDu}</td>
                  <td>{item.soDienThoai}</td>
                  <td>{item.diaChiNguoiNhan}</td>
                  <td><button onClick={() => batDauGiaoHang(item)}>Bắt đầu giao hàng</button></td>
                   
              </tr>
              </tbody>
              )}
            </table>
            </ImageBackground>
            </div>
          </>

          
      }else{
        dsDonHangChiDinh = <>
        <table className='table'>
          <tr>
            <th>Tên đăng nhập</th>
            <th>Tên đầy đủ</th>
            <th></th>
          </tr>
           
  
              <> 
              <tbody>
              <tr>     
                  <td>{thongtin.tenDangNhap}</td>
                  <td>{thongtin.tenDayDu}</td>
                  <td>{thongtin.tongTien}</td>
                   
                  <td>
                     
                      <button  onClick={() =>  batDauGiaoHang(thongtin.data)}>Bắt đầu giao hàng</button>
                  </td>
              </tr>
              </tbody>
          </>
   
         </table>
        </>
      }

  return (
    <div>
      Ds don hga
      {dsDonHangChiDinh}
    </div>
  )
}

export default XemDanhSachDonHangDuocGiao
