import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useForceUpdate from 'use-force-update';

function Admin_trangChiTietDonHang() {

  const [thongtin, setThongtin] = useState([])
  const location = useLocation();
  const [nhanvien, setNhanvien] = useState([])
  let laMang = true;
  const navigate = useNavigate()
  
    const getGioHangUrl = `http://127.0.0.1:8000/api/chitietgiohang/lietkespcothechidinh/${location.state.idGioHang}`

    useEffect(() => {
        let unmounted = false;
        const ourReq = axios.CancelToken.source();
        axios.get(getGioHangUrl, {
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
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const layChiTietGiohang = await axios(
    //       `http://127.0.0.1:8000/api/chitietgiohang/lietkesp/${location.state.idGioHang}`
    //     );
    //     const dsDaubep = await axios(
    //       `http://127.0.0.1:8000/api/admin/laydanhsachdaubepcothechidinh`
    //     );
  
    //     setThongtin(layChiTietGiohang.data);
    //     console.log('layChiTietGiohang', layChiTietGiohang)
    //     console.log('dsDaubep', dsDaubep)
    //   };
  
    //   fetchData();
    // }, []); 
    const chuyenHuongDenTrangChiDinhDauBep = (item) => {
      localStorage.setItem('idSanPhamChiDinhDauBep', item.idSanPham)
      localStorage.setItem('soLuongSanPham', item.soLuongSanPham)
      navigate('chidinhdaubep')
      console.log(localStorage.getItem('soLuongSanPham'))
      
    }

    // let hienTHiNutChiDinh;
    // if(location.state.trangthai === 'cothechidinh'){
    //   hienTHiNutChiDinh = (<button onClick={(item) => chuyenHuongDenTrangChiDinhDauBep()}>Chi dinh dau bep</button>)
    // }else{
    //   hienTHiNutChiDinh = <></>
    // }

    // const hienTHiNutChiDinh = (item) =>{
       
    //   if(location.state.trangthai === 'cothechidinh'){
          
    //       return (<button onClick={({value}) => chuyenHuongDenTrangChiDinhDauBep(item)}>Chi dinh dau bep</button>)
    //     }else{
    //       return  <></>
    //     }
    // }

  let chiTietDonHang;
  if(laMang){
    chiTietDonHang = <>
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
      <p style={{color: "#ffff33", margin: '10px'}}>Chi tiết đơn hàng</p>
    <table className="table table-striped">
        <tr>
            <th>Tên sản phẩm  </th>
            <th>Giá</th>
            <th>Số lượng sản phẩm</th>
             
          </tr>
    
    {thongtin.map(item => 
      <> 
          <tbody >
          <tr>     
              <td style={{color: "#ade29d"}}> {item.tenSanPham}</td>
              <td style={{color: "#ade29d"}}>{item.giaSanPham}</td>
              <td style={{color: "#ade29d"}}>{item.soLuongSanPham}</td>
              
              <td><button onClick={() => chuyenHuongDenTrangChiDinhDauBep(item)}>Chi dinh dau bep</button></td> 
          </tr>
          </tbody>
          
      </>)}
      </table>
      </ImageBackground>
      </div>
      </>
  }else{
    chiTietDonHang = thongtin.data
  }

  return (
    <div>
      
       {chiTietDonHang}
    </div>
  )
}

export default Admin_trangChiTietDonHang
