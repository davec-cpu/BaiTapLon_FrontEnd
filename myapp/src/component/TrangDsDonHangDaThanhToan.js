import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {FaStar} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {ImageBackground} from 'react-native'

function TrangDsDonHangDaThanhToan() {

    const [thongtin, setThongtin] = useState([])
    const navigate = useNavigate()
    let laMang = true;
 
    const getDonHangDaThanhToanUrl = `http://127.0.0.1:8000/api/giohang/laydsdonhangdathanhtoan/${localStorage.getItem('idNguoiDung')}`
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
  
  const [rating, setRating] = useState(null)

  const themDanhGia = (idCaLamViec, idNguoiGiaoHang, idDonHang) => {
    console.log('idCaLamViec: ' + idCaLamViec +' id giao hang: ' + idNguoiGiaoHang + 'id don hang: '+ idDonHang + 'so sao danh gia: '+ rating)
    
    var formdata = new FormData();
      formdata.append("idCaLamViec", idCaLamViec);
      formdata.append("idNhanVienGiaoHang", idNguoiGiaoHang);
      formdata.append("idDonHang", idDonHang);
      formdata.append("idKhachHang", localStorage.getItem('idNguoiDung'))
      formdata.append("danhGia", rating);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/api/giaohang/checkdanhgia", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }
  const [ratingdp, setRatingDP] = useState(null)
  const kiemTraDanhGia = (item) => {
     if(item){
      item = item
     }else{
      item=0
     }
     return <>
     
     <FaStar 
     className='star'
     color={"#ffc107"}
     
     />

     {item}
     
     </>
  }

  const xemChiTietDonHangDaThanhToan = (idDonHang) => {
    localStorage.setItem('idDonHangThanhToan', idDonHang);
    navigate('/kh/chitietdonhangdathanhtoan')
  }

  let stars = <div>
  {[ ...Array(5)].map((star, i) => {
    const ratingValue = i+1
      return (
        <label>
          <input 
          type="radio" 
          value={ratingValue} 
          name="rating"
          onClick={() => setRating(ratingValue)}
          />
          <FaStar 
          className='star'
          color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
          />
          
        </label>
      )
  })}
  </div>

  let dsDonHangDaThanhToan;
    if(laMang){
        dsDonHangDaThanhToan = thongtin.map(item =>
          <div style={{backgroundColor: "black"}}> 
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
            <th>Đánh giá nhân viên giao hàng</th>
             
          </tr>
              <tbody>
                <tr>     
                    <td>{item.idDonHang}</td>
                    <td>{item.tongTien}</td>
                    <td>{item.tenDayDu}</td>
                     
                    <td>
                       {kiemTraDanhGia(item.danhgiakh)}
                       
                    </td>
                   
                    <td>
                      {stars}
                      <button onClick={() => themDanhGia(item.idCaLamViec, item.idNguoiGiaoHang, item.idDonHang)}>Xác nhận đánh giá</button>
                    </td>
                    <td><button onClick={() =>xemChiTietDonHangDaThanhToan(item.idDonHang)}>Xem chi tiết đơn hàng</button></td>
                    
                </tr>
              </tbody>
            </table>  
          </ImageBackground>
          </div>
          )
      }else{
        dsDonHangDaThanhToan = <>
        <table className='table'>
          <tr>
            <th>Tên đăng nhập</th>
            <th>Tên đầy đủ</th>
            <th></th>
          </tr>
           
  
              <> 
              <tbody>
              <tr>     
                  <td>{thongtin.idDonHang}</td>
                  <td>{thongtin.tongTien}</td>
                  <td>{thongtin.tenDayDu}</td>
                   
                  <td>
                      {stars}
                      <button onClick={() => themDanhGia(thongtin.idCaLamViec, thongtin.idNguoiGiaoHang, thongtin.idDonHang)}>Xác nhận đánh giá</button>
                    </td>
              </tr>
              </tbody>
          </>
   
         </table>
        </>
      }

  return (
    <div>
      {dsDonHangDaThanhToan}
      
    </div>
  )
}

export default TrangDsDonHangDaThanhToan
