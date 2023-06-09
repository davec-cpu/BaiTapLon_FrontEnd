import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useForceUpdate from 'use-force-update';
import {ImageBackground} from 'react-native'
function Giohang() {

  const [thongtin, setThongtin] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [soLuong, setSoLuong] = useState(0)
  const navigate = useNavigate()
//  / const []
  const forceUpdate = useForceUpdate();
  const [, setCount] = useState(0);
  
  let laMang = true;
  //  const getUrl = `http://127.0.0.1:8000/api/chitietgiohang/lietkesp/${localStorage.getItem('idGioHangKhachHang')}`
    const getGioHangUrl = `http://127.0.0.1:8000/api/chitietgiohang/testinghai/${localStorage.getItem('idNguoiDung')}`
  useEffect(() => {
      let unmounted = false;
      const ourReq = axios.CancelToken.source();
      
      
      axios.get(getGioHangUrl, {
        cancelToken: ourReq.token,
        
      })
      .then( a=> {
        if(!unmounted) {
          setThongtin(a.data);
          //thongtin2: [];
          
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

  const xoaKhoiGio = (item) => {
    var formdata = new FormData();
    formdata.append("idGioHang", item.idGioHang);
    formdata.append("idSanPham", item.idSanPham);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/api/chitietgiohang/xoakhoigio", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
    var formdata = new FormData();
formdata.append("idGioHang", "31");
formdata.append("idSanPham", "3");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/api/chitietgiohang/xoakhoigio", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  const tangSoLuong = (item)=> {
    var formdata = new FormData();
    formdata.append("idSanPham", item.id);
    formdata.append("idGioHang", localStorage.getItem('idGioHangKhachHang'));

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/chitietgiohang/capnhatsoluong", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  const capNhat = (item) => {
    let idgiogua = localStorage.getItem('idGioHangKhachHang');
    let dlieu = {idgiogua};
    console.log("item", dlieu);

    fetch('http://127.0.0.1:8000/api/chitietgiohang/capnhatsoluong', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      res.json().then((resp) => {
        console.log('resp', resp)
      })
    })
  }
  const datHang = () => {
    
    console.log(localStorage.getItem('idGioHangKhachHang'))
    console.log(localStorage.getItem('idNguoiDung'))
    // var formdata = new FormData();
    //   formdata.append("idCaLamViec", "");
    //   formdata.append("idNhanVienGiaoHang", "");
    //   formdata.append("idDonHang", localStorage.getItem('idGioHangKhachHang'));
    //   formdata.append("trangThaiDonHang", "daDat");
    //   formdata.append("idKhachHang", localStorage.getItem('idNguoiDung'));
    //   formdata.append("thoiGianHoanThanhDonHang", "");

    //   var requestOptions = {
    //     method: 'POST',
    //     body: formdata,
    //     redirect: 'follow'
    //   };

    //   fetch("http://127.0.0.1:8000/api/giohang/capnhattrangthai", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
    navigate('/kh/themdiachi')

  }

  const thayDoiSL = (item, trangthai) => {
      console.log('id gio: '+ item.idGioHang + ' id san pham: ' +item.idSanPham+' ')
      var formdata = new FormData();
        formdata.append("idSanPham", item.idSanPham);
        formdata.append("idGioHang", item.idGioHang);
        formdata.append("trangThai", trangthai);

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/chitietgiohang/capnhatsoluong", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
  }

    
  

  let danhSachGioHang;
  if(laMang){
    danhSachGioHang = thongtin.map(item => 
      <> 
          <tbody>
          <tr>
                
              <td  style={{color: "#ade29d"}}>{item.tenSanPham}</td>
              <td style={{color: "#ade29d"}}><img src={`http://127.0.0.1:8000/uploads/${item.anhSanPham}`}  width="200" height="200"></img></td>
              <td style={{color: "#ade29d"}}>{item.giaSanPham}</td>
              <td style={{color: "#ade29d"}}> {item.soLuongSanPham} </td>
                
               <td><button  onClick={() => thayDoiSL(item, "tang")}>Thêm số lượng</button> 
               <br></br>
                <button style={{marginTop: '16px'}} onClick={() => thayDoiSL(item, "giam")}>Giảm số lượng</button></td>
              <td>
                {/* {daCoTrongGIo(item.id)} */}
                  <button  onClick={() =>  xoaKhoiGio(item)}>Xóa khỏi giỏ</button>
              </td>
          </tr>
          </tbody>
      </>
      )
  }else{
    danhSachGioHang = thongtin.data
  }
  return (
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
    
      <p style={{color: "#ffff33", margin: '10px'}}> Giỏ hàng</p>
      
               
        <table className="table table-striped">
        <tr>
          <th>Tên sản phẩm</th>
          <th>Ảnh sản phẩm</th>
          <th>Giá sản phẩm</th>
          <th>Số lượng sản phẩm
            
          </th>
        </tr>
             
        {danhSachGioHang}
         

         
      </table>
      <button onClick={() => datHang()}> Đặt hàng</button>
      </ImageBackground>
    </div>
   
  )
}

export default Giohang
