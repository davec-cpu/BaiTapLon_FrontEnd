import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { hamPost } from './HamPost'
import {ImageBackground} from 'react-native'


const  SanPham = ({post, loading}) => {

  if(loading){
    return (
        <div>
            Loading...
        </div>
      )
  }
  return (
    <div>
      <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
    
   
 
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
                    <button className={nutBam} onClick={() =>  handleClick(item)}>Thêm vào giỏ</button>
                </td>
            </tr>
            </tbody>
        </>
        )}
      </table>
      <p id="footer"> </p>
     
    
    </ImageBackground>
    
    </div>
    </div>
  )
}

export default SanPham
