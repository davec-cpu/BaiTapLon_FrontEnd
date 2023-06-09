import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { hamPost } from '../HamPost';

function ChiDinhNguoiGiaoHang() {

    const [thongtin, setThongtin] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [thongBao, setThongBao] =useState('')
    const [data, setData] = useState([])
   
    let urlDsNguoiGiaoHang = "http://127.0.0.1:8000/api/admin/laydanhsachnguoigiaohangcothechidinh"
  const layThongTinCaTruc = () => {
    axios
      .get(urlDsNguoiGiaoHang)
      .then(response => {
        
        setData(response);
         console.log('thong tin data: ', data)
      })
      .catch(error => {
        setError(error);
      });
  };

  let laMang = true;
 
    
    useEffect(() => { 
    layThongTinCaTruc()
    

      let unmounted = false;
      const ourReq = axios.CancelToken.source();
      
      
      axios.get(urlDsNguoiGiaoHang, {
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

  const chiDinhNguoiGiaoHang = (item)=>{
      ///
      var formdata = new FormData();
        formdata.append("idCaLamViec", item.idCaLamViec);
        formdata.append("idNhanVienGiaoHang", item.idNGiaoHang);
        formdata.append("idDonHang", localStorage.getItem('idDonHangDaCheBienXong'));

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/giaohang/themgiaohang", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

      console.log('id ca lam viec: ' + item.idCaLamViec + 'id nhan vien giao hang: '+item.idNGiaoHang
                  + 'id don hang: '+localStorage.getItem('idDonHangDaCheBienXong'))

    const url = `http://127.0.0.1:8000/api/giaohang/themgiaohang`
    // hamPost(url, formdata, true).then(data => {
    //   var mess = data;
       
    //   console.log('456: ', data);
    //   setThongBao('Đã chỉ định người giao hàng')
    // })


  }

  let dsSanPhamChiDinh;
  if(laMang){
    dsSanPhamChiDinh =
    <>
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
      <p style={{color: "#ffff33", margin: '10px'}}>Chỉ định người giao hàng</p>
       <table className="table">
        <tr>
          <th>Id</th>
          <th>Tên nhân viên</th>
           
           
        </tr>
        {
          thongtin.map(item => 

            <> 
            <tbody>
            <tr>     
                <td>{item.idNGiaoHang}</td>
                <td>{item.tenDayDu}</td>
                 
                
                 
                <td>
                  {/* {daCoTrongGIo(item.id)} */}
                    <button  onClick={() =>  chiDinhNguoiGiaoHang(item)}>Chỉ định người giao hàng</button>
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
      dsSanPhamChiDinh = 
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
                <td>{thongtin.tenSanPham}</td>
                <td>{thongtin.soLuongSanPham}</td>
                <td>{thongtin.anhSanPham}</td>
                 
                 
                <td>
                   
                    <button  onClick={() =>  chiDinhNguoiGiaoHang(thongtin.data)}>Bắt đầu chế biến</button>
                </td>
            </tr>
            </tbody>
        </>
 
       </table>
      </>
    }

  return (
    <div>
      
      {dsSanPhamChiDinh}
      <p>{thongBao}</p>
    </div>
  )
}

export default ChiDinhNguoiGiaoHang
