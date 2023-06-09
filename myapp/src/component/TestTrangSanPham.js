import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { hamPost } from './HamPost'
import {ImageBackground} from 'react-native'
import SanPham from './SanPham'

function TestTrangSanPham() {
  
const [thongtin, setThongtin] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(false)
const [resThemVaoGio, setresThemVaoGio] = useState(null)
const [trangHienTai, setTrangHienTai] =useState(1)
const [soSpMoiTrang, setSoSpMoiTrang] = useState(10)

let nutBam = '';
const getUrl = 'http://127.0.0.1:8000/api/sanpham/dssanpham'
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

  
  var themVaoGio = (idSanPham, giaSanPham) => {
    //dung ham post
    // var formdata = new FormData();
    // formdata.append("idsanpham", idSanPham);
    // formdata.append("giaSanPham", giaSanPham); 
    // const url = `http://127.0.0.1:8000/api/chitietgiohang/themvaogio/${localStorage.getItem('idGioHangKhachHang')}`;
     

    // hamPost(url, formdata, true).then(duLieu => {
    //   console.log(duLieu.mess)
    // })

    //copy paste
    var formdata = new FormData();
    formdata.append("idsanpham", idSanPham);
    formdata.append("giaSanPham", giaSanPham);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`http://127.0.0.1:8000/api/chitietgiohang/themvaogio/${localStorage.getItem('idGioHangKhachHang')}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const handleClick = (item) => {
    console.log('id san pham: '+ item.id+ ' ten san pham: '+item.tenSanPham+' id gio hang: '+localStorage.getItem('idGioHangKhachHang'))
    
    var result = themVaoGio(item.id, item.giaSanPham)

    console.log('Ket qua lay tu viec goi ham: ', result)

    
  }

  const daCoTrongGIo = (idSanPham) => {

    var formdata = new FormData();
    formdata.append("idsanpham", idSanPham);
    formdata.append("idGioHang", localStorage.getItem('idGioHangKhachHang'));

    var url = 'http://127.0.0.1:8000/api/chitietgiohang/checksp';

    var mess = '';
    hamPost(url, formdata, true).then(data => {
      mess = data.mess;
       
     // console.log('456: ', data.mess);
      
    })
    console.log('789: ', mess);
    if(mess === 'San pham da co'){
      nutBam = 'btn btn-primary';
    }else{
      nutBam = 'btn btn-light';
    }
  }
  const [tuKhoa, setTuKhoa] = useState("")
  return (
      
    // <div style={{backgroundColor: "black"}}>
    // <ImageBackground
    // source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    // imageStyle={{opacity:0.5}}
    // blurRadius={10}
    // >
    // <input 
    // type='text'
    // placeholder="Tìm kiếm"
    // onChange={(e) => {
    //   setTuKhoa(e.target.value)
    // }}
    // />
    // <div className='divChung'>
     
    //   <h1> </h1>
      
         
        
    //     <table className="table table-striped">
    //     <tr>
    //       <th>Tên sản phẩm</th>
    //       <th>Ảnh sản phẩm</th>
    //       <th>Giá sản phẩm</th>
    //       <th>Đánh giá sản phẩm</th>
    //     </tr>
        
    //     {
    //     thongtin.filter((val)=> {
    //         if(tuKhoa == ""){
    //             return val
    //         }else if(val.tenSanPham.toLowerCase().includes(tuKhoa.toLowerCase())){
    //             return val
    //         }
    //     }).map(item => 
    //     <> 
    //         <tbody>
    //         <tr>     
    //             <td style={{color: "#ade29d"}}>{item.tenSanPham}</td>
    //             <td ><img src={`http://127.0.0.1:8000/uploads/${item.anhSanPham}`}  width="200" height="200"></img></td>
    //             <td style={{color: "#ade29d"}}>{item.giaSanPham}</td>
    //             <td style={{color: "#ade29d"}}>{item.danhGiaSanPham}</td>
    //             <td>
    //               {/* {daCoTrongGIo(item.id)} */}
    //                 <button className={nutBam} onClick={() =>  handleClick(item)}>Thêm vào giỏ</button>
    //             </td>
    //         </tr>
    //         </tbody>
    //     </>
    //     )}
    //   </table>
    //   <p id="footer"> </p>
    // </div>
    
    // </ImageBackground>
    
    // </div>
    <>
    <SanPham post={thongtin} loading={loading}></SanPham>
    </>
  )
}

export default TestTrangSanPham
