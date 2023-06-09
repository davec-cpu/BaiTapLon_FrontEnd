import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useForceUpdate from 'use-force-update';
import { hamPost } from '../HamPost';
import {ImageBackground} from 'react-native'

const useApiRequest = url => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then(response => {
          setIsLoaded(true);
          setData(response.data);
        })
        .catch(error2 => {
          setError2(error2);
        });
    };
    fetchData();
  }, [url]);

  return { error2, isLoaded, data };
};

function TrangChuAdmin() {

  const [thongtin, setThongtin] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

   

  const forceUpdate = useForceUpdate();
  const [, setCount] = useState(0);
  const navigate = useNavigate();
  let laMang = true;
 
    const getDonHangUrl = `http://127.0.0.1:8000/api/giohang/laydsdonhang`
    useEffect(() => {
      let unmounted = false;
      const ourReq = axios.CancelToken.source();
      axios.get(getDonHangUrl, {
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
 // error, isLoaded, data
  const { error2, isLoaded, data } = useApiRequest(
    "http://127.0.0.1:8000/api/calamviec/laycalamviec"
  );

  if (error2 !== null) {
    
  }
  if (!isLoaded) {
     
  }
  console.log(error2)
  console.log('Thong tin ca truc: ', data)
  

  const nhanDonHang = (item) => {
     
    const url = `http://127.0.0.1:8000/api/giohang/nhanhoactuchoidonhang/${item.id}/chapNhan`
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const xemChiTietDonHang = (item) => {
    
    navigate('/quanli/chitietgiohang', {state:{idGioHang: item.id, trangthai: 'khongthechidinh'}})
  }

  let danhSachDonHang;
  if(laMang){
    danhSachDonHang =
    <>
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    > 
    <table className='table'>
      <tr>
        <th>Id</th>
        <th>Tên đăng nhập người dùng</th>
        <th>Tên đầy đủ</th>
        <th>Tổng tiền</th>
      </tr>
    {
       thongtin.map(item => 
        <> 
       
            <tbody>
            <tr>     
              <td>{item.id}</td>
                <td>{item.tenDangNhap}</td>
                <td>{item.tenDayDu}</td>
                <td>{item.tongTien}</td>
                 
                  
                <td>
                    <button onClick={() => nhanDonHang(item)}>Nhận đơn hàng</button>
                 
                    <button style={{marginTop: '16px'}}>Từ chối đơn hàng</button>
                </td>
                <td>
                    <button onClick={() => xemChiTietDonHang(item)}>Xem chi tiết đơn hàng</button>
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
    danhSachDonHang = thongtin.data
  }

  return (
    <>
      
       
      {danhSachDonHang}
    </>
  )
}

export default TrangChuAdmin
