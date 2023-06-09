import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { hamPost } from '../HamPost';
import useApiRequest from '../useApiRequest';



function DauBepXemDsMonAnChiDinh() {

  const [thongtin, setThongtin] = useState([])
  const [, setCount] = useState(0);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

   
  
  let urlCarTruc = "http://127.0.0.1:8000/api/calamviec/laycalamviec"
  const layThongTinCaTruc = () => {
    axios
      .get(urlCarTruc)
      .then(response => {
        
        setData(response);
         
      })
      .catch(error => {
        setError(error);
      });
  };

  let laMang = true;
  let mangRong =true;
    console.log('id dau bep: ', localStorage.getItem('idAdmin'))
    const getDonHangUrl = `http://127.0.0.1:8000/api/daubepchebien/laydssanphamchidinh/${localStorage.getItem('idAdmin')}`
    useEffect(() => { 
    layThongTinCaTruc()
    

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
          if (thongtin.length === 0) { 
            console.log("Array is empty!")
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
   
  const batDauCheBien = (item) => {
    console.log(item)
    
   
    let idAdmin = localStorage.getItem('idAdmin')
    let idCaTruc = localStorage.getItem('idCaTruc')
    let idDonHang = item.idGioHang
    localStorage.setItem('idDonHang', idDonHang)
    let idSanPham = item.idSanPhamDuocGiao
    localStorage.setItem('idSanPham', idSanPham)
    
    console.log('id admin la: '+ idAdmin + ' id ca truc la: ' + idCaTruc + 'id san pham: '+idSanPham + 'id don hang: '+idDonHang)
    var duLieuForm = new FormData();
    duLieuForm.append("idDauBepThucHien", idAdmin);
    duLieuForm.append("idSanPhamDuocGiao", idSanPham); 
    duLieuForm.append("idDonHang", idDonHang);
    duLieuForm.append("idCaLamViec", idCaTruc); 
    const url = `http://127.0.0.1:8000/api/daubepchebien/batdauchebien`;

      var requestOptions = {
        method: 'POST',
        body: duLieuForm,
        redirect: 'follow'
      };

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          // console.log('ket qua la: ', result.soLuongConLai)
          // console.log('thoi gian bat dau che bien la:', result.thoigianbatdauchebien)
          
          // console.log('ket qua trong local: ', localStorage.getItem('soLuongSanPhamConLai'))
          // console.log('thoigianchebien: ', result.thoigianbatdauchebien)
          // localStorage.setItem('thoigianbatdauchebien', result.thoigianbatdauchebien)
          // console.log('thoigianchebien local: ', localStorage.getItem('thoigianbatdauchebien'))
          // localStorage.setItem('thoigianbatdauchebien', result.soLuongSanPhamConLai)
          // localStorage.setItem('soLuongSanPhamConLai', result.soLuongConLai)
         // console.log('soLuongSanPhamConLai local: ', localStorage.getItem('soLuongSanPhamConLai'))
        })
        .catch(error => console.log('error', error));
      console.log(localStorage.getItem('soLuongSanPhamConLai'))
        navigate('batdauchebien')
     
  }


  let dsSanPhamChiDinh;
  if(laMang){
    dsSanPhamChiDinh =
    <>
    <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/kJ0MSVT0WbwSyQ76DrLX3vTaNGjwoYXx.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
       <table className="table">
        <tr>
          <th>Tên sản phẩm</th>
          <th>Số lượng sản phẩm ban đầu</th>
          <th>Ảnh sản phẩm</th>
          <th>Số lượng sản phẩm còn lại</th>
        </tr>
        {
          thongtin.map(item => 

            <> 
            <tbody>
            <tr>     
                <td>{item.tenSanPham}</td>
                <td>{item.soLuongSanPham}</td>
                <td><img src={`http://127.0.0.1:8000/uploads/${item.anhSanPham}`}  width="200" height="200"></img></td>
                <td>{item.soLuongSanPhamConLai}</td>
                
                 
                <td>
                  {/* {daCoTrongGIo(item.id)} */}
                    <button  onClick={() =>  batDauCheBien(item)}>Bắt đầu chế biến</button>
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
                   
                    <button  onClick={() =>  batDauCheBien(thongtin.data)}>Bắt đầu chế biến</button>
                </td>
            </tr>
            </tbody>
        </>
 
       </table>
      </>
    }

  return (
    <div>
      <h3>Đầu bếp chế biến</h3>
      {dsSanPhamChiDinh}
    </div>
  )
}

export default DauBepXemDsMonAnChiDinh
