import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {FaStar} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';


function ThemDiaChiThanhToan() {

  const [thongtin, setThongtin] = useState([])
  const [diaChi, setDiaChi] = useState("")
    const navigate = useNavigate()
    let laMang = true;
 
    const getDonHangDaThanhToanUrl = `http://127.0.0.1:8000/api/giohang/laydsdiachinhanhang/${localStorage.getItem('idNguoiDung')}`
    useEffect(() => { 
     
    

      let unmounted = false;
      const ourReq = axios.CancelToken.source();
      
      
      axios.get(getDonHangDaThanhToanUrl, {
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

  const themDiaChi = () => {
    var formdata = new FormData();
    formdata.append("idKhachHang", localStorage.getItem('idNguoiDung'));
    formdata.append("diaChiNhanHang", diaChi);
    formdata.append("idNhanVienGiaoHang", "");
    formdata.append("idDonHang", localStorage.getItem('idGioHangKhachHang'));
    formdata.append("trangThaiDonHang", "daDat");
    // $idCaLamViec = $request->input('idCaLamViec');
    //     $idNhanVienGiaoHang = $request->input('idNhanVienGiaoHang');
    //     $idDonHang = $request->input('idDonHang');
    //     $trangThaiDonHang = $request->input('trangThaiDonHang');

    console.log('idDonHang: ' + localStorage.getItem('idGioHangKhachHang') +'idKhachHang: '+localStorage.getItem('idNguoiDung') + 'diaChiNhanHang: '+diaChi)
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/api/giohang/themdiachinhanhang", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  const datHang = (diaChiNhanHang) => {
    var formdata = new FormData();
    formdata.append("idKhachHang", localStorage.getItem('idNguoiDung'));
    formdata.append("diaChiNhanHang", diaChiNhanHang);
    formdata.append("idNhanVienGiaoHang", "");
    formdata.append("idDonHang", localStorage.getItem('idGioHangKhachHang'));
    formdata.append("trangThaiDonHang", "daDat");

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

  let dsDiaChi;
    if(laMang){
       
      dsDiaChi = <>
      
      { 
        thongtin.map(item => 
          <> 
          <table className='table'>
          <tr>
           
             
          </tr>
              <tbody>
                <tr>     
                    <td>{item.diaChiNhanHang}</td>
                     
                     
                     
                   
                     
                    <td><button onClick={() =>datHang(item.diaChiNhanHang)}>Chọn địa chỉ và đặt hàng</button></td>
                    
                </tr>
              </tbody>
            </table> 
          
          </>
          )
          

          

           
           
      }
      Hoặc
      <br></br>
      <input 
      type="text"
      onChange={(e)=>setDiaChi(e.target.value)}/>
      <button onClick={()=>themDiaChi()}>Thêm địa chỉ nhận hàng mới</button>
      </>
          
      }

  return (
    <div>
      {dsDiaChi}
    </div>
  )
}

export default ThemDiaChiThanhToan
