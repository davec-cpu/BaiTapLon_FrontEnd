import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {ImageBackground} from 'react-native'

function DanhSachSanPham() {
    const [thongtin, setThongtin] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [resThemVaoGio, setresThemVaoGio] = useState(null)
    
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

    const [tuKhoa, setTuKhoa] = useState("")

    const suaSanPham = (item) => {

    }
    const xoaSanPham = (item) => {
        
    }
  return (
      
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
    <input 
    className='hopTimKiem'
    type='text'
    placeholder="Tìm kiếm"
    onChange={(e) => {
      setTuKhoa(e.target.value)
    }}
    />
    <div className='divChung'>
     
      <h1> </h1>
      
         
        
        <table className="table table-striped">
        <tr>
          <th>Tên sản phẩm</th>
          <th>Ảnh sản phẩm</th>
          <th>Giá sản phẩm</th>
          <th>Đánh giá sản phẩm</th>
        </tr>
        
        {
        thongtin.filter((val)=> {
          if(tuKhoa == ""){
              return val
          }else if(val.tenSanPham.toLowerCase().includes(tuKhoa.toLowerCase())){
              return val
          }
      }).map(item => 
        <> 
            <tbody>
            <tr>     
                <td style={{color: "#ade29d"}}>{item.tenSanPham}</td>
                <td ><img src={`http://127.0.0.1:8000/uploads/${item.anhSanPham}`}  width="200" height="200"></img></td>
                <td style={{color: "#ade29d"}}>{item.giaSanPham}</td>
                <td style={{color: "#ade29d"}}>{item.danhGiaSanPham}</td>
                <td>
                  {/* {daCoTrongGIo(item.id)} */}
                    <button className={nutBam} onClick={() =>  suaSanPham(item)}>Sửa sản phẩm</button>
                    <button className={nutBam} onClick={() =>  xoaSanPham(item)}>Xóa sản phẩm</button>
                </td>
            </tr>
            </tbody>
        </>
        )}
      </table>
      <p id="footer"> </p>
    </div>
    
    </ImageBackground>
    
    </div>
  )
}

export default DanhSachSanPham
