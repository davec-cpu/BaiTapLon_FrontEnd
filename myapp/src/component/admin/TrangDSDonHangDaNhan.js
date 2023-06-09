import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { useLocation, useNavigate } from 'react-router-dom';

export function TrangDSDonHangDaNhan() {
    const [thongtin, setThongtin] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  let laMang = true;
  
    const getdsDonHangUrl = `http://127.0.0.1:8000/api/giohang/laydsdonhangdanhan`

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

  const xemChiTietDonHang = (item) =>{
    localStorage.setItem('idDonHangChiDinh', item.id);
    navigate('/quanli/chitietgiohang', {state:{idGioHang: item.id, trangthai: 'cothechidinh'}})
  }
  let danhSachDonHangDaNhan;
  if(laMang){
    danhSachDonHangDaNhan =
    <>
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    > 
    <p style={{color: "#ffff33", margin: '10px'}}>Đơn hàng đã nhận</p>
       <table>
        <tr>
          <th>Id</th>
          <th>Tên đăng nhập</th>
          <th>Tên đầy đủ</th>
          <th></th>
        </tr>
        {
          thongtin.map(item => 

            <> 
            <tbody>
            <tr>     
              <td style={{paddingTop: '16px'}}>{item.id}</td>
                <td style={{paddingTop: '16px'}}>{item.tenDangNhap}</td>
                <td style={{paddingTop: '16px'}}>{item.tenDayDu}</td>
                <td style={{paddingTop: '16px'}}>{item.tongTien}</td>
                 
                <td>
                  {/* {daCoTrongGIo(item.id)} */}
                    <button  onClick={() =>  xemChiTietDonHang(item)}>Xem chi tiết đơn hàng</button>
                </td>
            </tr>
            </tbody>
        </>

          )
        }
       </table>
        </ImageBackground>
        </div>
     </>
     
      
    }else{
      danhSachDonHangDaNhan = 
      <>
      <table>
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
                   
                    <button  onClick={() =>  xemChiTietDonHang(thongtin.data)}>Xem chi tiết đơn hàng</button>
                </td>
            </tr>
            </tbody>
        </>
 
       </table>
      </>
    }
  return (
    <>
     
      {danhSachDonHangDaNhan}
    </>
  )
}

export default TrangDSDonHangDaNhan
