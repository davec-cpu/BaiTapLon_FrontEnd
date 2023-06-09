import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { useLocation, useNavigate } from 'react-router-dom';
import { hamPost } from '../HamPost';

function ChiDinhDauBep() {
    const [thongtin, setThongtin] = useState([])
  const location = useLocation();
  const [nhanvien, setNhanvien] = useState([])
  let laMang = true;
  const navigate = useNavigate()
  
    const layDsBauBep = `http://127.0.0.1:8000/api/admin/laydanhsachdaubepcothechidinh`

    useEffect(() => {
        let unmounted = false;
        const ourReq = axios.CancelToken.source();
        axios.get(layDsBauBep, {
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
            console.log('ds dau bep chi dinh: ',thongtin)
             
             
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

    const chiDinh = (item) =>{
        console.log('id gio hang: '+ localStorage.getItem('idDonHangChiDinh') + 
        'id sp: '+ localStorage.getItem('idSanPhamChiDinhDauBep')
        +'so luong' + localStorage.getItem('soLuongSanPhamConLai')
        +'id dau bep thuc hien: '+item.idDauBep
        + 'id ca lam viec: '+item.id)

        console.log('thong tinitem: ',item)

        // var formdata = new FormData();
        // formdata.append("idDauBepThucHien",  item.idDauBep);
        // formdata.append("idSanPhamDuocGiao",  localStorage.getItem('idSanPhamChiDinhDauBep')); 
        // formdata.append("idDonHang", localStorage.getItem('idDonHangChiDinh') );
        // formdata.append("idCaLamViec",  item.id);
        //  const url = `http://127.0.0.1:8000/api/daubepchebien/chidinhdaubep`;
    

         var formdata = new FormData();
         formdata.append("idDauBepThucHien", item.idDauBep);
         formdata.append("idSanPhamDuocGiao", localStorage.getItem('idSanPhamChiDinhDauBep'));
         formdata.append("idDonHang", localStorage.getItem('idDonHangChiDinh'));
         formdata.append("soLuongSanPham", localStorage.getItem('soLuongSanPham'));
         formdata.append("idCaLamViec", item.id);
         formdata.append("idCaLamViec", item.id);
         var requestOptions = {
           method: 'POST',
           body: formdata,
           redirect: 'follow'
         };
         
         fetch("http://127.0.0.1:8000/api/daubepchebien/chidinhdaubep", requestOptions)
           .then(response => response.text())
           .then(result => console.log(result))
           .catch(error => console.log('error', error));
    }


    let dsDauBep;
    if(laMang){
        dsDauBep = 
        <>
        <div style={{backgroundColor: "black"}}>
    <ImageBackground
    source={`http://127.0.0.1:8000/uploads/2K28B2WBzjYqS5D0tfRZrimSjT4yapyF.jpg`}
    imageStyle={{opacity:0.5}}
    blurRadius={10}
    >
      <p style={{color: "#ffff33", margin: '10px'}}>Chỉ định đầu bếp</p>
          <table>
          <tr>
            <th>Id đầu bếp</th>
            <th>Tên đăng nhập đầu bếp</th>
            <th>Tên đầy đủ</th>
             
             
          </tr>
            {
              thongtin.map(item => 
                <> 
                    <tbody>
                    <tr>     
                        <td style={{paddingTop: '20px'}}>{item.idDauBep}</td>
                        <td>{item.tenDangNhap}</td>
                        <td>{item.tenDayDu}</td>
                        <td><button onClick={() => chiDinh(item)}>Chỉ định</button></td>
                         
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
        dsDauBep = thongtin.data
      }

  return (
    <>
       
        {dsDauBep}
    </>
  )
}

export default ChiDinhDauBep
