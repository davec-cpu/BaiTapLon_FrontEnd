import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {ImageBackground} from 'react-native'

function DanhSachDonHangDaCheBienXong() {

    const [thongtin, setThongtin] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false) 

    const navigate = useNavigate()
    let laMang = true;
    const getdsDonHangUrl = `http://127.0.0.1:8000/api/giohang/dsdonhangchebienxong`
    
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


    const chiDinhGiaoHang = (item) => {
      console.log('don hang: ', item)
      localStorage.setItem('idDonHangDaCheBienXong', item)
      navigate('chidinhnguoigiaohang')
    }

    const demo = (idDonHang) => {
        console.log('idDonHang: '+ idDonHang+' id ca lam viec: '+localStorage.getItem('idCaLamViec'))
        navigate('chidinhnguoigiaohang')
    }

    let dsDonHangDaCheBienXong;

    if(laMang){
      dsDonHangDaCheBienXong = 
      <>
      <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
      <p style={{color: "#ffff33", margin: '10px'}}> Danh sách đơn hàng đã chế biến xong</p>
        <table className="table">
          <tr>
            <th>id đơn hàng</th>
            <th>Tổng tiền</th>
            <th>Tên đăng nhập khách hàng</th>
            <th>Tên đầy đủ khách hàng</th>
          </tr>
          {
            thongtin.map(item => 
              
              <>
                <tbody>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.tongTien}</td>
                    <td>{item.tenDangNhap}</td>
                    <td>{item.tenDayDu}</td>
                    <td>
                      <button onClick={()=>chiDinhGiaoHang(item.id)}>Chỉ định giao hàng</button>
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
      dsDonHangDaCheBienXong=
      <>
        <table>
          <tr>
            <th>

            </th>
          </tr>
          <>
            <tbody>
              <tr>
                <td>{thongtin.id}</td>
                <td>{thongtin.tongTien}</td>
                <td>{thongtin.tenDangNhap}</td>
                <td>{thongtin.tenDayDu}</td>
              </tr>
            </tbody>
          </>
        </table>
      </>
    }
   


  return (
    <div>
       
        {dsDonHangDaCheBienXong}
    </div>
  )
}

export default DanhSachDonHangDaCheBienXong
