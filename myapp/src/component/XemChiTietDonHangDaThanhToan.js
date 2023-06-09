import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaStar} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function XemChiTietDonHangDaThanhToan() {

    const [thongtin, setThongtin] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [rating, setRating] = useState(null)
    const [resThemVaoGio, setresThemVaoGio] = useState(null)
    let laMang = true;
    let nutBam = '';
    const getUrl = `http://127.0.0.1:8000/api/chitietgiohang/chitietdonhangkemdaubep/${localStorage.getItem('idDonHangThanhToan')}`
  useEffect(  () => {
      let unmounted = false;
      const ourReq = axios.CancelToken.source();
      
      
      axios.get(getUrl, {
        cancelToken: ourReq.token,
        
      })
      .then( a=> {
        if(!unmounted) {
          setThongtin(a.data);
          setLoading(false);
          console.log(a.data);
        } 
      })
      .catch(function (e) {
        if(!unmounted){
          setError(true);
          setLoading(false);
          
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

   const themDanhGia = (idCaLamViec, idDauBepThucHien, idSanPham)=>{
        console.log('danh gia: '+idCaLamViec+'idDauBepThucHien: '+idDauBepThucHien+'idDonHang: '+localStorage.getItem('idDonHangThanhToan') +'sao danh gia: '+rating)

        var formdata = new FormData();
            formdata.append("idCaLamViec", idCaLamViec);
            formdata.append("idDauBepThucHien", idDauBepThucHien);
            formdata.append("idSanPham", idSanPham);
            formdata.append("idDonHangThanhToan", localStorage.getItem('idDonHangThanhToan'));
            formdata.append("danhGiaKhachHang", rating);

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            fetch("http://127.0.0.1:8000/api/daubepchebien/themdanhgiadaubep", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            }


  let dsChiTietDonHangDaThanhToans;
  if(laMang){
    dsChiTietDonHangDaThanhToans = thongtin.map(item => 
        <> 
        <table className='table'>
        <tr>
          <th>Mã đơn hàng</th>
          <th>Tên sản phẩm</th>
          <th>Đầu bếp chế biến</th>
          <th>Số lượng sản phẩm</th>
          <th>Giá sản phẩm</th>
          <th>Đánh giá đầu bếp</th>
        </tr>
            <tbody>
              <tr>     
                  <td>{item.idGioHang}</td>
                  <td>{item.tenSanPham}</td>
                  <td>{item.tenDayDu}</td>
                  <td>{item.soLuongSanPham}</td>
                  <td>{item.giaSanPham}</td>
                   
                   
                 
                  <td>
                    {stars}
                    <button onClick={() => themDanhGia(item.idCaLamViec, item.idDauBepThucHien, item.idSanPham)}>Xác nhận đánh giá</button>
                  </td>
                  
                  
              </tr>
            </tbody>
          </table>  
        </>
        )
    }else{
        dsChiTietDonHangDaThanhToans = <>
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
                      <button onClick={() => themDanhGia(thongtin.idCaLamViec, thongtin.idNguoiGiaoHang)}>Xác nhận đánh giá</button>
                    </td>
              </tr>
              </tbody>
          </>
   
         </table>
        </>
      }

  return (
    <div>
      {dsChiTietDonHangDaThanhToans}
    </div>
  )
}

export default XemChiTietDonHangDaThanhToan
